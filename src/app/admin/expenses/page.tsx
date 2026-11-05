'use client';

import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  TrendingUp, 
  IndianRupee, 
  Truck, 
  Zap, 
  Wrench, 
  Users 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Expense Modal
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('TRANSPORTATION');
  const [amount, setAmount] = useState('2500');
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [description, setDescription] = useState('Auto trolley transport for Banjara Hills delivery');
  const [recipient, setRecipient] = useState('Srinivas Transport');

  useEffect(() => {
    // In dev / production, load initial expenses
    setExpenses([
      {
        id: 'exp-01',
        category: 'TRANSPORTATION',
        amount: 3500,
        paymentMode: 'UPI',
        expenseDate: '2026-10-18',
        description: 'Auto trolley freight for Saint-Gobain sheet transport to shop',
        recipient: 'Srinivas Transport',
      },
      {
        id: 'exp-02',
        category: 'LABOR',
        amount: 4000,
        paymentMode: 'CASH',
        expenseDate: '2026-10-25',
        description: 'Glass loading, unloading and shifting labor wages',
        recipient: 'Daily Hamali Group',
      },
      {
        id: 'exp-03',
        category: 'ELECTRICITY',
        amount: 4200,
        paymentMode: 'UPI',
        expenseDate: '2026-10-31',
        description: 'Monthly workshop power bill (TSSPDCL Hyderabad)',
        recipient: 'Telangana Southern Power Distribution',
      },
      {
        id: 'exp-04',
        category: 'REPAIRS_MAINTENANCE',
        amount: 1500,
        paymentMode: 'CASH',
        expenseDate: '2026-11-01',
        description: 'Tungsten carbide cutter wheels and suction pads replacement',
        recipient: 'Balanagar Tools Store',
      },
    ]);
    setLoading(false);
  }, []);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newExp = {
      id: `exp-${Date.now()}`,
      category,
      amount: parseFloat(amount),
      paymentMode,
      expenseDate: new Date().toISOString().slice(0, 10),
      description,
      recipient,
    };
    setExpenses([newExp, ...expenses]);
    setShowModal(false);
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-teal-400" />
            <span>Operating Expense Book</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track daily workshop operational overheads: Hamali labor, freight, tool consumables, and power utility bills.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-medium">Total Overhead Expenses</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">
            {formatINR(totalExpense)}
          </div>
          <p className="text-xs text-slate-400">Deducted from gross profit for net profit</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-medium">Top Category</span>
          <div className="text-xl font-bold text-white">
            Electricity &amp; Power
          </div>
          <p className="text-xs text-slate-400">Heavy glass polishing &amp; lighting</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-medium">Logistics &amp; Hamali</span>
          <div className="text-xl font-bold text-teal-300 font-mono">
            ₹7,500
          </div>
          <p className="text-xs text-slate-400">Safe handling without breakage</p>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Expense Ledger</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Recipient / Vendor</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {expenses.map((e) => (
                <tr key={e.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 text-slate-400">{e.expenseDate}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-slate-200">
                      {e.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-white">{e.description}</td>
                  <td className="p-3 text-slate-300">{e.recipient}</td>
                  <td className="p-3">{e.paymentMode}</td>
                  <td className="p-3 font-mono font-bold text-rose-400 text-right">{formatINR(e.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Record Operating Expense</h3>

            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Expense Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                >
                  <option value="TRANSPORTATION">Transportation &amp; Freight</option>
                  <option value="LABOR">Hamali &amp; Labor Wages</option>
                  <option value="ELECTRICITY">Electricity &amp; Workshop Power</option>
                  <option value="REPAIRS_MAINTENANCE">Repairs &amp; Cutting Tools</option>
                  <option value="RENT">Rent &amp; Premises</option>
                  <option value="PACKAGING">Packaging &amp; Corner Protectors</option>
                  <option value="OTHER">Other Miscellaneous</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Payment Method</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                  >
                    <option value="UPI">UPI</option>
                    <option value="CASH">Cash</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Recipient / Vendor / Hamali Group</label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description / Details</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
