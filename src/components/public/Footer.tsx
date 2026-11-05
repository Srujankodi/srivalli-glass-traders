'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';

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
    <footer className="bg-slate-950 text-slate-200 border-t border-teal-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-slate-900 flex items-center justify-center border border-teal-400/40 shadow-sm">
                <Layers className="w-6 h-6 text-teal-100" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Srivalli <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Glass Traders</span>
                </span>
                <p className="text-xs text-slate-300 font-medium">Hyderabad, Telangana</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Your dependable glass trading and custom-cut glass supply partner in Hyderabad. 
              Supplying residential, commercial, and interior glass solutions with wholesale price benefits.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-950/80 text-teal-300 border border-teal-500/30">
                <span>GSTIN: {gstin}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Telangana Intra-State</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
              <li>
                <Link href="/" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  About Our Business
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  Glass Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  Request a Custom Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  Contact &amp; Shop Location
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-teal-300 hover:text-teal-200 transition-colors flex items-center gap-1.5 font-bold pt-1">
                  <ShieldCheck className="w-4 h-4" /> Internal Staff ERP
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Types */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Glass Products
            </h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Clear Float Glass (3mm - 19mm)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Toughened Structural Glass</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Bronze &amp; Grey Tinted Glass</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Acid Etched Frosted Glass</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Laminated Acoustic Glass</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>High-Definition Mirror Glass</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Custom Reusable Remnants</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Depot */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Depot &amp; Workshop
            </h3>
            <ul className="space-y-3.5 text-sm sm:text-base text-slate-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
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
                <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300 leading-normal">
                  {businessHours}
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-300 gap-4">
          <p>&copy; {new Date().getFullYear()} Srivalli Glass Traders. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Hyderabad Wholesale Glass &bull; Precision Cut-to-Size
          </p>
        </div>
      </div>
    </footer>
  );
}
