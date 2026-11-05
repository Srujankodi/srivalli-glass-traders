'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Boxes, 
  Scissors, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Ruler, 
  Layers, 
  IndianRupee 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function SheetInventoryPage() {
  const [sheets, setSheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/inventory')
      .then((res) => res.json())
      .then((data) => {
        setSheets(data.sheets || []);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const filteredSheets = sheets.filter((s) => {
    if (statusFilter === 'ALL') return true;
    return s.status === statusFilter;
  });

  const totalInStockSqFt = sheets
    .filter((s) => s.status === 'IN_STOCK')
    .reduce((sum, s) => sum + s.areaSqFt, 0);

  const totalInventoryValuation = sheets
    .filter((s) => s.status === 'IN_STOCK')
    .reduce((sum, s) => sum + (s.totalCost || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Boxes className="w-6 h-6 text-teal-400" />
            <span>Full Sheet Glass Inventory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking jumbo stock sheets received from manufacturers with unique barcode tags and rack locations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs">
            <span className="text-slate-400 block">Total Stock Area:</span>
            <strong className="text-teal-300 font-mono text-sm">{totalInStockSqFt.toFixed(1)} sq ft</strong>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs">
            <span className="text-slate-400 block">Stock Valuation:</span>
            <strong className="text-white font-mono text-sm">{formatINR(totalInventoryValuation)}</strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-white/10 w-fit text-xs">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            statusFilter === 'ALL' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          All Sheets ({sheets.length})
        </button>
        <button
          onClick={() => setStatusFilter('IN_STOCK')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            statusFilter === 'IN_STOCK' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          In Stock ({sheets.filter((s) => s.status === 'IN_STOCK').length})
        </button>
        <button
          onClick={() => setStatusFilter('CONSUMED')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            statusFilter === 'CONSUMED' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Consumed / Cut ({sheets.filter((s) => s.status === 'CONSUMED').length})
        </button>
      </div>

      {/* Sheet Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Glass Sheets Physical Register</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Sheet Tag</th>
                <th className="p-3">Glass Type</th>
                <th className="p-3">Thickness</th>
                <th className="p-3">Length &times; Width (mm)</th>
                <th className="p-3">Area (sq ft)</th>
                <th className="p-3">Landed Cost / sq ft</th>
                <th className="p-3">Total Value</th>
                <th className="p-3">Rack Location</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSheets.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-mono font-bold text-teal-300">{s.sheetTag}</td>
                  <td className="p-3 font-semibold text-white">{s.glassType}</td>
                  <td className="p-3">{s.thicknessMm}mm</td>
                  <td className="p-3 font-mono">{s.lengthMm} &times; {s.widthMm}</td>
                  <td className="p-3 font-mono font-bold text-white">{s.areaSqFt.toFixed(1)} sq ft</td>
                  <td className="p-3 font-mono">{formatINR(s.landedCostPerSqFt)}</td>
                  <td className="p-3 font-mono">{formatINR(s.totalCost)}</td>
                  <td className="p-3">{s.rackLocation}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        s.status === 'IN_STOCK'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {s.status === 'IN_STOCK' ? (
                      <Link
                        href={`/admin/cutting?type=${encodeURIComponent(s.glassType)}&thickness=${s.thicknessMm}`}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-600/30 text-teal-300 hover:bg-teal-600/50 transition-colors inline-flex items-center gap-1"
                      >
                        <Scissors className="w-3 h-3" />
                        <span>Cut Sheet</span>
                      </Link>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Cut Executed</span>
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
