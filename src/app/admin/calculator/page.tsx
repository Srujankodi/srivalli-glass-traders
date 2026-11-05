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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-teal-400" />
            <span>Multi-Unit Square-Foot Calculator</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Exact decimal-safe square footage calculations for Feet, Inches, Centimeters, and Millimeters with GST and cutting charges.
          </p>
        </div>

        <Link
          href={`/admin/cutting?length=${result.lengthMm}&width=${result.widthMm}&thickness=${thicknessMm}&type=${encodeURIComponent(glassType)}`}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Scissors className="w-4 h-4" />
          <span>Send Size to Cutting Engine</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Ruler className="w-4 h-4 text-teal-400" />
            <span>Dimension &amp; Pricing Inputs</span>
          </h2>

          <div className="space-y-4">
            
            {/* Glass Type & Thickness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Glass Type</label>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Thickness (mm)</label>
                <select
                  value={thicknessMm}
                  onChange={(e) => setThicknessMm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Length</label>
                <input
                  type="number"
                  step="0.01"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Width</label>
                <input
                  type="number"
                  step="0.01"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Measurement Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as DimensionUnit)}
                  className="w-full px-2.5 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Quantity (Pieces)</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Rate per Sq Ft (₹)</label>
                <input
                  type="number"
                  step="0.5"
                  value={ratePerSqFt}
                  onChange={(e) => setRatePerSqFt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>

            {/* Extra Charges */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Cutting / Edge (₹)</label>
                <input
                  type="number"
                  value={cuttingCharges}
                  onChange={(e) => setCuttingCharges(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Transport (₹)</label>
                <input
                  type="number"
                  value={transportCharges}
                  onChange={(e) => setTransportCharges(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Discount (₹)</label>
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>

            {/* GST Checkbox */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer text-xs text-slate-200">
                <input
                  type="checkbox"
                  checked={gstApplicable}
                  onChange={(e) => setGstApplicable(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-0 bg-slate-900 border-white/20"
                />
                <span>Apply GST 18% (Telangana Intra-State CGST 9% + SGST 9%)</span>
              </label>
              <span className="text-[11px] font-mono text-teal-400">HSN: 7005/7007</span>
            </div>

          </div>
        </div>

        {/* Right Output & Breakdown Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-teal-500/30 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Calculation Breakdown</h3>
              <span className="text-xs text-teal-300 font-mono">Normalized: {result.lengthMm} &times; {result.widthMm} mm</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Area per Piece:</span>
                <strong className="text-white font-mono">{result.areaSqFtPerPiece} sq ft</strong>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Total Square Footage:</span>
                <strong className="text-teal-300 font-mono font-bold text-sm">{result.totalAreaSqFt} sq ft</strong>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Glass Base Price:</span>
                <span className="font-mono text-white">{formatINR(result.glassBasePrice)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Cutting &amp; Polishing Charges:</span>
                <span className="font-mono text-white">{formatINR(result.cuttingCharges)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Transportation:</span>
                <span className="font-mono text-white">{formatINR(result.transportCharges)}</span>
              </div>

              {result.discountAmount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Discount Applied:</span>
                  <span className="font-mono">- {formatINR(result.discountAmount)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex justify-between text-slate-300">
                <span>Taxable Value:</span>
                <span className="font-mono text-white font-semibold">{formatINR(result.taxableAmount)}</span>
              </div>

              {gstApplicable && (
                <>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>CGST (9.0%):</span>
                    <span className="font-mono">{formatINR(result.cgstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>SGST (9.0%):</span>
                    <span className="font-mono">{formatINR(result.sgstAmount)}</span>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-teal-500/30 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-white block">Grand Total:</span>
                  <span className="text-[10px] text-slate-400">Effective: {formatINR(result.unitRateEffective)} / sq ft</span>
                </div>
                <div className="text-2xl font-extrabold text-teal-300 font-mono">
                  {formatINR(result.grandTotal)}
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href={`/admin/quotations?create=true&glassType=${encodeURIComponent(glassType)}&thickness=${thicknessMm}&sqft=${result.totalAreaSqFt}&total=${result.grandTotal}&subtotal=${result.subtotal}&cut=${result.cuttingCharges}&trans=${result.transportCharges}&tax=${result.totalTax}`}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Create Official Quotation</span>
              </Link>
            </div>

          </div>

          {/* Quick Remnant Match Alert */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Check Salvage Stock</h4>
              <p className="text-[11px] text-slate-400">Search reusable remnants matching {result.lengthMm} &times; {result.widthMm} mm</p>
            </div>
            <Link
              href={`/admin/remnants?matchLength=${result.lengthMm}&matchWidth=${result.widthMm}&thickness=${thicknessMm}&type=${encodeURIComponent(glassType)}`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Match Offcuts
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

