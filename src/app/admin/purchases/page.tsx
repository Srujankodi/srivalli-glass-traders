'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  CheckCircle2, 
  Truck, 
  IndianRupee, 
  FileText 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function PurchasesPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [supplierId, setSupplierId] = useState('');
  const [subtotal, setSubtotal] = useState('50000');
  const [taxAmount, setTaxAmount] = useState('9000'); // 18% GST
  const [freightCost, setFreightCost] = useState('2000');
  const [handlingCost, setHandlingCost] = useState('1000');
  const [notes, setNotes] = useState('Stock replenishment of jumbo sheets');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/suppliers');
      const data = await res.json();
      setSuppliers(data.suppliers || []);
      if (data.suppliers && data.suppliers.length > 0) {
        setSupplierId(data.suppliers[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const landedCost =
    (parseFloat(subtotal) || 0) +
    (parseFloat(taxAmount) || 0) +
    (parseFloat(freightCost) || 0) +
    (parseFloat(handlingCost) || 0);

  const handleCreatePO = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPO = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2026-${String(purchaseOrders.length + 3).padStart(3, '0')}`,
      supplierId,
      supplierName: suppliers.find((s) => s.id === supplierId)?.name || 'Wholesale Supplier',
      orderDate: new Date().toISOString(),
      status: 'RECEIVED',
      paymentStatus: 'UNPAID',
      subtotal: parseFloat(subtotal),
      taxAmount: parseFloat(taxAmount),
      freightCost: parseFloat(freightCost),
      handlingCost: parseFloat(handlingCost),
      landedCostTotal: landedCost,
      amountPaid: 0,
      balanceDue: landedCost,
      notes,
    };

    setPurchaseOrders([newPO, ...purchaseOrders]);
    setShowModal(false);
  };

  const initialPOs = [
    {
      id: 'po-001',
      poNumber: 'PO-2026-001',
      supplierName: 'Saint-Gobain South Glass Dist.',
      orderDate: '2026-10-15',
      status: 'RECEIVED',
      paymentStatus: 'PAID',
      subtotal: 51200,
      taxAmount: 9216,
      freightCost: 2500,
      handlingCost: 1000,
      landedCostTotal: 63916,
      amountPaid: 63916,
      balanceDue: 0,
      notes: '10ft x 8ft float glass sheets',
    },
    {
      id: 'po-002',
      poNumber: 'PO-2026-002',
      supplierName: 'Deccan Toughened Processors',
      orderDate: '2026-10-28',
      status: 'RECEIVED',
      paymentStatus: 'PARTIALLY_PAID',
      subtotal: 78000,
      taxAmount: 14040,
      freightCost: 3000,
      handlingCost: 1500,
      landedCostTotal: 96540,
      amountPaid: 70000,
      balanceDue: 26540,
      notes: '10mm & 12mm Toughened sheets for Banjara Hills project',
    },
  ];

  const allPOs = [...purchaseOrders, ...initialPOs];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-teal-400" />
            <span>Purchase Orders &amp; Landed Cost Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track wholesale orders, freight transportation charges, hamali unloading labor, and accurate landed cost per square foot.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Purchase Order</span>
        </button>
      </div>

      {/* PO Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Purchase Orders Ledger</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">PO Number</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Date</th>
                <th className="p-3">Subtotal</th>
                <th className="p-3">GST (18%)</th>
                <th className="p-3">Freight &amp; Handling</th>
                <th className="p-3">Landed Cost Total</th>
                <th className="p-3">Balance Due</th>
                <th className="p-3">Stock Status</th>
                <th className="p-3">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allPOs.map((po) => (
                <tr key={po.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-mono font-bold text-teal-300">{po.poNumber}</td>
                  <td className="p-3 font-semibold text-white">{po.supplierName}</td>
                  <td className="p-3 text-slate-400">{po.orderDate}</td>
                  <td className="p-3 font-mono">{formatINR(po.subtotal)}</td>
                  <td className="p-3 font-mono">{formatINR(po.taxAmount)}</td>
                  <td className="p-3 font-mono">+{formatINR((po.freightCost || 0) + (po.handlingCost || 0))}</td>
                  <td className="p-3 font-mono font-bold text-white">{formatINR(po.landedCostTotal)}</td>
                  <td className="p-3 font-mono font-bold text-rose-400">{formatINR(po.balanceDue)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      {po.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        po.paymentStatus === 'PAID'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {po.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add PO Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create Wholesale Purchase Order</h3>

            <form onSubmit={handleCreatePO} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Select Supplier *</label>
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.paymentTerms})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Material Subtotal (₹)</label>
                  <input
                    type="number"
                    required
                    value={subtotal}
                    onChange={(e) => {
                      setSubtotal(e.target.value);
                      setTaxAmount(String(Math.round(parseFloat(e.target.value || '0') * 0.18)));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">GST Tax (18%)</label>
                  <input
                    type="number"
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Freight / Transport (₹)</label>
                  <input
                    type="number"
                    value={freightCost}
                    onChange={(e) => setFreightCost(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Hamali / Unloading (₹)</label>
                  <input
                    type="number"
                    value={handlingCost}
                    onChange={(e) => setHandlingCost(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Notes / Specifications</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              {/* Total Landed Cost Summary */}
              <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 flex justify-between items-center font-bold">
                <span className="text-slate-300">Total Landed Cost:</span>
                <span className="text-teal-300 font-mono text-base">{formatINR(landedCost)}</span>
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
                  Save &amp; Receive Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

