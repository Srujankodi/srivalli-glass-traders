'use client';

import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  IndianRupee, 
  Scale, 
  Plus, 
  CheckCircle2, 
  FileText, 
  TrendingUp,
  Boxes 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function ScrapManagementPage() {
  const [scrapItems, setScrapItems] = useState<any[]>([]);
  const [scrapSales, setScrapSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Sale Modal state
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [buyerName, setBuyerName] = useState('Deccan Cullet Recyclers');
  const [buyerPhone, setBuyerPhone] = useState('+91 99887 76655');
  const [totalWeightKg, setTotalWeightKg] = useState('100');
  const [ratePerUnit, setRatePerUnit] = useState('3.5');
  const [paymentMethod, setPaymentMethod] = useState('CASH');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/inventory');
      const data = await res.json();
      setScrapItems(data.scrap || []);
      setScrapSales(data.scrapSales || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordSale = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'scrap-sale',
          buyerName,
          buyerPhone,
          totalWeightKg: Number(totalWeightKg),
          ratePerUnit: Number(ratePerUnit),
          unitType: 'KG',
          paymentMethod,
        }),
      });

      if (res.ok) {
        setShowSaleModal(false);
        await loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const totalScrapWeightKg = scrapItems
    .filter((s) => s.status === 'IN_STOCK')
    .reduce((sum, s) => sum + (s.weightKg || 0), 0);

  const totalScrapRevenue = scrapSales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-teal-400" />
            <span>Scrap &amp; Cullet Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track unusable glass offcuts, cullet aggregations, and scrap sales to recycling plants in Hyderabad.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSaleModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Record Scrap Sale</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-medium">
            <span>Scrap In Stock (Bins)</span>
            <Scale className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {totalScrapWeightKg.toFixed(1)} <span className="text-sm font-normal text-slate-400">kg</span>
          </div>
          <p className="text-xs text-slate-400">Storage in Scrap Bin S-1 &amp; S-2</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-medium">
            <span>Total Scrap Revenue</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {formatINR(totalScrapRevenue)}
          </div>
          <p className="text-xs text-slate-400">Recovered from cullet recyclers</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-medium">
            <span>Average Cullet Rate</span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            ₹3.50 <span className="text-sm font-normal text-slate-400">/ kg</span>
          </div>
          <p className="text-xs text-slate-400">Hyderabad scrap wholesale benchmark</p>
        </div>
      </div>

      {/* Scrap Inventory Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Scrap Inventory in Storage</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Glass Type</th>
                <th className="p-3">Thickness</th>
                <th className="p-3">Weight (kg)</th>
                <th className="p-3">Area Equivalent (sq ft)</th>
                <th className="p-3">Source Cutting Job</th>
                <th className="p-3">Bin Location</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {scrapItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-semibold text-white">{item.glassType}</td>
                  <td className="p-3">{item.thicknessMm}mm</td>
                  <td className="p-3 font-mono font-bold text-teal-300">{item.weightKg} kg</td>
                  <td className="p-3 font-mono">{item.areaSqFt ? item.areaSqFt.toFixed(2) : '—'} sq ft</td>
                  <td className="p-3 font-mono text-slate-400">{item.sourceJobId || 'Manual/Damage'}</td>
                  <td className="p-3">{item.storageLocation}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scrap Sales History Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Scrap Sales &amp; Recovery Receipts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Buyer Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Weight Sold</th>
                <th className="p-3">Rate / kg</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {scrapSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-mono font-bold text-teal-300">{sale.scrapInvoiceNo}</td>
                  <td className="p-3 font-semibold text-white">{sale.buyerName}</td>
                  <td className="p-3 text-slate-400">{sale.buyerPhone}</td>
                  <td className="p-3 font-mono">{sale.totalWeightKg} kg</td>
                  <td className="p-3 font-mono">₹{sale.ratePerUnit}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{formatINR(sale.totalAmount)}</td>
                  <td className="p-3">{sale.paymentMethod}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      {sale.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Record Scrap Sale */}
      {showSaleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Record Scrap (Cullet) Sale</h3>
            
            <form onSubmit={handleRecordSale} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Buyer / Recycler Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Buyer Phone</label>
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Weight Sold (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={totalWeightKg}
                    onChange={(e) => setTotalWeightKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Rate per kg (₹)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={ratePerUnit}
                    onChange={(e) => setRatePerUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-white/10 flex justify-between items-center font-bold">
                <span className="text-slate-300">Estimated Total:</span>
                <span className="text-emerald-400 font-mono text-sm">
                  {formatINR(Number(totalWeightKg) * Number(ratePerUnit))}
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSaleModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold"
                >
                  Confirm Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
