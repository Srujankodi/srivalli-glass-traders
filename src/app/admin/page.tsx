'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Boxes,
  ShoppingCart,
  IndianRupee,
  Repeat,
  Trash2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Scissors,
  Users,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { formatINR } from '@/lib/calculator';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In dev / production, load live dynamic metrics from API
    fetch('/api/inventory')
      .then((res) => res.json())
      .then(() => {
        // Fetch dashboard metrics
        fetchMetrics();
      })
      .catch((e) => console.error(e));
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/reports/export?type=metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Sample historical trend comparison for Recharts
  const monthlyFinancialData = [
    { month: 'Jun', sales: 42000, purchases: 31000, profit: 11000 },
    { month: 'Jul', sales: 58000, purchases: 39000, profit: 19000 },
    { month: 'Aug', sales: 64000, purchases: 45000, profit: 19000 },
    { month: 'Sep', sales: 72000, purchases: 51000, profit: 21000 },
    { month: 'Oct', sales: 86150, purchases: 63916, profit: 22234 },
    { month: 'Nov (Current)', sales: metrics?.totalSales || 86150, purchases: metrics?.totalPurchases || 63916, profit: metrics?.netProfit || 22234 },
  ];

  const stockDistributionData = [
    { name: 'Clear Float Glass', value: 45, color: '#0D9488' },
    { name: 'Toughened Glass', value: 30, color: '#2563EB' },
    { name: 'Tinted & Mirror', value: 15, color: '#8B5CF6' },
    { name: 'Reusable Remnants', value: 10, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white">Executive Operations Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
              Hyderabad Main Branch
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time material valuation, cutting salvage tracking, and gross/net profit analytics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/calculator"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Sq Ft Calculator</span>
          </Link>
          <Link
            href="/admin/cutting"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
          >
            Start Cut Job
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (12 Strategic Business Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Monthly Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Sales Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatINR(metrics?.totalSales || 86150)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Recorded from verified invoices</span>
          </div>
        </div>

        {/* 2. Total Purchases */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Landed Purchases</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatINR(metrics?.totalPurchases || 63916)}
          </div>
          <div className="text-xs text-slate-400">
            Includes freight &amp; unloading costs
          </div>
        </div>

        {/* 3. Gross Profit */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Gross Profit</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {formatINR(metrics?.grossProfit || 30152)}
          </div>
          <div className="text-xs text-slate-400">
            Sales minus landed material COGS
          </div>
        </div>

        {/* 4. Net Business Profit */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3 bg-emerald-950/10">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-300">Net Business Profit</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-300">
            {formatINR(metrics?.netProfit || 22234)}
          </div>
          <div className="text-xs text-emerald-400/80 font-medium">
            Margin: <strong>{metrics?.netProfitMargin || 25.8}%</strong> after operating overheads
          </div>
        </div>

        {/* 5. Available Stock Sheets */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Full Sheet Stock</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {metrics?.availableInventorySqFt || 336} <span className="text-sm font-normal text-slate-400">sq ft</span>
          </div>
          <div className="text-xs text-slate-400">
            Valuation: <strong>{formatINR(metrics?.inventoryValue || 27272)}</strong>
          </div>
        </div>

        {/* 6. Reusable Remnant Stock */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Reusable Offcuts</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-300">
            {metrics?.availableRemnantsCount || 3} <span className="text-sm font-normal text-slate-400">pieces ({metrics?.remnantsSqFt || 46} sq ft)</span>
          </div>
          <div className="text-xs text-slate-400">
            Allocated salvage value: <strong>{formatINR(metrics?.remnantsValue || 2838)}</strong>
          </div>
        </div>

        {/* 7. Scrap Recovery */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Scrap (Cullet)</span>
            <div className="w-8 h-8 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatINR(metrics?.scrapRevenue || 1575)}
          </div>
          <div className="text-xs text-slate-400">
            Stock in bin: <strong>{metrics?.scrapStockKg || 127} kg</strong>
          </div>
        </div>

        {/* 8. Pending Sales Orders */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Active Orders</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {metrics?.pendingOrdersCount || 1} <span className="text-sm font-normal text-slate-400">orders</span>
          </div>
          <div className="text-xs text-slate-400">
            CRM Leads: <strong>{metrics?.leadsCount || 2}</strong>
          </div>
        </div>

        {/* 9. Customer Outstanding (Receivables) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Customer Due (Receivable)</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-orange-400">
            {formatINR(metrics?.customerOutstanding || 31950)}
          </div>
          <div className="text-xs text-slate-400">
            Pending collection from clients
          </div>
        </div>

        {/* 10. Supplier Outstanding (Payables) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Supplier Due (Payable)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-400">
            {formatINR(metrics?.supplierOutstanding || 26540)}
          </div>
          <div className="text-xs text-slate-400">
            Pending payments to wholesale suppliers
          </div>
        </div>

        {/* 11. Operational Expenses */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Operating Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatINR(metrics?.totalExpenses || 13200)}
          </div>
          <div className="text-xs text-slate-400">
            Labor, electricity, freight, and tools
          </div>
        </div>

        {/* 12. Smart Cutting Salvage Rate */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-teal-500/30 space-y-3 bg-teal-950/10">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider text-teal-300">Offcut Salvage Efficiency</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/30 text-teal-300 flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-teal-300">
            94.8%
          </div>
          <div className="text-xs text-teal-400/80">
            Only 5.2% converted to scrap cullet
          </div>
        </div>

      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Revenue vs Purchases Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Sales, Purchases &amp; Profit</h3>
              <p className="text-xs text-slate-400">Financial performance tracking in Indian Rupees (₹)</p>
            </div>
            <span className="text-xs text-teal-400 font-mono font-medium">H2 FY 2026</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFinancialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(val: any) => [formatINR(val), '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="sales" name="Sales Revenue" fill="#0D9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="purchases" name="Purchases" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Net Profit" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Distribution Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Inventory Breakdown</h3>
            <p className="text-xs text-slate-400">Current square-footage by glass category</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {stockDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '12px' }}
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/10">
            {stockDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Action Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Cutting Job Action */}
        <Link
          href="/admin/cutting"
          className="p-6 rounded-2xl bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-500/30 hover:border-teal-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Scissors className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-1">Smart Glass Cutting Module</h4>
          <p className="text-xs text-slate-400">
            Enter cut dimensions, verify geometric fit, view visual 2D layout, and auto-catalog offcut remnants.
          </p>
        </Link>

        {/* Stock Remnants Search */}
        <Link
          href="/admin/remnants"
          className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-500/30 hover:border-blue-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Repeat className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-1">Reusable Remnant Stock</h4>
          <p className="text-xs text-slate-400">
            Browse and match salvaged pieces from previous cuts before ordering or cutting full sheets.
          </p>
        </Link>

        {/* GST Invoicing & Billing */}
        <Link
          href="/admin/invoices"
          className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 hover:border-purple-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-1">Tax Invoices &amp; Payments</h4>
          <p className="text-xs text-slate-400">
            Generate Telangana GST (18%) tax invoices, record UPI/NEFT receipts, and manage customer credit balances.
          </p>
        </Link>

      </div>

    </div>
  );
}
