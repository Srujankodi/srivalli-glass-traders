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
    <header className="h-16 bg-slate-900 border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Title / Context */}
      <div className="flex items-center space-x-3">
        <h1 className="text-sm font-bold text-white tracking-wide uppercase">
          Sri Valli Glass Traders &bull; Hyderabad ERP
        </h1>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live Database Active
        </span>
      </div>

      {/* Action shortcuts & User profile */}
      <div className="flex items-center space-x-3">
        
        {/* Quick action buttons */}
        <Link
          href="/admin/cutting"
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600/20 text-teal-300 hover:bg-teal-600/30 border border-teal-500/30 transition-colors"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>New Cut Job</span>
        </Link>

        <Link
          href="/admin/quotations"
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>New Quotation</span>
        </Link>

        {/* WhatsApp web shortcut */}
        <a
          href="https://web.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
          title="Open WhatsApp Web"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        {/* User Badge */}
        <div className="pl-3 border-l border-white/10 flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-bold text-xs">
            SK
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-bold text-white block leading-tight">Srivalli Kumar</span>
            <span className="text-[10px] text-teal-400 block leading-tight">Proprietor (Owner)</span>
          </div>
        </div>

      </div>

    </header>
  );
}
