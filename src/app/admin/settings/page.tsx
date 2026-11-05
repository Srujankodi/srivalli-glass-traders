'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Percent, 
  Scissors 
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [companyName, setCompanyName] = useState('Srivalli Glass Traders');
  const [tagline, setTagline] = useState('Quality Glass Solutions at Competitive Prices');
  const [address, setAddress] = useState('Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana 500001');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('contact@srivalliglasstraders.com');
  const [whatsapp, setWhatsapp] = useState('+919876543210');
  const [businessHours, setBusinessHours] = useState('Mon - Sat: 9:00 AM - 8:30 PM | Sunday: 10:00 AM - 3:00 PM');
  const [gstin, setGstin] = useState('36AAAAA0000A1Z5');
  const [stateCode, setStateCode] = useState('36');
  const [defaultGstRate, setDefaultGstRate] = useState('18.0');
  const [cuttingLossMm, setCuttingLossMm] = useState('3.0');
  const [minRemnantAreaSqFt, setMinRemnantAreaSqFt] = useState('2.0');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          if (s.companyName) setCompanyName(s.companyName);
          if (s.tagline) setTagline(s.tagline);
          if (s.address) setAddress(s.address);
          if (s.phone) setPhone(s.phone);
          if (s.email) setEmail(s.email);
          if (s.whatsapp) setWhatsapp(s.whatsapp);
          if (s.businessHours) setBusinessHours(s.businessHours);
          if (s.gstin) setGstin(s.gstin);
          if (s.stateCode) setStateCode(s.stateCode);
          if (s.defaultGstRate) setDefaultGstRate(String(s.defaultGstRate));
          if (s.cuttingLossMm) setCuttingLossMm(String(s.cuttingLossMm));
          if (s.minRemnantAreaSqFt) setMinRemnantAreaSqFt(String(s.minRemnantAreaSqFt));
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          tagline,
          address,
          phone,
          email,
          whatsapp,
          businessHours,
          gstin,
          stateCode,
          defaultGstRate: parseFloat(defaultGstRate),
          cuttingLossMm: parseFloat(cuttingLossMm),
          minRemnantAreaSqFt: parseFloat(minRemnantAreaSqFt),
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-teal-400" />
            <span>Business Profile &amp; Website Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Updating details here directly changes the public customer website, WhatsApp chat links, and tax invoice headers on refresh.
          </p>
        </div>

        {saved && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved &amp; Updated Live on Website!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Enterprise Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Company Trade Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Business Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-300 mb-1">Workshop &amp; Trading Address (Hyderabad)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white"
            />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal-400" />
            <span>Customer Contact &amp; Channels</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Official Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-300 mb-1">Operating Business Hours</label>
            <input
              type="text"
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white"
            />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Percent className="w-4 h-4 text-teal-400" />
            <span>GST &amp; Tax Registration</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">State Code</label>
              <input
                type="text"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Default GST Rate (%)</label>
              <input
                type="number"
                step="0.5"
                value={defaultGstRate}
                onChange={(e) => setDefaultGstRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Scissors className="w-4 h-4 text-teal-400" />
            <span>Glass Cutting &amp; Remnant Engine Thresholds</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Cutting Kerf Loss (mm)</label>
              <input
                type="number"
                step="0.1"
                value={cuttingLossMm}
                onChange={(e) => setCuttingLossMm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Minimum Remnant Area for Salvage (sq ft)</label>
              <input
                type="number"
                step="0.5"
                value={minRemnantAreaSqFt}
                onChange={(e) => setMinRemnantAreaSqFt(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-2 shadow-glassHover transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save ERP Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
