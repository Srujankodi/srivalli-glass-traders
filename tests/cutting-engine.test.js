const test = require('node:test');
const assert = require('node:assert');

const SQ_MM_PER_SQ_FT = 92903.04;

function calculateSquareFootage(lMm, wMm) {
  return (lMm * wMm) / SQ_MM_PER_SQ_FT;
}

function evaluateCut(sheet, cut, options = {}) {
  const kerf = options.kerfMm || 3.0;
  const minRemnantArea = options.minRemnantAreaSqFt || 2.0;

  if (sheet.thicknessMm !== cut.thicknessMm) {
    return { feasible: false, reason: 'Thickness mismatch' };
  }
  if (sheet.glassType !== cut.glassType) {
    return { feasible: false, reason: 'Glass type mismatch' };
  }

  const fitsStandard = cut.lengthMm <= sheet.lengthMm && cut.widthMm <= sheet.widthMm;
  const fitsRotated = cut.widthMm <= sheet.lengthMm && cut.lengthMm <= sheet.widthMm;

  if (!fitsStandard && !fitsRotated) {
    return { feasible: false, reason: 'Size exceeds stock material' };
  }

  // Primary cut along length
  const majorL = Math.max(0, sheet.lengthMm - cut.lengthMm - kerf);
  const majorW = sheet.widthMm;
  const majorArea = calculateSquareFootage(majorL, majorW);

  const remnants = [];
  const scraps = [];

  if (majorArea >= minRemnantArea) {
    remnants.push({ lengthMm: majorL, widthMm: majorW, areaSqFt: majorArea });
  } else if (majorArea > 0.05) {
    scraps.push({ lengthMm: majorL, widthMm: majorW, areaSqFt: majorArea });
  }

  return {
    feasible: true,
    rotated: !fitsStandard && fitsRotated,
    remnants,
    scraps,
  };
}

test('5. Cutting feasibility: Standard 10ft x 8ft cut to 6ft x 8ft', () => {
  // 10ft = 3048mm, 8ft = 2438mm
  // Cut: 6ft = 1829mm, 8ft = 2438mm
  const sheet = {
    lengthMm: 3048,
    widthMm: 2438,
    thicknessMm: 5.0,
    glassType: 'Clear Float Glass',
  };

  const cut = {
    lengthMm: 1829,
    widthMm: 2438,
    thicknessMm: 5.0,
    glassType: 'Clear Float Glass',
  };

  const result = evaluateCut(sheet, cut);
  assert.strictEqual(result.feasible, true);
  // Major leftover: (3048 - 1829 - 3) = 1216mm x 2438mm ~ 4ft x 8ft = 31.9 sq ft
  assert.strictEqual(result.remnants.length, 1);
  assert.ok(result.remnants[0].areaSqFt > 31.0);
});

test('6. Cutting feasibility: Oversized cut is rejected', () => {
  const sheet = {
    lengthMm: 1524, // 5 ft
    widthMm: 1219,  // 4 ft
    thicknessMm: 8.0,
    glassType: 'Toughened Glass',
  };

  const cut = {
    lengthMm: 2438, // 8 ft (exceeds sheet)
    widthMm: 1829,
    thicknessMm: 8.0,
    glassType: 'Toughened Glass',
  };

  const result = evaluateCut(sheet, cut);
  assert.strictEqual(result.feasible, false);
});

test('7. Cutting feasibility: Thickness mismatch rejected', () => {
  const sheet = { lengthMm: 3048, widthMm: 2438, thicknessMm: 8.0, glassType: 'Clear Float Glass' };
  const cut = { lengthMm: 1000, widthMm: 1000, thicknessMm: 10.0, glassType: 'Clear Float Glass' };

  const result = evaluateCut(sheet, cut);
  assert.strictEqual(result.feasible, false);
  assert.strictEqual(result.reason, 'Thickness mismatch');
});

test('8. Cutting from existing remnant: secondary remnant generation', () => {
  // Existing remnant: 1524mm x 1219mm (~20 sq ft)
  // Cut: 914mm x 914mm (~9 sq ft)
  const remnant = {
    lengthMm: 1524,
    widthMm: 1219,
    thicknessMm: 5.0,
    glassType: 'Clear Float Glass',
  };

  const cut = {
    lengthMm: 914,
    widthMm: 914,
    thicknessMm: 5.0,
    glassType: 'Clear Float Glass',
  };

  const result = evaluateCut(remnant, cut);
  assert.strictEqual(result.feasible, true);
  // Leftover: (1524 - 914 - 3) = 607mm x 1219mm = 7.9 sq ft (>= 2 sq ft threshold)
  assert.strictEqual(result.remnants.length, 1);
  assert.ok(result.remnants[0].areaSqFt >= 7.0);
});
