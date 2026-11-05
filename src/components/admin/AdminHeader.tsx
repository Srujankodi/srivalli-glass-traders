'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bell, 
  MessageSquare, 
  Scissors, 
  FileSpreadsheet, 
  UserCheck, 
  Globe 
} from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Title / Context */}
      <div className="flex items-center space-x-3">
        <h1 className="text-sm font-extrabold text-slate-900 tracking-wide uppercase">
          Srivalli Glass Traders &bull; Hyderabad ERP
        </h1>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Live Database Active
        </span>
      </div>

      {/* Action shortcuts & User profile */}
      <div className="flex items-center space-x-3">
        
        {/* Quick action buttons */}
        <Link
          href="/admin/cutting"
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-[#8B1E2D] hover:bg-red-100 border border-red-200 transition-colors"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>New Cut Job</span>
        </Link>

        <Link
          href="/admin/quotations"
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>New Quotation</span>
        </Link>

        {/* WhatsApp web shortcut */}
        <a
          href="https://web.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          title="Open WhatsApp Web"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        {/* User Badge */}
        <div className="pl-3 border-l border-slate-200 flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[#8B1E2D] text-white flex items-center justify-center font-black text-xs shadow-xs">
            S
          </div>
          <div className="text-left">
            <span className="text-xs font-extrabold text-slate-900 block leading-tight">Srivalli</span>
          </div>
        </div>

      </div>

    </header>
  );
}
