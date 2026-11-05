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
    fetch('/api/inventory')
      .then((res) => res.json())
      .then(() => {
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

  const monthlyFinancialData = [
    { month: 'Jun', sales: 42000, purchases: 31000, profit: 11000 },
    { month: 'Jul', sales: 58000, purchases: 39000, profit: 19000 },
    { month: 'Aug', sales: 64000, purchases: 45000, profit: 19000 },
    { month: 'Sep', sales: 72000, purchases: 51000, profit: 21000 },
    { month: 'Oct', sales: 86150, purchases: 63916, profit: 22234 },
    { month: 'Nov (Current)', sales: metrics?.totalSales || 86150, purchases: metrics?.totalPurchases || 63916, profit: metrics?.netProfit || 22234 },
  ];

  const stockDistributionData = [
    { name: 'Clear Float Glass', value: 45, color: '#8B1E2D' },
    { name: 'Toughened Glass', value: 30, color: '#0F172A' },
    { name: 'Tinted & Mirror', value: 15, color: '#D97706' },
    { name: 'Reusable Remnants', value: 10, color: '#059669' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Executive Operations Dashboard
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#8B1E2D] border border-red-200">
              Hyderabad Main Depot
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Real-time material valuation, cutting salvage tracking, and gross/net profit analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/calculator"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white flex items-center gap-2 transition-all shadow-xs"
          >
            <Scissors className="w-4 h-4" />
            <span>Sq Ft Calculator</span>
          </Link>
          <Link
            href="/admin/cutting"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
          >
            Start Cut Job
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (12 Strategic Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. Total Revenue */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#8B1E2D] flex items-center justify-center font-bold">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatINR(metrics?.totalSales || 86150)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Recorded from verified invoices</span>
          </div>
        </div>

        {/* 2. Total Purchases */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Purchases</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatINR(metrics?.totalPurchases || 63916)}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Includes freight &amp; unloading costs
          </div>
        </div>

        {/* 3. Gross Profit */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Profit</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">
            {formatINR(metrics?.grossProfit || 30152)}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Sales minus landed material COGS
          </div>
        </div>

        {/* 4. Net Business Profit */}
        <div className="p-6 rounded-2xl bg-red-50/60 border border-red-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E2D]">Net Business Profit</span>
            <div className="w-9 h-9 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#8B1E2D]">
            {formatINR(metrics?.netProfit || 22234)}
          </div>
          <div className="text-xs text-slate-700 font-semibold">
            Margin: <strong>{metrics?.netProfitMargin || 25.8}%</strong> after operating overheads
          </div>
        </div>

        {/* 5. Available Stock Sheets */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Full Sheet Stock</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics?.availableInventorySqFt || 336} <span className="text-sm font-semibold text-slate-500">sq ft</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Valuation: <strong className="text-slate-800">{formatINR(metrics?.inventoryValue || 27272)}</strong>
          </div>
        </div>

        {/* 6. Reusable Remnant Stock */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Reusable Offcuts</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Repeat className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics?.availableRemnantsCount || 3} <span className="text-sm font-semibold text-slate-500">pieces ({metrics?.remnantsSqFt || 46} sq ft)</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Salvage value: <strong className="text-slate-800">{formatINR(metrics?.remnantsValue || 2838)}</strong>
          </div>
        </div>

        {/* 7. Scrap Recovery */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Scrap (Cullet)</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatINR(metrics?.scrapRevenue || 1575)}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Stock in bin: <strong className="text-slate-800">{metrics?.scrapStockKg || 127} kg</strong>
          </div>
        </div>

        {/* 8. Pending Sales Orders */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics?.pendingOrdersCount || 1} <span className="text-sm font-semibold text-slate-500">orders</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            CRM Leads: <strong className="text-slate-800">{metrics?.leadsCount || 2}</strong>
          </div>
        </div>

        {/* 9. Customer Outstanding (Receivables) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Customer Due (Receivable)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {formatINR(metrics?.customerOutstanding || 31950)}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Pending collection from clients
          </div>
        </div>

        {/* 10. Supplier Outstanding (Payables) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Supplier Due (Payable)</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-600">
            {formatINR(metrics?.supplierOutstanding || 26540)}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Pending to wholesale suppliers
          </div>
        </div>

        {/* 11. Operational Expenses */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Operating Expenses</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatINR(metrics?.totalExpenses || 13200)}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Labor, electricity, freight &amp; consumables
          </div>
        </div>

        {/* 12. Smart Cutting Salvage Rate */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Cutting Salvage Rate</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#8B1E2D] flex items-center justify-center font-bold">
              <Scissors className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#8B1E2D]">
            94.8%
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Only 5.2% converted to scrap cullet
          </div>
        </div>

      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Revenue vs Purchases Chart */}
        <div className="lg:col-span-8 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Monthly Sales, Purchases &amp; Profit</h3>
              <p className="text-xs text-slate-500">Financial performance tracking in Indian Rupees (₹)</p>
            </div>
            <span className="text-xs text-[#8B1E2D] font-bold font-mono px-2.5 py-1 rounded-full bg-red-50 border border-red-200">
              FY 2026
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFinancialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontWeight="bold" />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  formatter={(val: any) => [formatINR(val), '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="sales" name="Sales Revenue" fill="#8B1E2D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="purchases" name="Purchases" fill="#334155" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Net Profit" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Distribution Donut Chart */}
        <div className="lg:col-span-4 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Inventory Breakdown</h3>
            <p className="text-xs text-slate-500">Current square-footage by glass category</p>
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
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100 font-semibold">
            {stockDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-slate-700">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
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
          className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-[#8B1E2D]/50 hover:shadow-card transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#8B1E2D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Scissors className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-[#8B1E2D] transition-colors">
            Smart Glass Cutting Engine
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Enter cut dimensions, verify geometric fit, view visual 2D layout, and auto-catalog offcut remnants.
          </p>
        </Link>

        {/* Stock Remnants Search */}
        <Link
          href="/admin/remnants"
          className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-[#8B1E2D]/50 hover:shadow-card transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#8B1E2D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Repeat className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-[#8B1E2D] transition-colors">
            Reusable Remnant Stock
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Browse and match salvaged pieces from previous cuts before ordering or cutting full sheets.
          </p>
        </Link>

        {/* GST Invoicing & Billing */}
        <Link
          href="/admin/invoices"
          className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-[#8B1E2D]/50 hover:shadow-card transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#8B1E2D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-[#8B1E2D] transition-colors">
            Tax Invoices &amp; Payments
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Generate Telangana GST (18%) tax invoices, record UPI/NEFT receipts, and manage customer credit balances.
          </p>
        </Link>

      </div>

    </div>
  );
}
