'use client';

import React from 'react';
import { 
  FileBarChart, 
  Download, 
  FileSpreadsheet, 
  Boxes, 
  Repeat, 
  IndianRupee, 
  Scissors, 
  CheckCircle2 
} from 'lucide-react';

export default function ReportsExportPage() {
  const reportsList = [
    {
      id: 'sales',
      title: 'Sales & Invoicing Report',
      description: 'Complete register of generated tax invoices, Telangana CGST/SGST breakdown, and outstanding debtor balances.',
      icon: FileSpreadsheet,
      csvUrl: '/api/reports/export?type=sales&format=csv',
    },
    {
      id: 'inventory',
      title: 'Glass Sheet Stock Valuation',
      description: 'Physical inventory list of full stock sheets, dimensions in mm, square-foot area, landed costs, and rack bins.',
      icon: Boxes,
      csvUrl: '/api/reports/export?type=inventory&format=csv',
    },
    {
      id: 'remnants',
      title: 'Reusable Remnants & Salvage Offcuts',
      description: 'Audit report of all usable offcut pieces created from previous cutting jobs with lineage to source jumbo sheets.',
      icon: Repeat,
      csvUrl: '/api/reports/export?type=remnants&format=csv',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileBarChart className="w-6 h-6 text-teal-400" />
            <span>Reports &amp; Data Exports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Download business records in standard CSV and Excel compatible formats for accounting, auditing, and tax filing.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportsList.map((rep) => {
          const Icon = rep.icon;
          return (
            <div
              key={rep.id}
              className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 flex flex-col justify-between hover:border-teal-500/40 transition-colors shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{rep.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{rep.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={rep.csvUrl}
                  download
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV / Excel</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* P&L Statement Summary Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-emerald-400" />
          <span>Profit &amp; Loss Operational Accounting Summary</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/5 space-y-1">
            <span className="text-slate-400 block">Gross Invoiced Revenue:</span>
            <strong className="text-white text-base font-mono">₹1,48,100</strong>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/5 space-y-1">
            <span className="text-slate-400 block">Material Landed COGS:</span>
            <strong className="text-slate-300 text-base font-mono">- ₹96,265</strong>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/5 space-y-1">
            <span className="text-slate-400 block">Operating Overheads:</span>
            <strong className="text-rose-400 text-base font-mono">- ₹13,200</strong>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
            <span className="text-emerald-300 block">Audited Net Profit:</span>
            <strong className="text-emerald-300 text-base font-mono font-bold">+ ₹40,210</strong>
          </div>
        </div>
      </div>

    </div>
  );
}
