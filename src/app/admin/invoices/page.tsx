'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Plus, 
  Search, 
  CheckCircle2, 
  IndianRupee, 
  CreditCard,
  Building2,
  X
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // New Invoice Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [customerName, setCustomerName] = useState('Sri Krishna Interiors');
  const [customerPhone, setCustomerPhone] = useState('+91 98480 12345');
  const [customerAddress, setCustomerAddress] = useState('Road No 36, Jubilee Hills, Hyderabad');
  const [customerGstin, setCustomerGstin] = useState('36AAAFK7890H1Z4');
  const [subtotal, setSubtotal] = useState('25000');
  const [cuttingCharges, setCuttingCharges] = useState('1500');
  const [transportCharges, setTransportCharges] = useState('1200');
  const [amountPaid, setAmountPaid] = useState('10000');

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await fetch('/api/invoices');
      const data = await res.json();
      setInvoices(data.invoices || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const numSub = parseFloat(subtotal) || 0;
    const numCut = parseFloat(cuttingCharges) || 0;
    const numTrans = parseFloat(transportCharges) || 0;
    const taxable = numSub + numCut + numTrans;
    const cgst = Math.round(taxable * 0.09 * 100) / 100;
    const sgst = cgst;
    const total = taxable + cgst + sgst;
    const paid = parseFloat(amountPaid) || 0;

    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 'cust-manual',
          customerName,
          customerPhone,
          customerAddress,
          customerGstin,
          subtotal: numSub,
          cuttingCharges: numCut,
          transportCharges: numTrans,
          cgstAmount: cgst,
          sgstAmount: sgst,
          totalAmount: total,
          amountPaid: paid,
          items: [
            {
              description: '10mm Clear Toughened Architectural Glass Panels',
              hsnCode: '7007',
              lengthMm: 2133,
              widthMm: 914,
              quantity: 2,
              totalSqFt: 42.0,
              ratePerSqFt: numSub / 42.0,
              amount: numSub,
            },
          ],
        }),
      });

      if (res.ok) {
        setShowCreateModal(false);
        await loadInvoices();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-teal-400" />
            <span>Tax Invoices &amp; Billing</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            GST-compliant tax invoices for Telangana (CGST 9% + SGST 9%) with printable PDF previews and credit balance ledgers.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Tax Invoice</span>
        </button>
      </div>

      {/* Invoices Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Invoices Registry</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">GSTIN</th>
                <th className="p-3">Date</th>
                <th className="p-3">Taxable Value</th>
                <th className="p-3">CGST + SGST</th>
                <th className="p-3">Grand Total</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Balance Due</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">View / Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-mono font-bold text-teal-300">{inv.invoiceNumber}</td>
                  <td className="p-3 font-semibold text-white">{inv.customerName}</td>
                  <td className="p-3 font-mono text-slate-400">{inv.customerGstin || 'Retail / B2C'}</td>
                  <td className="p-3 text-slate-400">{inv.invoiceDate?.slice(0, 10)}</td>
                  <td className="p-3 font-mono">{formatINR(inv.subtotal + (inv.cuttingCharges || 0) + (inv.transportCharges || 0))}</td>
                  <td className="p-3 font-mono text-slate-400">+{formatINR((inv.cgstAmount || 0) + (inv.sgstAmount || 0))}</td>
                  <td className="p-3 font-mono font-bold text-white text-sm">{formatINR(inv.totalAmount)}</td>
                  <td className="p-3 font-mono text-emerald-400">{formatINR(inv.amountPaid)}</td>
                  <td className="p-3 font-mono font-bold text-rose-400">{formatINR(inv.balanceDue)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inv.status === 'PAID'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-teal-400" />
                      <span>Print Tax Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice Modal / Viewer */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-8 space-y-6 shadow-2xl relative my-8">
            
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print Friendly Header */}
            <div className="border-b pb-6 flex justify-between items-start">
              <div>
                <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-800 text-[11px] font-bold tracking-wider uppercase">
                  TAX INVOICE
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Srivalli Glass Traders</h2>
                <p className="text-xs text-slate-600 max-w-sm mt-1">
                  Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana 500001<br />
                  GSTIN: <strong>36DRUPS5127N2ZQ</strong> &bull; State Code: 36 (Telangana)<br />
                  Phone: +91 98765 43210 &bull; Email: contact@srivalliglasstraders.com
                </p>
              </div>

              <div className="text-right space-y-1">
                <span className="font-mono text-sm font-bold text-teal-800 block">
                  {selectedInvoice.invoiceNumber}
                </span>
                <p className="text-xs text-slate-500">
                  Date: {selectedInvoice.invoiceDate?.slice(0, 10)}
                </p>
                <div className="pt-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold ${
                      selectedInvoice.status === 'PAID'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    STATUS: {selectedInvoice.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Billed To Customer */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border">
                <strong className="text-slate-500 uppercase text-[10px] block mb-1">Billed To (Customer):</strong>
                <h4 className="font-bold text-sm text-slate-900">{selectedInvoice.customerName}</h4>
                <p className="text-slate-600 mt-1">{selectedInvoice.customerAddress || 'Hyderabad, Telangana'}</p>
                <p className="text-slate-600">Phone: {selectedInvoice.customerPhone}</p>
                {selectedInvoice.customerGstin && (
                  <p className="text-teal-800 font-mono font-semibold mt-1">GSTIN: {selectedInvoice.customerGstin}</p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border space-y-1">
                <strong className="text-slate-500 uppercase text-[10px] block mb-1">Place of Supply:</strong>
                <p className="font-semibold text-slate-800">State: Telangana (Code 36)</p>
                <p className="text-slate-600">Applicable Tax: Intra-State CGST (9%) + SGST (9%)</p>
                <p className="text-slate-600">Payment Terms: Immediate / As Agreed</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">HSN</th>
                    <th className="p-2.5">Dimensions (mm)</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">Sq Ft</th>
                    <th className="p-2.5">Rate / sq ft</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selectedInvoice.items?.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="p-2.5 font-medium">{item.description}</td>
                      <td className="p-2.5 font-mono">{item.hsnCode || '7005'}</td>
                      <td className="p-2.5 font-mono">{item.lengthMm} &times; {item.widthMm}</td>
                      <td className="p-2.5">{item.quantity}</td>
                      <td className="p-2.5 font-mono">{item.totalSqFt?.toFixed(1)}</td>
                      <td className="p-2.5 font-mono">₹{item.ratePerSqFt?.toFixed(2)}</td>
                      <td className="p-2.5 font-mono font-bold text-right">{formatINR(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="flex justify-end pt-2">
              <div className="w-72 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Material Subtotal:</span>
                  <span className="font-mono">{formatINR(selectedInvoice.subtotal)}</span>
                </div>
                {selectedInvoice.cuttingCharges > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Cutting &amp; Polishing Charges:</span>
                    <span className="font-mono">+{formatINR(selectedInvoice.cuttingCharges)}</span>
                  </div>
                )}
                {selectedInvoice.transportCharges > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Transportation Charges:</span>
                    <span className="font-mono">+{formatINR(selectedInvoice.transportCharges)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>CGST (9%):</span>
                  <span className="font-mono">{formatINR(selectedInvoice.cgstAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SGST (9%):</span>
                  <span className="font-mono">{formatINR(selectedInvoice.sgstAmount)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-sm text-slate-900">
                  <span>Grand Total:</span>
                  <span className="text-teal-800 font-mono text-base">{formatINR(selectedInvoice.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Amount Paid:</span>
                  <span className="font-mono">{formatINR(selectedInvoice.amountPaid)}</span>
                </div>
                <div className="flex justify-between text-rose-700 font-bold border-t pt-1">
                  <span>Balance Due:</span>
                  <span className="font-mono">{formatINR(selectedInvoice.balanceDue)}</span>
                </div>
              </div>
            </div>

            {/* Footer Notice & Print Button */}
            <div className="border-t pt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Authorized Signatory &bull; Srivalli Glass Traders, Hyderabad
              </span>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print or Save PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create GST Tax Invoice</h3>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Customer / Firm Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Customer GSTIN (Optional)</label>
                  <input
                    type="text"
                    value={customerGstin}
                    onChange={(e) => setCustomerGstin(e.target.value)}
                    placeholder="36AAAAA0000A1Z5"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Site Delivery Address</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Material Subtotal</label>
                  <input
                    type="number"
                    value={subtotal}
                    onChange={(e) => setSubtotal(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
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
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Advance / Payment Collected (₹)</label>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-emerald-400 font-mono font-bold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold"
                >
                  Generate Tax Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

