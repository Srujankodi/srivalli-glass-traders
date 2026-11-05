'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  FileSpreadsheet, 
  Plus, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  IndianRupee, 
  Share2,
  Calendar
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

function QuotationsContent() {
  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get('create') === 'true';

  const [quotations, setQuotations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(shouldOpenCreate);
  const [customerName, setCustomerName] = useState(searchParams.get('cust') || 'Hyderabad Retail Client');
  const [customerPhone, setCustomerPhone] = useState('+91 98480 12345');
  const [glassType, setGlassType] = useState(searchParams.get('glassType') || 'Toughened Glass');
  const [thicknessMm, setThicknessMm] = useState(searchParams.get('thickness') || '8');
  const [totalSqFt, setTotalSqFt] = useState(searchParams.get('sqft') || '48');
  const [subtotal, setSubtotal] = useState(searchParams.get('subtotal') || '5760');
  const [cuttingCharges, setCuttingCharges] = useState(searchParams.get('cut') || '300');
  const [transportCharges, setTransportCharges] = useState(searchParams.get('trans') || '400');
  const [taxAmount, setTaxAmount] = useState(searchParams.get('tax') || '1162.8');
  const [totalAmount, setTotalAmount] = useState(searchParams.get('total') || '7622.8');
  const [notes, setNotes] = useState('Standard edge polishing included. Valid for 15 days.');

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    try {
      const res = await fetch('/api/quotations');
      const data = await res.json();
      setQuotations(data.quotations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          subtotal: Number(subtotal),
          cuttingCharges: Number(cuttingCharges),
          transportCharges: Number(transportCharges),
          taxAmount: Number(taxAmount),
          totalAmount: Number(totalAmount),
          notes,
          items: [
            {
              glassType,
              thicknessMm: Number(thicknessMm),
              totalSqFt: Number(totalSqFt),
              ratePerSqFt: Number(subtotal) / Number(totalSqFt || 1),
              itemTotal: Number(subtotal),
            },
          ],
        }),
      });

      if (res.ok) {
        setShowModal(false);
        await loadQuotations();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-teal-400" />
            <span>Quotation Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate formal estimates, calculate square-foot prices, and share branded quotes directly via WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Quotation</span>
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">All Quotations</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Quote No</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Material Subtotal</th>
                <th className="p-3">Cutting &amp; Transport</th>
                <th className="p-3">GST Tax</th>
                <th className="p-3">Total Estimate</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Share via WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {quotations.map((q) => {
                const whatsappText = `Hello ${q.customerName || 'Customer'}, here is your quotation from *Srivalli Glass Traders, Hyderabad*:\n\n*Quote No:* ${q.quoteNumber}\n*Total Area:* ${q.items?.[0]?.totalSqFt || 48} sq ft\n*Material:* ${q.items?.[0]?.glassType || 'Glass'}\n*Estimate Total:* ₹${q.totalAmount.toLocaleString('en-IN')}\n\nValid for 15 days. Please reply to confirm!`;
                return (
                  <tr key={q.id} className="hover:bg-white/5 text-slate-300">
                    <td className="p-3 font-mono font-bold text-teal-300">{q.quoteNumber}</td>
                    <td className="p-3 font-semibold text-white">{q.customerName || 'Direct Customer'}</td>
                    <td className="p-3 text-slate-400">{q.quoteDate?.slice(0, 10)}</td>
                    <td className="p-3 font-mono">{formatINR(q.subtotal)}</td>
                    <td className="p-3 font-mono">+{formatINR((q.cuttingCharges || 0) + (q.transportCharges || 0))}</td>
                    <td className="p-3 font-mono">{formatINR(q.taxAmount)}</td>
                    <td className="p-3 font-mono font-bold text-teal-300 text-sm">{formatINR(q.totalAmount)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300">
                        {q.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-600 hover:bg-emerald-500 text-white inline-flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Send WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create Official Quotation</h3>

            <form onSubmit={handleCreateQuotation} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Customer Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Glass Type</label>
                  <input
                    type="text"
                    value={glassType}
                    onChange={(e) => setGlassType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Thickness (mm)</label>
                  <input
                    type="number"
                    value={thicknessMm}
                    onChange={(e) => setThicknessMm(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Total Sq Ft</label>
                  <input
                    type="number"
                    value={totalSqFt}
                    onChange={(e) => setTotalSqFt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Subtotal (₹)</label>
                  <input
                    type="number"
                    value={subtotal}
                    onChange={(e) => setSubtotal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Cutting (₹)</label>
                  <input
                    type="number"
                    value={cuttingCharges}
                    onChange={(e) => setCuttingCharges(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Transport (₹)</label>
                  <input
                    type="number"
                    value={transportCharges}
                    onChange={(e) => setTransportCharges(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">GST (₹)</label>
                  <input
                    type="number"
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Grand Total (₹)</label>
                <input
                  type="number"
                  required
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-teal-300 font-mono font-bold text-sm"
                />
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
                  Save &amp; Generate Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuotationsPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-12">Loading quotations...</div>}>
      <QuotationsContent />
    </Suspense>
  );
}
