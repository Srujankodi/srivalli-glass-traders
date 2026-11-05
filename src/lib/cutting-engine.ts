/**
 * Smart 2D Glass Cutting Engine
 * Sri Valli Glass Traders - Hyderabad, Telangana
 * 
 * Computes exact guillotine cuts, kerf allowance, physical fit,
 * remnant classification, scrap generation, and visual layout coordinates.
 */

import { calculateSquareFootage } from './calculator';

export interface SheetDimension {
  id?: string;
  tag: string;
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
  glassType: string;
  isRemnant?: boolean;
}

export interface CutRequest {
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
  glassType: string;
  quantity?: number;
  allowRotation?: boolean;
}

export interface LayoutBox {
  id: string;
  type: 'CUSTOMER_CUT' | 'REUSABLE_REMNANT' | 'SCRAP' | 'KERF_LOSS';
  x: number; // mm from top-left
  y: number;
  width: number; // mm
  height: number; // mm
  areaSqFt: number;
  label: string;
  color: string;
}

export interface CuttingFeasibilityResult {
  feasible: boolean;
  rotated: boolean;
  reason?: string;
  materialUtilizationPercent: number;
  kerfMm: number;
  customerCut: {
    lengthMm: number;
    widthMm: number;
    areaSqFt: number;
  };
  remnants: Array<{
    lengthMm: number;
    widthMm: number;
    areaSqFt: number;
    tagSuggested: string;
  }>;
  scraps: Array<{
    lengthMm: number;
    widthMm: number;
    areaSqFt: number;
    estimatedWeightKg: number;
  }>;
  totalScrapAreaSqFt: number;
  layoutBoxes: LayoutBox[];
}

// Density of float glass ~2500 kg / m³
// Weight = Area (m²) * Thickness (m) * 2500
export function estimateGlassWeightKg(areaSqFt: number, thicknessMm: number): number {
  const areaM2 = areaSqFt * 0.092903;
  const thicknessM = thicknessMm / 1000;
  const volumeM3 = areaM2 * thicknessM;
  return Math.round(volumeM3 * 2500 * 100) / 100;
}

/**
 * Checks geometric feasibility and computes cut layout.
 */
export function evaluateCuttingFeasibility(
  sheet: SheetDimension,
  cut: CutRequest,
  options: {
    kerfMm?: number;
    minRemnantAreaSqFt?: number;
    minRemnantDimensionMm?: number;
  } = {}
): CuttingFeasibilityResult {
  const kerf = options.kerfMm ?? 3.0;
  const minRemnantArea = options.minRemnantAreaSqFt ?? 2.0;
  const minRemnantDim = options.minRemnantDimensionMm ?? 250; // min 250mm width/length
  const allowRotation = cut.allowRotation !== false;

  // 1. Thickness and Glass Type validation
  if (sheet.thicknessMm !== cut.thicknessMm) {
    return {
      feasible: false,
      rotated: false,
      reason: `Thickness mismatch: Sheet is ${sheet.thicknessMm}mm, required cut is ${cut.thicknessMm}mm`,
      materialUtilizationPercent: 0,
      kerfMm: kerf,
      customerCut: { lengthMm: 0, widthMm: 0, areaSqFt: 0 },
      remnants: [],
      scraps: [],
      totalScrapAreaSqFt: 0,
      layoutBoxes: [],
    };
  }

  if (sheet.glassType.toLowerCase().trim() !== cut.glassType.toLowerCase().trim()) {
    return {
      feasible: false,
      rotated: false,
      reason: `Glass type mismatch: Sheet is ${sheet.glassType}, required is ${cut.glassType}`,
      materialUtilizationPercent: 0,
      kerfMm: kerf,
      customerCut: { lengthMm: 0, widthMm: 0, areaSqFt: 0 },
      remnants: [],
      scraps: [],
      totalScrapAreaSqFt: 0,
      layoutBoxes: [],
    };
  }

  const sheetL = sheet.lengthMm;
  const sheetW = sheet.widthMm;
  const sheetAreaSqFt = calculateSquareFootage(sheetL, sheetW, 'mm');

  // 2. Geometric Fit check
  let fitsStandard = cut.lengthMm <= sheetL && cut.widthMm <= sheetW;
  let fitsRotated = allowRotation && cut.widthMm <= sheetL && cut.lengthMm <= sheetW;

  if (!fitsStandard && !fitsRotated) {
    return {
      feasible: false,
      rotated: false,
      reason: `Cut size (${cut.lengthMm} x ${cut.widthMm} mm) exceeds available dimensions (${sheetL} x ${sheetW} mm)`,
      materialUtilizationPercent: 0,
      kerfMm: kerf,
      customerCut: { lengthMm: 0, widthMm: 0, areaSqFt: 0 },
      remnants: [],
      scraps: [],
      totalScrapAreaSqFt: 0,
      layoutBoxes: [],
    };
  }

  // Determine optimal orientation (normal or rotated) to maximize remnant usability
  let useRotation = false;
  let cutL = cut.lengthMm;
  let cutW = cut.widthMm;

  if (fitsRotated && !fitsStandard) {
    useRotation = true;
    cutL = cut.widthMm;
    cutW = cut.lengthMm;
  } else if (fitsStandard && fitsRotated) {
    // Both fit; choose the orientation that produces a larger single contiguous remnant
    const leftoverLStandard = sheetL - cut.lengthMm;
    const leftoverLRotated = sheetL - cut.widthMm;
    if (leftoverLRotated > leftoverLStandard) {
      useRotation = true;
      cutL = cut.widthMm;
      cutW = cut.lengthMm;
    }
  }

  const cutAreaSqFt = calculateSquareFootage(cutL, cutW, 'mm');
  const utilization = Math.round((cutAreaSqFt / sheetAreaSqFt) * 1000) / 10;

  // 3. Guillotine cut partitioning:
  // Primary cut along length: creates cut piece + width leftover, and a major length leftover
  const majorRemnantLength = Math.max(0, sheetL - cutL - kerf);
  const majorRemnantWidth = sheetW;
  const majorArea = calculateSquareFootage(majorRemnantLength, majorRemnantWidth, 'mm');

  const sideRemnantLength = cutL;
  const sideRemnantWidth = Math.max(0, sheetW - cutW - kerf);
  const sideArea = calculateSquareFootage(sideRemnantLength, sideRemnantWidth, 'mm');

  const remnants: CuttingFeasibilityResult['remnants'] = [];
  const scraps: CuttingFeasibilityResult['scraps'] = [];
  const layoutBoxes: LayoutBox[] = [];

  // Add customer cut box
  layoutBoxes.push({
    id: 'box-cut-1',
    type: 'CUSTOMER_CUT',
    x: 0,
    y: 0,
    width: cutL,
    height: cutW,
    areaSqFt: cutAreaSqFt,
    label: `Customer Cut (${cutL} x ${cutW} mm)`,
    color: '#0D9488', // Teal
  });

  // Evaluate Major Offcut (Piece along remaining length)
  if (majorRemnantLength > 0 && majorRemnantWidth > 0) {
    const isMajorUsable =
      majorArea >= minRemnantArea &&
      majorRemnantLength >= minRemnantDim &&
      majorRemnantWidth >= minRemnantDim;

    if (isMajorUsable) {
      remnants.push({
        lengthMm: majorRemnantLength,
        widthMm: majorRemnantWidth,
        areaSqFt: majorArea,
        tagSuggested: `REM-${Date.now().toString().slice(-4)}-A`,
      });
      layoutBoxes.push({
        id: 'box-rem-1',
        type: 'REUSABLE_REMNANT',
        x: cutL + kerf,
        y: 0,
        width: majorRemnantLength,
        height: majorRemnantWidth,
        areaSqFt: majorArea,
        label: `Usable Remnant A (${majorRemnantLength} x ${majorRemnantWidth} mm)`,
        color: '#1E3E62', // Deep Navy / Indigo
      });
    } else if (majorArea > 0.05) {
      scraps.push({
        lengthMm: majorRemnantLength,
        widthMm: majorRemnantWidth,
        areaSqFt: majorArea,
        estimatedWeightKg: estimateGlassWeightKg(majorArea, sheet.thicknessMm),
      });
      layoutBoxes.push({
        id: 'box-scrap-1',
        type: 'SCRAP',
        x: cutL + kerf,
        y: 0,
        width: majorRemnantLength,
        height: majorRemnantWidth,
        areaSqFt: majorArea,
        label: `Scrap A (${majorArea.toFixed(2)} sq ft)`,
        color: '#94A3B8', // Slate / Gray
      });
    }
  }

  // Evaluate Side Offcut (Piece alongside the cut width)
  if (sideRemnantLength > 0 && sideRemnantWidth > 0) {
    const isSideUsable =
      sideArea >= minRemnantArea &&
      sideRemnantLength >= minRemnantDim &&
      sideRemnantWidth >= minRemnantDim;

    if (isSideUsable) {
      remnants.push({
        lengthMm: sideRemnantLength,
        widthMm: sideRemnantWidth,
        areaSqFt: sideArea,
        tagSuggested: `REM-${Date.now().toString().slice(-4)}-B`,
      });
      layoutBoxes.push({
        id: 'box-rem-2',
        type: 'REUSABLE_REMNANT',
        x: 0,
        y: cutW + kerf,
        width: sideRemnantLength,
        height: sideRemnantWidth,
        areaSqFt: sideArea,
        label: `Usable Remnant B (${sideRemnantLength} x ${sideRemnantWidth} mm)`,
        color: '#2563EB', // Blue
      });
    } else if (sideArea > 0.05) {
      scraps.push({
        lengthMm: sideRemnantLength,
        widthMm: sideRemnantWidth,
        areaSqFt: sideArea,
        estimatedWeightKg: estimateGlassWeightKg(sideArea, sheet.thicknessMm),
      });
      layoutBoxes.push({
        id: 'box-scrap-2',
        type: 'SCRAP',
        x: 0,
        y: cutW + kerf,
        width: sideRemnantLength,
        height: sideRemnantWidth,
        areaSqFt: sideArea,
        label: `Scrap B (${sideArea.toFixed(2)} sq ft)`,
        color: '#94A3B8', // Slate / Gray
      });
    }
  }

  const totalScrap = scraps.reduce((sum, s) => sum + s.areaSqFt, 0);

  return {
    feasible: true,
    rotated: useRotation,
    materialUtilizationPercent: utilization,
    kerfMm: kerf,
    customerCut: {
      lengthMm: cutL,
      widthMm: cutW,
      areaSqFt: cutAreaSqFt,
    },
    remnants,
    scraps,
    totalScrapAreaSqFt: Math.round(totalScrap * 100) / 100,
    layoutBoxes,
  };
}
