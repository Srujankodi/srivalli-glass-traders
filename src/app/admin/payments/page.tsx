'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  CheckCircle2, 
  IndianRupee, 
  ArrowDownLeft, 
  ArrowUpRight,
  Receipt 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Payment Modal
  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState('CUSTOMER_COLLECTION');
  const [invoiceId, setInvoiceId] = useState('');
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [amount, setAmount] = useState('15000');
  const [referenceNumber, setReferenceNumber] = useState('UPI-44332211');
  const [notes, setNotes] = useState('Partial invoice settlement');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const pRes = await fetch('/api/payments');
      const pData = await pRes.json();
      setPayments(pData.payments || []);

      const iRes = await fetch('/api/invoices');
      const iData = await iRes.json();
      setInvoices(iData.invoices || []);
      if (iData.invoices && iData.invoices.length > 0) {
        setInvoiceId(iData.invoices[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentType,
          invoiceId: paymentType === 'CUSTOMER_COLLECTION' ? invoiceId : null,
          paymentMode,
          amount: parseFloat(amount),
          referenceNumber,
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

  const totalCollected = payments
    .filter((p) => p.paymentType === 'CUSTOMER_COLLECTION')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaidToSuppliers = payments
    .filter((p) => p.paymentType === 'SUPPLIER_PAYMENT')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-teal-400" />
            <span>Payments &amp; Collections Ledger</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reconcile Cash, UPI, and Bank Transfers across customer sales and supplier wholesale accounts.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Record Payment / Collection</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-medium">
            <span>Customer Payments Collected</span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {formatINR(totalCollected)}
          </div>
          <p className="text-xs text-slate-400">Total verified incoming cash &amp; UPI</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-medium">
            <span>Supplier Payments Paid</span>
            <ArrowUpRight className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {formatINR(totalPaidToSuppliers)}
          </div>
          <p className="text-xs text-slate-400">Settled to wholesale manufacturers</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Payment Transactions History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Receipt No</th>
                <th className="p-3">Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Mode</th>
                <th className="p-3">Reference / Txn ID</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Notes</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-mono font-bold text-teal-300">{p.paymentReceiptNo}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        p.paymentType === 'CUSTOMER_COLLECTION'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {p.paymentType === 'CUSTOMER_COLLECTION' ? 'Collection (In)' : 'Supplier Pay (Out)'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{p.paymentDate?.slice(0, 10)}</td>
                  <td className="p-3 font-medium text-white">{p.paymentMode}</td>
                  <td className="p-3 font-mono text-slate-400">{p.referenceNumber || '—'}</td>
                  <td className="p-3 font-mono font-bold text-white text-sm">{formatINR(p.amount)}</td>
                  <td className="p-3 text-slate-400 text-xs">{p.notes || '—'}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Record Payment / Collection</h3>

            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Transaction Type</label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                >
                  <option value="CUSTOMER_COLLECTION">Customer Collection (Advance / Balance)</option>
                  <option value="SUPPLIER_PAYMENT">Payment to Wholesale Supplier</option>
                </select>
              </div>

              {paymentType === 'CUSTOMER_COLLECTION' && (
                <div>
                  <label className="block text-slate-300 mb-1">Link to Tax Invoice</label>
                  <select
                    value={invoiceId}
                    onChange={(e) => setInvoiceId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  >
                    {invoices.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.invoiceNumber} &bull; {inv.customerName} (Bal: {formatINR(inv.balanceDue)})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  >
                    <option value="UPI">UPI (GooglePay / PhonePe / Paytm)</option>
                    <option value="BANK_TRANSFER">Bank NEFT / RTGS</option>
                    <option value="CASH">Cash</option>
                    <option value="CHEQUE">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-emerald-400 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Reference / UTR / Cheque Number</label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="e.g. UPI Ref / Bank UTR"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
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
                  Record Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

