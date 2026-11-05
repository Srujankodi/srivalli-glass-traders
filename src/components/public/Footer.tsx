'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export default function PublicFooter() {
  const [address, setAddress] = useState('Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana 500001');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('contact@srivalliglasstraders.com');
  const [whatsapp, setWhatsapp] = useState('+919876543210');
  const [gstin, setGstin] = useState('36AAAAA0000A1Z5');
  const [businessHours, setBusinessHours] = useState('Mon - Sat: 9:00 AM - 8:30 PM | Sunday: 10:00 AM - 3:00 PM');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          if (s.address) setAddress(s.address);
          if (s.phone) setPhone(s.phone);
          if (s.email) setEmail(s.email);
          if (s.whatsapp) setWhatsapp(s.whatsapp);
          if (s.gstin) setGstin(s.gstin);
          if (s.businessHours) setBusinessHours(s.businessHours);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const cleanWaNumber = whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#8B1E2D] flex items-center justify-center text-white shadow-md shrink-0">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black tracking-tight text-white block">
                  SRIVALLI GLASS TRADERS
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#C2364B] uppercase block">
                  Hyderabad &bull; Telangana
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Your dependable commercial glass trading and custom-cut glass supply partner in Hyderabad. 
              Supplying residential, commercial, and interior glass solutions with wholesale price benefits.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-950/60 text-red-300 border border-red-800/50">
                <span>GSTIN: {gstin}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Telangana Intra-State</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B1E2D]" />
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Our Business
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-400 hover:text-white transition-colors">
                  Glass Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-slate-400 hover:text-white transition-colors">
                  Request a Custom Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact &amp; Shop Location
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[#C2364B] hover:text-red-300 transition-colors flex items-center gap-1.5 font-bold pt-1">
                  <ShieldCheck className="w-4 h-4" /> Internal Staff ERP
                </Link>
              </li>
            </ul>
          </div>

          {/* Glass Products */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B1E2D]" />
              Glass Products
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>Clear Float Glass (3mm – 19mm)</li>
              <li>Toughened Structural Glass</li>
              <li>Bronze &amp; Grey Tinted Glass</li>
              <li>Acid Etched Frosted Glass</li>
              <li>Laminated Acoustic Glass</li>
              <li>High-Definition Mirror Glass</li>
              <li>Reusable Remnant Salvage</li>
            </ul>
          </div>

          {/* Depot & Workshop */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B1E2D]" />
              Depot &amp; Workshop
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#8B1E2D] shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white font-semibold transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 font-semibold transition-colors"
                >
                  WhatsApp: {phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#8B1E2D] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400 leading-normal">
                  {businessHours}
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Srivalli Glass Traders. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Hyderabad Wholesale Glass &bull; Precision Cut-to-Size
          </p>
        </div>
      </div>
    </footer>
  );
}
