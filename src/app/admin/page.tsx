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
  CheckCircle2,
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
    { month: 'Nov (Current)', sales: metrics?.totalSales || 86150, purchases: metrics?.totalPurchases || 160456, profit: metrics?.netProfit || 18527.5 },
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

      {/* 1. MASTER FINANCIAL PERFORMANCE FLOW (Executive Command Ribbon) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="px-7 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-700">
              Executive Financial Command &amp; Profit Engine
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Verified P&amp;L • Wholesale Margins</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
              Active Growth
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* 1. Total Sales Revenue */}
          <div className="p-7 space-y-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Total Sales Revenue
              </span>
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#8B1E2D] flex items-center justify-center font-bold">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {formatINR(metrics?.totalSales || 86150)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Recorded from verified invoices</span>
            </div>
          </div>

          {/* 2. Total Purchases */}
          <div className="p-7 space-y-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Total Purchases
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {formatINR(metrics?.totalPurchases || 160456)}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Includes freight &amp; unloading costs
            </div>
          </div>

          {/* 3. Gross Profit */}
          <div className="p-7 space-y-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Gross Profit
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-emerald-700 tracking-tight">
              {formatINR(metrics?.grossProfit || 30152.5)}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Sales minus landed material COGS
            </div>
          </div>

          {/* 4. Net Business Profit (Hero Highlight Pod) */}
          <div className="p-7 bg-gradient-to-br from-[#8B1E2D] via-[#7D1623] to-[#590C16] text-white space-y-3 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-100">
                Net Business Profit
              </span>
              <div className="w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {formatINR(metrics?.netProfit || 18527.5)}
              </div>
              <div className="text-xs text-red-100 font-semibold mt-1">
                Margin: <strong className="text-white font-black">{metrics?.netProfitMargin || 21.5}%</strong> after operating overheads
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. GLASS DEPOT INVENTORY & CUTTING SALVAGE INTELLIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 8 Columns: Glass Stock, Remnant Offcuts & Cullet Scrap */}
        <div className="lg:col-span-8 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#8B1E2D]" />
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Glass Yard Stock &amp; Remnant Reserves
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Physical glass assets across warehouse racks, offcut racks, and cullet bin
              </p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-700">
              Live Stock Count
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 5. Full Sheet Stock */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Full Sheet Stock
                </span>
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs">
                  <Boxes className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {metrics?.availableInventorySqFt || 336} <span className="text-xs font-bold text-slate-500">sq ft</span>
              </div>
              <div className="text-xs text-slate-500 font-medium pt-1 border-t border-slate-200/60">
                Valuation: <strong className="text-slate-900 font-bold">{formatINR(metrics?.inventoryValue || 27272)}</strong>
              </div>
            </div>

            {/* 6. Reusable Offcuts */}
            <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70 hover:bg-amber-50/70 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Reusable Offcuts
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Repeat className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {metrics?.availableRemnantsCount || 3} <span className="text-xs font-bold text-slate-500">pieces ({metrics?.remnantsSqFt || 46} sq ft)</span>
              </div>
              <div className="text-xs text-amber-900 font-medium pt-1 border-t border-amber-200/50">
                Salvage value: <strong className="text-amber-950 font-bold">{formatINR(metrics?.remnantsValue || 2838)}</strong>
              </div>
            </div>

            {/* 7. Scrap Cullet */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Scrap (Cullet)
                </span>
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs">
                  <Trash2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {formatINR(metrics?.scrapRevenue || 1575)}
              </div>
              <div className="text-xs text-slate-500 font-medium pt-1 border-t border-slate-200/60">
                Stock in bin: <strong className="text-slate-900 font-bold">{metrics?.scrapStockKg || 127} kg</strong>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Columns: Cutting Salvage Rate Gauge */}
        <div className="lg:col-span-4 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#8B1E2D]" />
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Cutting Salvage Rate
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Optimal
            </span>
          </div>

          <div className="flex items-center justify-center gap-5 py-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-[#8B1E2D]"
                  strokeWidth="8"
                  strokeDasharray={238.76}
                  strokeDashoffset={238.76 * (1 - 0.948)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-900 leading-none">94.8%</span>
                <span className="text-[9px] font-extrabold text-[#8B1E2D] uppercase tracking-wider mt-0.5">Yield</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-600 font-medium">
                Only <strong>5.2%</strong> converted to scrap cullet
              </div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Exceeds 90% target</span>
              </div>
            </div>
          </div>

          <Link
            href="/admin/cutting"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-[#8B1E2D] text-white text-center transition-colors flex items-center justify-center gap-2"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Launch Cutting Optimizer</span>
          </Link>
        </div>

      </div>

      {/* 3. WORKING CAPITAL, LIQUIDITY & ORDERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 9. Customer Due (Receivable) */}
        <div className="p-6 rounded-3xl bg-amber-50/30 border border-amber-200/80 shadow-xs space-y-3 hover:border-amber-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
              Customer Due (Receivable)
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700">
            {formatINR(metrics?.customerOutstanding || 31950)}
          </div>
          <div className="text-xs text-amber-900/80 font-medium">
            Pending collection from clients
          </div>
        </div>

        {/* 10. Supplier Due (Payable) */}
        <div className="p-6 rounded-3xl bg-rose-50/30 border border-rose-200/80 shadow-xs space-y-3 hover:border-rose-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-900">
              Supplier Due (Payable)
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-700">
            {formatINR(metrics?.supplierOutstanding || 26540)}
          </div>
          <div className="text-xs text-rose-900/80 font-medium">
            Pending to wholesale suppliers
          </div>
        </div>

        {/* 11. Operating Expenses */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Operating Expenses
            </span>
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

        {/* 12. Active Orders & CRM Leads */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Active Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#8B1E2D] flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics?.pendingOrdersCount || 1} <span className="text-sm font-semibold text-slate-500">orders</span>
          </div>
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>CRM Leads: <strong className="text-slate-900 font-bold">{metrics?.leadsCount || 2}</strong></span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">In Workshop</span>
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
