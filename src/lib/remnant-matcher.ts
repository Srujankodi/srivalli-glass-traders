/**
 * Smart Remnant and Stock Matcher
 * Sri Valli Glass Traders - Hyderabad, Telangana
 * 
 * Automatically matches customer requested dimensions against:
 * 1. Reusable Remnant Inventory (Max waste reduction priority)
 * 2. Full Stock Sheets in Inventory
 * 3. Wholesale Supplier Purchase-On-Demand
 */

import { calculateSquareFootage } from './calculator';
import { evaluateCuttingFeasibility } from './cutting-engine';

export interface RemnantItem {
  id: string;
  remnantTag: string;
  sourceSheetId: string;
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
  glassType: string;
  areaSqFt: number;
  allocatedCost: number;
  rackLocation: string;
  status: string;
}

export interface SheetItem {
  id: string;
  sheetTag: string;
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
  glassType: string;
  areaSqFt: number;
  landedCostPerSqFt: number;
  rackLocation: string;
  status: string;
}

export interface MatchRecommendation {
  matchType: 'REUSABLE_REMNANT' | 'FULL_SHEET' | 'SUPPLIER_PURCHASE';
  itemId?: string;
  itemTag?: string;
  rackLocation?: string;
  availableDimensions: string;
  utilizationPercent: number;
  wasteSqFt: number;
  allocatedCost: number;
  description: string;
  savingsVsNewSheet: number;
  cuttingPlan?: any;
}

export function findOptimalStockMatch(
  requested: {
    lengthMm: number;
    widthMm: number;
    thicknessMm: number;
    glassType: string;
  },
  availableRemnants: RemnantItem[],
  availableSheets: SheetItem[],
  standardSheetLandedCostSqFt: number = 85
): MatchRecommendation[] {
  const reqAreaSqFt = calculateSquareFootage(requested.lengthMm, requested.widthMm, 'mm');
  const recommendations: MatchRecommendation[] = [];

  // 1. Search Reusable Remnants
  const matchingRemnants = availableRemnants.filter(
    (rem) =>
      rem.status === 'IN_STOCK' &&
      rem.thicknessMm === requested.thicknessMm &&
      rem.glassType.toLowerCase().trim() === requested.glassType.toLowerCase().trim()
  );

  for (const rem of matchingRemnants) {
    const evalResult = evaluateCuttingFeasibility(
      {
        id: rem.id,
        tag: rem.remnantTag,
        lengthMm: rem.lengthMm,
        widthMm: rem.widthMm,
        thicknessMm: rem.thicknessMm,
        glassType: rem.glassType,
        isRemnant: true,
      },
      {
        lengthMm: requested.lengthMm,
        widthMm: requested.widthMm,
        thicknessMm: requested.thicknessMm,
        glassType: requested.glassType,
        allowRotation: true,
      }
    );

    if (evalResult.feasible) {
      const wasteSqFt = Math.max(0, rem.areaSqFt - reqAreaSqFt);
      // Cost savings vs cutting a brand new full 80 sq ft sheet
      const estimatedNewSheetCost = 80 * standardSheetLandedCostSqFt;
      const remnantCost = rem.allocatedCost || rem.areaSqFt * standardSheetLandedCostSqFt;
      const savings = Math.max(0, estimatedNewSheetCost - remnantCost);

      recommendations.push({
        matchType: 'REUSABLE_REMNANT',
        itemId: rem.id,
        itemTag: rem.remnantTag,
        rackLocation: rem.rackLocation,
        availableDimensions: `${rem.lengthMm} × ${rem.widthMm} mm (${rem.areaSqFt.toFixed(1)} sq ft)`,
        utilizationPercent: evalResult.materialUtilizationPercent,
        wasteSqFt: Math.round(wasteSqFt * 100) / 100,
        allocatedCost: remnantCost,
        description: `High-value salvage from offcut ${rem.remnantTag}. Prevents cutting a new sheet!`,
        savingsVsNewSheet: savings,
        cuttingPlan: evalResult,
      });
    }
  }

  // Sort remnant matches: highest utilization (least waste) first
  recommendations.sort((a, b) => b.utilizationPercent - a.utilizationPercent);

  // 2. Search Full Stock Sheets
  const matchingSheets = availableSheets.filter(
    (s) =>
      s.status === 'IN_STOCK' &&
      s.thicknessMm === requested.thicknessMm &&
      s.glassType.toLowerCase().trim() === requested.glassType.toLowerCase().trim()
  );

  for (const sheet of matchingSheets) {
    const evalResult = evaluateCuttingFeasibility(
      {
        id: sheet.id,
        tag: sheet.sheetTag,
        lengthMm: sheet.lengthMm,
        widthMm: sheet.widthMm,
        thicknessMm: sheet.thicknessMm,
        glassType: sheet.glassType,
      },
      {
        lengthMm: requested.lengthMm,
        widthMm: requested.widthMm,
        thicknessMm: requested.thicknessMm,
        glassType: requested.glassType,
        allowRotation: true,
      }
    );

    if (evalResult.feasible) {
      const wasteSqFt = Math.max(0, sheet.areaSqFt - reqAreaSqFt);
      recommendations.push({
        matchType: 'FULL_SHEET',
        itemId: sheet.id,
        itemTag: sheet.sheetTag,
        rackLocation: sheet.rackLocation,
        availableDimensions: `${sheet.lengthMm} × ${sheet.widthMm} mm (${sheet.areaSqFt.toFixed(1)} sq ft)`,
        utilizationPercent: evalResult.materialUtilizationPercent,
        wasteSqFt: Math.round(wasteSqFt * 100) / 100,
        allocatedCost: sheet.landedCostPerSqFt * reqAreaSqFt,
        description: `Full stock sheet. Offcuts will generate ${evalResult.remnants.length} reusable remnant(s).`,
        savingsVsNewSheet: 0,
        cuttingPlan: evalResult,
      });
      break; // Top 1 or 2 full sheets is enough
    }
  }

  // 3. Fallback: On-demand supplier sourcing
  if (recommendations.length === 0) {
    recommendations.push({
      matchType: 'SUPPLIER_PURCHASE',
      availableDimensions: 'Wholesale Jumbo Sheet (e.g. 3048 × 2438 mm / 10 × 8 ft)',
      utilizationPercent: 0,
      wasteSqFt: 0,
      allocatedCost: reqAreaSqFt * standardSheetLandedCostSqFt,
      description: 'Zero physical stock matching size. Requires Purchase Order to wholesale supplier.',
      savingsVsNewSheet: 0,
    });
  }

  return recommendations;
}
