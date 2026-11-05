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

    // Indicative benchmark rates in Hyderabad
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
    <div className="relative mx-auto w-full max-w-lg rounded-3xl bg-slate-900/90 border border-teal-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Instant Size Estimator</h3>
            <p className="text-xs text-slate-300">Enter dimensions to calculate square feet</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <Sparkles className="w-3 h-3" /> Live
        </span>
      </div>

      <div className="space-y-4">
        {/* Glass Type & Thickness */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">Glass Type</label>
            <select
              value={glassType}
              onChange={(e) => setGlassType(e.target.value)}
              aria-label="Select Glass Type"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400 font-medium"
            >
              <option value="Clear Float Glass">Clear Float Glass</option>
              <option value="Toughened Glass">Toughened Glass</option>
              <option value="Tinted Glass">Tinted Glass</option>
              <option value="Mirror Glass">Mirror Glass</option>
              <option value="Frosted Glass">Frosted Glass</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">Thickness</label>
            <select
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              aria-label="Select Thickness"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400 font-medium"
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
            <label className="text-xs font-semibold text-slate-200">Measurement Unit</label>
            <div className="flex gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              {(['ft', 'in', 'mm'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-2.5 py-0.5 rounded font-semibold transition-colors ${
                    unit === u ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Length & Width Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Length"
                  aria-label="Length dimension"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-teal-400"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold uppercase">{unit}</span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Width"
                  aria-label="Width dimension"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-teal-400"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold uppercase">{unit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Banner */}
        <div className="rounded-2xl bg-teal-950/70 border border-teal-500/40 p-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-teal-200 font-medium">Calculated Glass Area</span>
              <div className="text-2xl font-black text-white tracking-tight">
                {totalSqFt} <span className="text-sm font-semibold text-teal-300">sq ft</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-teal-200 font-medium">Est. Material Rate</span>
              <div className="text-xl font-extrabold text-teal-200">
                ₹{indicativeRate} <span className="text-xs font-normal text-teal-300">/ sq ft</span>
              </div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-teal-500/30 flex items-center justify-between text-xs text-teal-300">
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Millimeter Cutting Tolerance
            </span>
            <span className="text-slate-300 font-mono">Hyderabad Wholesale</span>
          </div>
        </div>

        {/* Button to Formal Quotation */}
        <Link
          href={`/quote?product=${encodeURIComponent(glassType)}&thickness=${thickness.replace('mm','')}&length=${length}&width=${width}&unit=${unit}`}
          className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Get Detailed Official Quote</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
