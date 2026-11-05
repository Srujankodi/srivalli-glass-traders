'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users2, 
  Plus, 
  Search, 
  TrendingDown, 
  Phone, 
  Mail, 
  Building2, 
  CheckCircle2, 
  IndianRupee,
  Layers
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Supplier Modal
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Hyderabad, Telangana');
  const [gstin, setGstin] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('30 Days Net');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/suppliers');
      const data = await res.json();
      setSuppliers(data.suppliers || []);
      setComparisons(data.comparisonByProduct || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contactPerson,
          phone,
          email,
          address,
          gstin,
          paymentTerms,
          notes,
        }),
      });

      if (res.ok) {
        setShowModal(false);
        await loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users2 className="w-6 h-6 text-teal-400" />
            <span>Supplier Management &amp; Price Comparison</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directory of wholesale float and processing glass distributors in Hyderabad with real-time rate comparison.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* Supplier Price Comparison Matrix (Critical Business Feature) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 border border-blue-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>Wholesale Supplier Rate Comparison Engine</span>
            </h2>
            <p className="text-xs text-slate-400">Highlights the most economical verified supplier quote for each glass specification</p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            Best Landed Rates Highlighted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {comparisons.filter((c) => c.offers && c.offers.length > 0).map((comp, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white">{comp.product.name}</h4>
                  <span className="text-[11px] text-teal-400 font-medium">{comp.product.thicknessMm}mm &bull; {comp.product.glassType}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300">
                  {comp.offers.length} Quotes
                </span>
              </div>

              {/* Best Price Highlight Box */}
              {comp.bestPrice && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold block uppercase">Lowest Wholesale Rate</span>
                    <strong className="text-white text-xs">{comp.bestPrice.supplierName}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-300 font-mono">
                      ₹{comp.bestPrice.ratePerSqFt}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ sq ft</span>
                  </div>
                </div>
              )}

              {/* All Supplier Rates */}
              <div className="space-y-1.5 pt-1">
                {comp.offers.map((offer: any, oIdx: number) => (
                  <div key={oIdx} className="flex justify-between items-center text-slate-300 text-[11px]">
                    <span className="truncate max-w-[160px]">{offer.supplierName}</span>
                    <span className="font-mono font-medium">₹{offer.ratePerSqFt} / sq ft ({offer.deliveryDays}d delivery)</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Wholesale Supplier Directory</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Supplier Name</th>
                <th className="p-3">Contact Person</th>
                <th className="p-3">Phone</th>
                <th className="p-3">GSTIN</th>
                <th className="p-3">Payment Terms</th>
                <th className="p-3">Total Purchases</th>
                <th className="p-3">Outstanding Balance</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-semibold text-white">{s.name}</td>
                  <td className="p-3">{s.contactPerson || '—'}</td>
                  <td className="p-3 font-mono text-teal-300">{s.phone}</td>
                  <td className="p-3 font-mono text-slate-400">{s.gstin || '—'}</td>
                  <td className="p-3">{s.paymentTerms}</td>
                  <td className="p-3 font-mono font-bold text-white">{formatINR(s.totalPurchases || 0)}</td>
                  <td className="p-3 font-mono font-bold text-rose-400">{formatINR(s.outstandingBalance || 0)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add New Glass Supplier</h3>
            
            <form onSubmit={handleCreateSupplier} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Company / Supplier Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Asahi Glass Distributor"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="36AAAAA0000A1Z5"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Address / Industrial Area</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Payment Terms</label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                >
                  <option value="Immediate / Cash">Immediate / Cash</option>
                  <option value="7 Days Net">7 Days Net</option>
                  <option value="15 Days Net">15 Days Net</option>
                  <option value="30 Days Net">30 Days Net</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

