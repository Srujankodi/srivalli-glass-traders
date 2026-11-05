/**
 * Domain-Specific Glass Calculation Engine
 * Sri Valli Glass Traders - Hyderabad, Telangana
 * 
 * Handles dimension conversions, exact square footage calculations,
 * pricing with cutting charges, transport, GST, and landed costs.
 */

export type DimensionUnit = 'ft' | 'in' | 'mm' | 'cm';

export interface GlassDimensions {
  length: number;
  width: number;
  unit: DimensionUnit;
  quantity?: number;
}

export interface PricingOptions {
  ratePerSqFt: number;
  quantity?: number;
  cuttingCharges?: number;
  transportCharges?: number;
  discountPercentage?: number;
  discountAmount?: number;
  gstRate?: number; // e.g. 18 for 18%
  isGstApplicable?: boolean;
}

export interface CalculationResult {
  lengthMm: number;
  widthMm: number;
  areaSqFtPerPiece: number;
  totalAreaSqFt: number;
  glassBasePrice: number;
  cuttingCharges: number;
  transportCharges: number;
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
  grandTotal: number;
  unitRateEffective: number;
}

// Exact conversion constants
const MM_PER_INCH = 25.4;
const MM_PER_FOOT = 304.8;
const MM_PER_CM = 10.0;
const SQ_MM_PER_SQ_FT = 92903.04; // 304.8 * 304.8
const SQ_INCHES_PER_SQ_FT = 144;
const SQ_CM_PER_SQ_FT = 929.0304;

/**
 * Normalizes any dimension (ft, in, cm, mm) into millimeters.
 */
export function convertToMm(val: number, unit: DimensionUnit): number {
  if (val <= 0 || isNaN(val)) return 0;
  switch (unit) {
    case 'mm':
      return val;
    case 'cm':
      return val * MM_PER_CM;
    case 'in':
      return val * MM_PER_INCH;
    case 'ft':
      return val * MM_PER_FOOT;
  }
}

/**
 * Converts millimeters back to any target unit.
 */
export function convertFromMm(valMm: number, targetUnit: DimensionUnit): number {
  if (valMm <= 0 || isNaN(valMm)) return 0;
  switch (targetUnit) {
    case 'mm':
      return valMm;
    case 'cm':
      return valMm / MM_PER_CM;
    case 'in':
      return valMm / MM_PER_INCH;
    case 'ft':
      return valMm / MM_PER_FOOT;
  }
}

/**
 * Calculates square footage for given dimensions and unit.
 * Uses exact standard formulas as specified in business rules.
 */
export function calculateSquareFootage(length: number, width: number, unit: DimensionUnit): number {
  if (length <= 0 || width <= 0 || isNaN(length) || isNaN(width)) {
    return 0;
  }

  let sqFt = 0;
  switch (unit) {
    case 'ft':
      sqFt = length * width;
      break;
    case 'in':
      sqFt = (length * width) / SQ_INCHES_PER_SQ_FT;
      break;
    case 'mm':
      sqFt = (length * width) / SQ_MM_PER_SQ_FT;
      break;
    case 'cm':
      sqFt = (length * width) / SQ_CM_PER_SQ_FT;
      break;
  }

  // Round to 4 decimal places for precision calculation
  return Math.round(sqFt * 10000) / 10000;
}

/**
 * Computes comprehensive pricing breakdown including taxes, cuts, and discounts.
 */
export function computeGlassPricing(
  dimensions: GlassDimensions,
  pricing: PricingOptions
): CalculationResult {
  const qty = Math.max(1, dimensions.quantity || pricing.quantity || 1);
  const areaPerPiece = calculateSquareFootage(dimensions.length, dimensions.width, dimensions.unit);
  const totalArea = Math.round(areaPerPiece * qty * 10000) / 10000;

  const lengthMm = Math.round(convertToMm(dimensions.length, dimensions.unit) * 100) / 100;
  const widthMm = Math.round(convertToMm(dimensions.width, dimensions.unit) * 100) / 100;

  const rate = Math.max(0, pricing.ratePerSqFt || 0);
  const glassBasePrice = Math.round(totalArea * rate * 100) / 100;

  const cuttingCharges = Math.max(0, pricing.cuttingCharges || 0);
  const transportCharges = Math.max(0, pricing.transportCharges || 0);

  const rawSubtotal = glassBasePrice + cuttingCharges + transportCharges;

  // Discount calculation
  let discount = 0;
  if (pricing.discountAmount && pricing.discountAmount > 0) {
    discount = Math.min(rawSubtotal, pricing.discountAmount);
  } else if (pricing.discountPercentage && pricing.discountPercentage > 0) {
    discount = Math.round(((rawSubtotal * pricing.discountPercentage) / 100) * 100) / 100;
  }

  const taxableAmount = Math.max(0, rawSubtotal - discount);

  // GST Calculation (Default 18% - Telangana Intra-state: CGST 9% + SGST 9%)
  const isGst = pricing.isGstApplicable !== false;
  const gstRate = isGst ? (pricing.gstRate ?? 18.0) : 0;
  
  const totalTax = Math.round(((taxableAmount * gstRate) / 100) * 100) / 100;
  const cgstAmount = Math.round((totalTax / 2) * 100) / 100;
  const sgstAmount = Math.round((totalTax - cgstAmount) * 100) / 100; // balance cent rounding
  const igstAmount = 0; // Default intra-state Telangana

  const grandTotal = Math.round((taxableAmount + totalTax) * 100) / 100;
  const unitRateEffective = totalArea > 0 ? Math.round((grandTotal / totalArea) * 100) / 100 : 0;

  return {
    lengthMm,
    widthMm,
    areaSqFtPerPiece: areaPerPiece,
    totalAreaSqFt: totalArea,
    glassBasePrice,
    cuttingCharges,
    transportCharges,
    subtotal: rawSubtotal,
    discountAmount: discount,
    taxableAmount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    totalTax,
    grandTotal,
    unitRateEffective,
  };
}

/**
 * Format currency with Indian Rupee symbol and lakh/crore comma style.
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}
