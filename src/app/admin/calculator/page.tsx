'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Ruler, 
  IndianRupee, 
  ArrowRight, 
  Scissors, 
  FileSpreadsheet, 
  CheckCircle2, 
  RefreshCw,
  Search
} from 'lucide-react';
import { 
  computeGlassPricing, 
  DimensionUnit, 
  formatINR 
} from '@/lib/calculator';

export default function AdminCalculatorPage() {
  const [length, setLength] = useState('6');
  const [width, setWidth] = useState('4');
  const [unit, setUnit] = useState<DimensionUnit>('ft');
  const [quantity, setQuantity] = useState('1');
  const [ratePerSqFt, setRatePerSqFt] = useState('120');
  const [cuttingCharges, setCuttingCharges] = useState('150');
  const [transportCharges, setTransportCharges] = useState('200');
  const [discountAmount, setDiscountAmount] = useState('0');
  const [gstApplicable, setGstApplicable] = useState(true);
  const [gstRate, setGstRate] = useState(18);

  const [glassType, setGlassType] = useState('Toughened Glass');
  const [thicknessMm, setThicknessMm] = useState('8');

  // Live calculation
  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const q = parseInt(quantity) || 1;
    const rate = parseFloat(ratePerSqFt) || 0;
    const cut = parseFloat(cuttingCharges) || 0;
    const trans = parseFloat(transportCharges) || 0;
    const disc = parseFloat(discountAmount) || 0;

    return computeGlassPricing(
      { length: l, width: w, unit, quantity: q },
      {
        ratePerSqFt: rate,
        cuttingCharges: cut,
        transportCharges: trans,
        discountAmount: disc,
        isGstApplicable: gstApplicable,
        gstRate,
      }
    );
  }, [length, width, unit, quantity, ratePerSqFt, cuttingCharges, transportCharges, discountAmount, gstApplicable, gstRate]);

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Calculator className="w-7 h-7 text-[#8B1E2D]" />
            <span>Multi-Unit Square-Foot Calculator</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Exact decimal-safe square footage calculations for Feet, Inches, Centimeters, and Millimeters with GST and cutting charges.
          </p>
        </div>

        <Link
          href={`/admin/cutting?length=${result.lengthMm}&width=${result.widthMm}&thickness=${thicknessMm}&type=${encodeURIComponent(glassType)}`}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white flex items-center gap-2 transition-all shadow-xs"
        >
          <Scissors className="w-4 h-4" />
          <span>Send Size to Cutting Engine</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 p-7 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#8B1E2D]" />
            <span>Dimension &amp; Pricing Inputs</span>
          </h2>

          <div className="space-y-4">
            
            {/* Glass Type & Thickness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Glass Variety</label>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-[#8B1E2D]"
                >
                  <option value="Clear Float Glass">Clear Float Glass</option>
                  <option value="Toughened Glass">Toughened Glass</option>
                  <option value="Tinted Glass">Tinted Glass</option>
                  <option value="Frosted Glass">Frosted Glass</option>
                  <option value="Mirror Glass">Mirror Glass</option>
                  <option value="Laminated Glass">Laminated Glass</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Thickness (mm)</label>
                <select
                  value={thicknessMm}
                  onChange={(e) => setThicknessMm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-[#8B1E2D]"
                >
                  <option value="3">3mm</option>
                  <option value="4">4mm</option>
                  <option value="5">5mm</option>
                  <option value="8">8mm</option>
                  <option value="10">10mm</option>
                  <option value="12">12mm</option>
                  <option value="19">19mm</option>
                </select>
              </div>
            </div>

            {/* Length, Width, Unit */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Length</label>
                <input
                  type="number"
                  step="0.01"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Width</label>
                <input
                  type="number"
                  step="0.01"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as DimensionUnit)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                >
                  <option value="ft">Feet (ft)</option>
                  <option value="in">Inches (in)</option>
                  <option value="mm">Millimeters (mm)</option>
                  <option value="cm">Centimeters (cm)</option>
                </select>
              </div>
            </div>

            {/* Quantity & Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Quantity (Pieces)</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Rate per Sq Ft (₹)</label>
                <input
                  type="number"
                  step="0.5"
                  value={ratePerSqFt}
                  onChange={(e) => setRatePerSqFt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>
            </div>

            {/* Extra Charges */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Cutting / Edge (₹)</label>
                <input
                  type="number"
                  value={cuttingCharges}
                  onChange={(e) => setCuttingCharges(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Transport (₹)</label>
                <input
                  type="number"
                  value={transportCharges}
                  onChange={(e) => setTransportCharges(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Discount (₹)</label>
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>
            </div>

            {/* GST Checkbox */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={gstApplicable}
                  onChange={(e) => setGstApplicable(e.target.checked)}
                  className="w-4 h-4 rounded text-[#8B1E2D] focus:ring-0"
                />
                <span>Apply GST 18% (Telangana Intra-State CGST 9% + SGST 9%)</span>
              </label>
              <span className="text-xs font-bold font-mono text-[#8B1E2D]">HSN: 7005/7007</span>
            </div>

          </div>
        </div>

        {/* Right Output & Breakdown Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-extrabold text-[#8B1E2D] uppercase tracking-wider">Calculation Breakdown</h3>
              <span className="text-xs text-slate-500 font-mono">Normalized: {result.lengthMm} &times; {result.widthMm} mm</span>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Area per Piece:</span>
                <strong className="text-slate-900 font-mono">{result.areaSqFtPerPiece} sq ft</strong>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Total Square Footage:</span>
                <strong className="text-[#8B1E2D] font-mono font-black text-base">{result.totalAreaSqFt} sq ft</strong>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Glass Base Price:</span>
                <span className="font-mono text-slate-900 font-semibold">{formatINR(result.glassBasePrice)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Cutting &amp; Polishing Charges:</span>
                <span className="font-mono text-slate-900 font-semibold">{formatINR(result.cuttingCharges)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Transportation:</span>
                <span className="font-mono text-slate-900 font-semibold">{formatINR(result.transportCharges)}</span>
              </div>

              {result.discountAmount > 0 && (
                <div className="flex justify-between text-amber-600 font-bold">
                  <span>Discount Applied:</span>
                  <span className="font-mono">- {formatINR(result.discountAmount)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-700">
                <span>Taxable Value:</span>
                <span className="font-mono text-slate-900 font-bold">{formatINR(result.taxableAmount)}</span>
              </div>

              {gstApplicable && (
                <>
                  <div className="flex justify-between text-slate-500 text-xs">
                    <span>CGST (9.0%):</span>
                    <span className="font-mono">{formatINR(result.cgstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-xs">
                    <span>SGST (9.0%):</span>
                    <span className="font-mono">{formatINR(result.sgstAmount)}</span>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-red-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-extrabold text-slate-900 block">Grand Total:</span>
                  <span className="text-xs text-slate-500 font-medium">Effective: {formatINR(result.unitRateEffective)} / sq ft</span>
                </div>
                <div className="text-3xl font-black text-[#8B1E2D] font-mono">
                  {formatINR(result.grandTotal)}
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href={`/admin/quotations?create=true&glassType=${encodeURIComponent(glassType)}&thickness=${thicknessMm}&sqft=${result.totalAreaSqFt}&total=${result.grandTotal}&subtotal=${result.subtotal}&cut=${result.cuttingCharges}&trans=${result.transportCharges}&tax=${result.totalTax}`}
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Create Official Quotation</span>
              </Link>
            </div>

          </div>

          {/* Quick Remnant Match Alert */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Check Salvage Stock</h4>
              <p className="text-xs text-slate-500">Search reusable remnants matching {result.lengthMm} &times; {result.widthMm} mm</p>
            </div>
            <Link
              href={`/admin/remnants?matchLength=${result.lengthMm}&matchWidth=${result.widthMm}&thickness=${thicknessMm}&type=${encodeURIComponent(glassType)}`}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Match Offcuts
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
