const test = require('node:test');
const assert = require('node:assert');

// Core math functions test suite
const MM_PER_INCH = 25.4;
const MM_PER_FOOT = 304.8;
const SQ_MM_PER_SQ_FT = 92903.04;

function calculateSquareFootage(length, width, unit) {
  if (length <= 0 || width <= 0) return 0;
  let sqFt = 0;
  switch (unit) {
    case 'ft':
      sqFt = length * width;
      break;
    case 'in':
      sqFt = (length * width) / 144;
      break;
    case 'mm':
      sqFt = (length * width) / SQ_MM_PER_SQ_FT;
      break;
    case 'cm':
      sqFt = (length * width) / 929.0304;
      break;
  }
  return Math.round(sqFt * 10000) / 10000;
}

function computeGlassPricing(dimensions, pricing) {
  const qty = dimensions.quantity || 1;
  const areaPerPiece = calculateSquareFootage(dimensions.length, dimensions.width, dimensions.unit);
  const totalArea = Math.round(areaPerPiece * qty * 10000) / 10000;
  const basePrice = Math.round(totalArea * pricing.ratePerSqFt * 100) / 100;
  const rawSubtotal = basePrice + (pricing.cuttingCharges || 0) + (pricing.transportCharges || 0);
  const discount = pricing.discountAmount || 0;
  const taxable = Math.max(0, rawSubtotal - discount);
  const gstRate = pricing.isGstApplicable !== false ? 18.0 : 0;
  const tax = Math.round(((taxable * gstRate) / 100) * 100) / 100;
  const grandTotal = Math.round((taxable + tax) * 100) / 100;

  return {
    areaPerPiece,
    totalArea,
    basePrice,
    subtotal: rawSubtotal,
    taxable,
    totalTax: tax,
    grandTotal,
  };
}

test('1. Square-foot formula: Feet (10ft x 8ft = 80 sq ft)', () => {
  const sqFt = calculateSquareFootage(10, 8, 'ft');
  assert.strictEqual(sqFt, 80);
});

test('2. Square-foot formula: Inches (72in x 48in = 24 sq ft)', () => {
  const sqFt = calculateSquareFootage(72, 48, 'in');
  assert.strictEqual(sqFt, 24);
});

test('3. Square-foot formula: Millimeters (3048mm x 2438mm ~ 80 sq ft)', () => {
  const sqFt = calculateSquareFootage(3048, 2438, 'mm');
  // (3048 * 2438) / 92903.04 = 79.986
  assert.ok(Math.abs(sqFt - 80) < 0.1);
});

test('4. Price Calculation with GST, Cutting & Transport charges', () => {
  const result = computeGlassPricing(
    { length: 6, width: 4, unit: 'ft', quantity: 2 }, // 48 sq ft total
    {
      ratePerSqFt: 100,
      cuttingCharges: 200,
      transportCharges: 300,
      discountAmount: 100,
      isGstApplicable: true,
    }
  );

  // Glass Base Price: 48 * 100 = 4800
  // Subtotal before disc: 4800 + 200 + 300 = 5300
  // Taxable after disc: 5300 - 100 = 5200
  // GST 18%: 5200 * 0.18 = 936
  // Grand Total: 5200 + 936 = 6136
  assert.strictEqual(result.totalArea, 48);
  assert.strictEqual(result.basePrice, 4800);
  assert.strictEqual(result.taxable, 5200);
  assert.strictEqual(result.totalTax, 936);
  assert.strictEqual(result.grandTotal, 6136);
});

