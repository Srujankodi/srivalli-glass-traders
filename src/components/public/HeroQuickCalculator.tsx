'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroQuickCalculator() {
  const [glassType, setGlassType] = useState('Clear Float Glass');
  const [thickness, setThickness] = useState('5mm');
  const [length, setLength] = useState('6');
  const [width, setWidth] = useState('4');
  const [unit, setUnit] = useState<'ft' | 'in' | 'mm'>('ft');

  const { totalSqFt, indicativeRate } = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    if (l <= 0 || w <= 0) return { totalSqFt: 0, indicativeRate: 0 };

    let sqFt = 0;
    if (unit === 'ft') {
      sqFt = l * w;
    } else if (unit === 'in') {
      sqFt = (l * w) / 144;
    } else {
      sqFt = (l * w) / 92903.04;
    }

    let rate = 58;
    if (glassType.includes('Toughened')) rate = 115;
    else if (glassType.includes('Tinted')) rate = 72;
    else if (glassType.includes('Mirror')) rate = 95;
    else if (glassType.includes('Frosted')) rate = 78;

    if (thickness === '8mm') rate += 30;
    if (thickness === '10mm') rate += 55;
    if (thickness === '12mm') rate += 85;

    return {
      totalSqFt: Math.round(sqFt * 100) / 100,
      indicativeRate: rate,
    };
  }, [length, width, unit, glassType, thickness]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-card">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#8B1E2D] flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Instant Glass Sizing &amp; Pricing</h3>
            <p className="text-xs text-slate-700">Enter custom measurements to calculate square feet</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#8B1E2D] border border-red-200">
          <Sparkles className="w-3.5 h-3.5" /> Direct Wholesale
        </span>
      </div>

      <div className="space-y-4">
        {/* Glass Type & Thickness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              Glass Variety
            </label>
            <select
              value={glassType}
              onChange={(e) => setGlassType(e.target.value)}
              aria-label="Select Glass Variety"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
            >
              <option value="Clear Float Glass">Clear Float Glass</option>
              <option value="Toughened Glass">Toughened Glass</option>
              <option value="Tinted Glass">Tinted Glass</option>
              <option value="Mirror Glass">Mirror Glass</option>
              <option value="Frosted Glass">Frosted Glass</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              Thickness
            </label>
            <select
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              aria-label="Select Glass Thickness"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
            >
              <option value="5mm">5mm Standard</option>
              <option value="8mm">8mm Medium</option>
              <option value="10mm">10mm Heavy</option>
              <option value="12mm">12mm Structural</option>
            </select>
          </div>
        </div>

        {/* Dimension Unit Selector */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Dimensions &amp; Unit
            </label>
            <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              {(['ft', 'in', 'mm'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-3 py-1 rounded font-bold transition-all ${
                    unit === u ? 'bg-[#8B1E2D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Length & Width */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="relative">
              <input
                type="number"
                step="any"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Length"
                aria-label="Length measurement"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
              />
              <span className="absolute right-3.5 top-3 text-xs text-slate-600 font-bold uppercase">{unit}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width"
                aria-label="Width measurement"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
              />
              <span className="absolute right-3.5 top-3 text-xs text-slate-600 font-bold uppercase">{unit}</span>
            </div>
          </div>
        </div>

        {/* Results Banner in Red-tinted card matching Genesis theme */}
        <div className="rounded-2xl bg-red-50/70 border border-red-200/80 p-4 sm:p-5">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Calculated Glass Area</span>
              <div className="text-3xl font-black text-[#8B1E2D] tracking-tight">
                {totalSqFt} <span className="text-base font-bold text-slate-700">sq ft</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Indicative Rate</span>
              <div className="text-2xl font-black text-slate-900">
                ₹{indicativeRate} <span className="text-xs font-medium text-slate-700">/ sq ft</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-red-200/60 flex items-center justify-between text-xs text-slate-700 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Millimeter Straight Cutting
            </span>
            <span className="font-bold text-[#8B1E2D]">Telangana Wholesale</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/quote?product=${encodeURIComponent(glassType)}&thickness=${thickness.replace('mm','')}&length=${length}&width=${width}&unit=${unit}`}
          className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base text-white bg-[#8B1E2D] hover:bg-[#68121E] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Request Official Quote For This Size</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
