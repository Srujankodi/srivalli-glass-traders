'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Phone, MessageSquare, Menu, X, ShieldCheck, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [whatsapp, setWhatsapp] = useState('+919876543210');
  const [address, setAddress] = useState('Hyderabad, Telangana');
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          if (data.settings.phone) setPhone(data.settings.phone);
          if (data.settings.whatsapp) setWhatsapp(data.settings.whatsapp);
          if (data.settings.address) setAddress(data.settings.address);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Request Quote', href: '/quote' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const cleanWaNumber = whatsapp.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs sm:text-sm py-2 px-4 sm:px-6 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-teal-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Wholesale Glass Trading &amp; Custom Sizing Depot
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Hyderabad, Telangana</span>
            </span>
            <span className="hidden xl:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Mon - Sat: 9:00 AM - 8:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-teal-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={`https://wa.me/${cleanWaNumber}?text=Hello%20Srivalli%20Glass%20Traders,%20I%20am%20looking%20for%20a%20glass%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-slate-900/95 backdrop-blur-xl border-b border-teal-500/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-slate-900 flex items-center justify-center border border-teal-400/40 shadow-glass group-hover:scale-105 transition-all">
                <Layers className="w-6 h-6 text-teal-100" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Srivalli <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Glass Traders</span>
                </span>
                <p className="text-xs sm:text-[13px] text-slate-300 font-medium">
                  Hyderabad Wholesale &amp; Precision Cutting
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'text-teal-300 bg-teal-950/60 border border-teal-500/40 shadow-sm'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Call-to-Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3.5">
              <a
                href={`https://wa.me/${cleanWaNumber}?text=Hello%20Srivalli%20Glass%20Traders,%20I%20am%20looking%20for%20a%20glass%20quote`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/quote"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-md hover:shadow-teal-500/25 transition-all"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                title="Management ERP Portal"
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>ERP</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-2">
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-emerald-600 text-white"
                title="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>

              <Link
                href="/login"
                className="px-2.5 py-1.5 text-xs font-bold text-teal-300 bg-white/5 rounded-lg border border-teal-500/30"
              >
                ERP
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-teal-500/30 px-5 pt-4 pb-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold ${
                  pathname === link.href 
                    ? 'text-teal-300 bg-teal-950/70 border border-teal-500/40' 
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold bg-white/10 text-white"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Call Us: {phone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanWaNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold bg-emerald-600 text-white shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-teal-600 to-teal-500 text-white"
            >
              <span>Request Custom Cut Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
