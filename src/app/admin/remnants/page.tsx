'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Repeat, 
  Search, 
  Scissors, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Boxes, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

function RemnantsContent() {
  const searchParams = useSearchParams();
  const initML = searchParams.get('matchLength') || '';
  const initMW = searchParams.get('matchWidth') || '';
  const initThick = searchParams.get('thickness') || '5';
  const initType = searchParams.get('type') || 'Clear Float Glass';

  const [remnants, setRemnants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [matchLength, setMatchLength] = useState(initML);
  const [matchWidth, setMatchWidth] = useState(initMW);
  const [matchThickness, setMatchThickness] = useState(initThick);
  const [matchType, setMatchType] = useState(initType);
  const [matches, setMatches] = useState<any[] | null>(null);
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    loadRemnants();
  }, []);

  const loadRemnants = async () => {
    try {
      const res = await fetch('/api/inventory');
      const data = await res.json();
      setRemnants(data.remnants || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFindMatches = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchLength || !matchWidth) return;
    setMatching(true);

    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'match',
          length: Number(matchLength),
          width: Number(matchWidth),
          unit: 'mm',
          thicknessMm: Number(matchThickness),
          glassType: matchType,
        }),
      });

      const data = await res.json();
      setMatches(data.matches || []);
    } catch (e) {
      console.error(e);
    } finally {
      setMatching(false);
    }
  };

  const totalRemnantSqFt = remnants
    .filter((r) => r.status === 'IN_STOCK')
    .reduce((sum, r) => sum + r.areaSqFt, 0);

  const totalRemnantValue = remnants
    .filter((r) => r.status === 'IN_STOCK')
    .reduce((sum, r) => sum + (r.allocatedCost || 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Repeat className="w-6 h-6 text-teal-400" />
            <span>Reusable Leftover Glass Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track usable offcuts from previous cutting jobs. Match customer custom orders against offcuts to maximize material yield.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs">
            <span className="text-slate-400 block">Total Offcut Area:</span>
            <strong className="text-teal-300 font-mono text-sm">{totalRemnantSqFt.toFixed(1)} sq ft</strong>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs">
            <span className="text-slate-400 block">Salvage Valuation:</span>
            <strong className="text-white font-mono text-sm">{formatINR(totalRemnantValue)}</strong>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-teal-950/30 border border-teal-500/30 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Smart Remnant Matcher (Zero Waste Priority)</span>
          </h2>
          <span className="text-xs text-teal-300 font-mono">Checks offcuts before cutting new sheet</span>
        </div>

        <form onSubmit={handleFindMatches} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Glass Type</label>
            <select
              value={matchType}
              onChange={(e) => setMatchType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
            >
              <option value="Clear Float Glass">Clear Float Glass</option>
              <option value="Toughened Glass">Toughened Glass</option>
              <option value="Tinted Glass">Tinted Glass</option>
              <option value="Frosted Glass">Frosted Glass</option>
              <option value="Mirror Glass">Mirror Glass</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Thickness</label>
            <select
              value={matchThickness}
              onChange={(e) => setMatchThickness(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
            >
              <option value="5">5mm</option>
              <option value="8">8mm</option>
              <option value="10">10mm</option>
              <option value="12">12mm</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Req. Length (mm)</label>
            <input
              type="number"
              required
              value={matchLength}
              onChange={(e) => setMatchLength(e.target.value)}
              placeholder="e.g. 1524"
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Req. Width (mm)</label>
            <input
              type="number"
              required
              value={matchWidth}
              onChange={(e) => setMatchWidth(e.target.value)}
              placeholder="e.g. 914"
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={matching}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{matching ? 'Matching...' : 'Find Matches'}</span>
            </button>
          </div>
        </form>

        {matches && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Optimal Stock Sourcing Matches ({matches.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {matches.map((match, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-800/90 border border-white/10 space-y-2 text-xs hover:border-teal-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        match.matchType === 'REUSABLE_REMNANT'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : match.matchType === 'FULL_SHEET'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {match.matchType.replace('_', ' ')}
                    </span>
                    {match.itemTag && <span className="font-mono font-bold text-white">{match.itemTag}</span>}
                  </div>

                  <p className="text-slate-300 font-medium">{match.description}</p>
                  
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Dimensions: <strong>{match.availableDimensions}</strong></span>
                    {match.rackLocation && <span>Rack: <strong>{match.rackLocation}</strong></span>}
                  </div>

                  {match.savingsVsNewSheet > 0 && (
                    <div className="text-emerald-400 font-semibold text-[11px]">
                      Saves approximately {formatINR(match.savingsVsNewSheet)} vs buying new sheet!
                    </div>
                  )}

                  {match.itemId && (
                    <div className="pt-2 flex justify-end">
                      <Link
                        href={`/admin/cutting?length=${matchLength}&width=${matchWidth}&thickness=${matchThickness}&type=${encodeURIComponent(matchType)}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1"
                      >
                        <Scissors className="w-3 h-3" />
                        <span>Cut From This Item</span>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Current Reusable Remnant Inventory</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Remnant Tag</th>
                <th className="p-3">Glass Type</th>
                <th className="p-3">Thickness</th>
                <th className="p-3">Dimensions (mm)</th>
                <th className="p-3">Area (sq ft)</th>
                <th className="p-3">Allocated Cost</th>
                <th className="p-3">Storage Rack</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {remnants.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-mono font-bold text-teal-300">{r.remnantTag}</td>
                  <td className="p-3 text-white font-medium">{r.glassType}</td>
                  <td className="p-3">{r.thicknessMm}mm</td>
                  <td className="p-3 font-mono">{r.lengthMm} &times; {r.widthMm}</td>
                  <td className="p-3 font-mono font-bold text-white">{r.areaSqFt.toFixed(2)}</td>
                  <td className="p-3 font-mono">{formatINR(r.allocatedCost || 0)}</td>
                  <td className="p-3">{r.rackLocation}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        r.status === 'IN_STOCK'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {r.status === 'IN_STOCK' && (
                      <Link
                        href={`/admin/cutting?type=${encodeURIComponent(r.glassType)}&thickness=${r.thicknessMm}`}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
                      >
                        Cut Remnant
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ReusableRemnantsPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-12">Loading remnant stock...</div>}>
      <RemnantsContent />
    </Suspense>
  );
}
