'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  IndianRupee, 
  Scissors, 
  Layers, 
  Calendar 
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
  LineChart,
  Line,
} from 'recharts';
import { formatINR } from '@/lib/calculator';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6M');

  const profitTrendData = [
    { month: 'Jun', revenue: 42000, cogs: 27000, expenses: 4000, netProfit: 11000 },
    { month: 'Jul', revenue: 58000, cogs: 34000, expenses: 5000, netProfit: 19000 },
    { month: 'Aug', revenue: 64000, cogs: 39000, expenses: 6000, netProfit: 19000 },
    { month: 'Sep', revenue: 72000, cogs: 44000, expenses: 7000, netProfit: 21000 },
    { month: 'Oct', revenue: 86150, cogs: 51000, expenses: 12916, netProfit: 22234 },
    { month: 'Nov', revenue: 61950, cogs: 38000, expenses: 4000, netProfit: 19950 },
  ];

  const productShareData = [
    { name: '10mm Clear Toughened', sales: 48000, color: '#0D9488' },
    { name: '12mm Clear Toughened', sales: 38000, color: '#2563EB' },
    { name: '8mm Clear Float', sales: 24000, color: '#8B5CF6' },
    { name: '5mm Modiguard Mirror', sales: 16000, color: '#F59E0B' },
    { name: '5mm Bronze Tinted', sales: 12000, color: '#EC4899' },
  ];

  const materialEfficiencyData = [
    { name: 'Customer Cut Glass', value: 82, color: '#0D9488' },
    { name: 'Salvaged Reusable Remnant', value: 14, color: '#3B82F6' },
    { name: 'Scrap Cullet (Recycled)', value: 4, color: '#94A3B8' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-400" />
            <span>Business Analytics &amp; Profit Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Financial analytics, gross and net margins, scrap recovery efficiency, and top product revenue drivers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Period:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none"
          >
            <option value="1M">This Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months (H2)</option>
            <option value="1Y">Full Year</option>
          </select>
        </div>
      </div>

      {/* Main Profit & Revenue Trend Chart */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Monthly Profitability &amp; Cost Analysis</h3>
            <p className="text-xs text-slate-400">Revenue vs COGS (Landed Material Cost) vs Net Profit</p>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold">Average Margin: 25.8%</span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                formatter={(val: any) => [formatINR(val), '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="revenue" name="Sales Revenue" stroke="#0D9488" strokeWidth={3} />
              <Line type="monotone" dataKey="cogs" name="Material COGS" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="netProfit" name="Net Profit" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Visual Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Selling Products */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white">Top Revenue Driving Products</h3>
          <p className="text-xs text-slate-400">Highest grossing glass specifications in Hyderabad market</p>

          <div className="space-y-3 pt-2">
            {productShareData.map((prod) => (
              <div key={prod.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold text-white">{prod.name}</span>
                  <span className="font-mono font-bold">{formatINR(prod.sales)}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(prod.sales / 48000) * 100}%`,
                      backgroundColor: prod.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Yield Donut */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Material Utilization Yield</h3>
            <p className="text-xs text-slate-400">Yield breakdown across cut orders, offcut remnants, and scrap</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialEfficiencyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {materialEfficiencyData.map((entry, index) => (
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

          <div className="space-y-1.5 text-xs pt-2 border-t border-white/10">
            {materialEfficiencyData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-slate-300 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <strong className="text-white font-mono">{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
