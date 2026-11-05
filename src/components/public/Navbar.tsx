'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Phone, MessageSquare, Menu, X, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [whatsapp, setWhatsapp] = useState('+919876543210');
  const [gstin, setGstin] = useState('36DRUPS5127N2ZQ');
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          if (data.settings.phone) setPhone(data.settings.phone);
          if (data.settings.whatsapp) setWhatsapp(data.settings.whatsapp);
          if (data.settings.gstin) setGstin(data.settings.gstin.toUpperCase());
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'REQUEST QUOTE', href: '/quote' },
    { label: 'CONTACT US', href: '/contact' },
    { label: 'LOGIN', href: '/login' },
  ];

  const cleanWaNumber = whatsapp.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Row */}
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo on Left */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Crimson Geometric Emblem */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-[#8B1E2D] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-white" />
              </div>
            </div>

            <span className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap">
              SRIVALLI GLASS TRADERS
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wider font-extrabold transition-colors py-2 ${
                    isActive
                      ? 'text-[#8B1E2D] border-b-2 border-[#8B1E2D]'
                      : 'text-slate-800 hover:text-[#8B1E2D]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${cleanWaNumber}?text=Hello%20Srivalli%20Glass%20Traders,%20I%20am%20looking%20for%20a%20glass%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-2.5 py-1.5 text-xs font-bold text-[#8B1E2D] bg-red-50 rounded-lg border border-red-200"
            >
              LOGIN
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Secondary Sub-link Bar (just like MORE | ADMISSIONS | CBSE in screenshot) */}
        <div className="hidden lg:flex items-center justify-end gap-5 py-1.5 border-t border-slate-100 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          <span className="font-mono font-extrabold text-[#8B1E2D]">
            GSTIN: {gstin ? gstin.toUpperCase() : '36DRUPS5127N2ZQ'}
          </span>
          <span className="text-slate-300">&bull;</span>
          <Link href="/products" className="text-[#8B1E2D] hover:underline font-extrabold">
            WHOLESALE SOURCING
          </Link>
          <span className="text-slate-300">&bull;</span>
          <Link href="/quote" className="hover:text-slate-900 transition-colors">
            CUSTOM CUTTING
          </Link>
          <span className="text-slate-300">&bull;</span>
          <Link href="/contact" className="hover:text-slate-900 transition-colors">
            HYDERABAD WORKSHOP
          </Link>
          <span className="text-slate-300">&bull;</span>
          <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-slate-900 text-slate-700">
            CALL: {phone}
          </a>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-bold tracking-wider ${
                  pathname === link.href ? 'text-[#8B1E2D] bg-red-50' : 'text-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <div className="px-3 py-1.5 rounded-lg text-xs font-mono font-black text-[#8B1E2D] bg-red-50 border border-red-200 text-center tracking-wider">
              GSTIN: {gstin ? gstin.toUpperCase() : '36DRUPS5127N2ZQ'}
            </div>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold bg-slate-100 text-slate-900"
            >
              <Phone className="w-4 h-4 text-[#8B1E2D]" />
              <span>Call {phone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanWaNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold bg-[#8B1E2D] text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
