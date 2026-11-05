'use client';

import React, { useState, useEffect } from 'react';
import { 
  Contact2, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  IndianRupee 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Add Customer Modal
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Hyderabad, Telangana');
  const [customerType, setCustomerType] = useState('INTERIOR_DESIGNER');
  const [gstin, setGstin] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // In dev / production, load initial customers
    setCustomers([
      {
        id: 'cust-01',
        name: 'Sri Krishna Interiors & Architects',
        phone: '+91 98480 12345',
        email: 'krishna.interiors@gmail.com',
        address: 'Road No. 36, Jubilee Hills, Hyderabad',
        customerType: 'INTERIOR_DESIGNER',
        gstin: '36AAAFK7890H1Z4',
        totalPurchases: 145000,
        outstandingBalance: 18000,
        notes: 'Regular designer client, prefers premium toughened and frosted glass.',
      },
      {
        id: 'cust-02',
        name: 'Venkata Sai Builders & Developers',
        phone: '+91 99490 67890',
        email: 'projects@venkatasaibuilders.in',
        address: 'Kukatpally Housing Board, Hyderabad',
        customerType: 'BUILDER',
        gstin: '36AAGCV4321J1Z8',
        totalPurchases: 230000,
        outstandingBalance: 45000,
        notes: 'Bulk purchaser for residential apartment balconies and windows.',
      },
      {
        id: 'cust-03',
        name: 'Mohammed Arshad (Retail Walk-in)',
        phone: '+91 91234 56789',
        email: 'arshad.home@gmail.com',
        address: 'Mehdipatnam, Hyderabad',
        customerType: 'RETAIL',
        gstin: null,
        totalPurchases: 12500,
        outstandingBalance: 0,
        notes: 'Custom dining table top and washroom mirror.',
      },
    ]);
    setLoading(false);
  }, []);

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust = {
      id: `cust-${Date.now()}`,
      name,
      phone,
      email,
      address,
      customerType,
      gstin: gstin || null,
      totalPurchases: 0,
      outstandingBalance: 0,
      notes,
    };
    setCustomers([newCust, ...customers]);
    setShowModal(false);
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase()) ||
      c.customerType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Contact2 className="w-6 h-6 text-teal-400" />
            <span>Customer Management &amp; Accounts Ledger</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directory of retail customers, builders, interior designers, and contractors with purchase volume and outstanding debit balances.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Customer Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white">Registered Clients ({filtered.length})</h2>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-800 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-brand-teal"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Phone</th>
                <th className="p-3">GSTIN</th>
                <th className="p-3">Location / Address</th>
                <th className="p-3">Total Purchases</th>
                <th className="p-3">Outstanding Balance</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-semibold text-white">{c.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-slate-200">
                      {c.customerType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-teal-300">{c.phone}</td>
                  <td className="p-3 font-mono text-slate-400">{c.gstin || 'Retail / Non-GST'}</td>
                  <td className="p-3">{c.address}</td>
                  <td className="p-3 font-mono font-bold text-white">{formatINR(c.totalPurchases)}</td>
                  <td className="p-3 font-mono font-bold text-rose-400">{formatINR(c.outstandingBalance)}</td>
                  <td className="p-3 text-slate-400 text-xs italic">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Customer Record</h3>

            <form onSubmit={handleAddCustomer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Customer / Firm Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Builders / Interior Designer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-slate-300 mb-1">Customer Type</label>
                  <select
                    value={customerType}
                    onChange={(e) => setCustomerType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  >
                    <option value="INTERIOR_DESIGNER">Interior Designer</option>
                    <option value="CONTRACTOR">Contractor</option>
                    <option value="BUILDER">Builder</option>
                    <option value="RETAIL">Retail Customer</option>
                    <option value="GLASS_DEALER">Glass Dealer</option>
                    <option value="WHOLESALE_BUYER">Wholesale Buyer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">GSTIN Number (Optional)</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="36AAAAA0000A1Z5"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Site / Office Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Regular payment terms, preferred glass types"
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
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
