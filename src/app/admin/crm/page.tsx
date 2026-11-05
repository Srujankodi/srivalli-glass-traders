'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Kanban, 
  MessageSquare, 
  Phone, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  UserCheck 
} from 'lucide-react';

const STAGES = [
  { id: 'NEW_INQUIRY', label: 'New Inquiries', color: 'border-teal-500' },
  { id: 'CONTACTED', label: 'Contacted', color: 'border-blue-500' },
  { id: 'REQUIREMENT_COLLECTED', label: 'Requirement Collected', color: 'border-indigo-500' },
  { id: 'CHECKING_INVENTORY', label: 'Checking Stock / Remnant', color: 'border-purple-500' },
  { id: 'QUOTATION_SENT', label: 'Quotation Sent', color: 'border-amber-500' },
  { id: 'ORDER_CONFIRMED', label: 'Order Confirmed', color: 'border-emerald-500' },
];

export default function CRMLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await fetch('/api/quote');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (leadId: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Kanban className="w-6 h-6 text-teal-400" />
            <span>CRM Pipeline &amp; Customer Inquiries</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage inquiries submitted via customer website, WhatsApp chat, and telephone walk-ins.
          </p>
        </div>

        <Link
          href="/quote"
          target="_blank"
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer Inquiry</span>
        </Link>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage.id);
          return (
            <div
              key={stage.id}
              className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col min-w-[220px] max-w-[260px] space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{stage.label}</span>
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                  {stageLeads.length}
                </span>
              </div>

              {/* Lead Cards in Stage */}
              <div className="space-y-3 flex-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`p-3.5 rounded-xl bg-slate-800/90 border-l-4 ${stage.color} border border-white/10 space-y-2 text-xs shadow-sm hover:border-white/30 transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-teal-400 font-bold">{lead.leadCode}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                        {lead.source}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-xs">{lead.customerName}</h4>

                    <div className="space-y-1 text-slate-300 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="text-teal-300 font-medium">
                        {lead.glassType} ({lead.thicknessMm}mm)
                      </div>
                      <div className="text-slate-400 font-mono">
                        {lead.length} &times; {lead.width} {lead.unit} &bull; {lead.estimatedSqFt} sq ft
                      </div>
                    </div>

                    {lead.notes && (
                      <p className="text-[10px] text-slate-400 line-clamp-2 italic bg-slate-900/50 p-1.5 rounded">
                        &quot;{lead.notes}&quot;
                      </p>
                    )}

                    {/* Quick Move / Conversion Actions */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${lead.customerName},%20regarding%20your%20glass%20inquiry%20${lead.leadCode}%20at%20Sri%20Valli%20Glass...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 p-1"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>

                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className="text-[10px] bg-slate-900 border border-white/15 rounded px-1.5 py-0.5 text-slate-300"
                      >
                        {STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            &rarr; {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="py-6 text-center text-slate-600 text-[11px]">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
