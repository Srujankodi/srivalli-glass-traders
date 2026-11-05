'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Phone, MessageSquare, Menu, X, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [whatsapp, setWhatsapp] = useState('+919876543210');
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          if (data.settings.phone) setPhone(data.settings.phone);
          if (data.settings.whatsapp) setWhatsapp(data.settings.whatsapp);
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
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Crimson Geometric Emblem */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-[#8B1E2D] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white" />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
                Srivalli
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#8B1E2D] uppercase mt-1">
                Glass Traders &bull; Hyderabad
              </span>
            </div>
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

          {/* Right Badge / CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Anniversary / Quality Seal Badge like the 20 badge in screenshot */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-sm shadow-sm ring-2 ring-amber-200">
                100%
              </div>
              <div className="text-[11px] font-bold text-slate-700 leading-tight">
                CERTIFIED<br />WHOLESALE
              </div>
            </div>

            <a
              href={`https://wa.me/${cleanWaNumber}?text=Hello%20Srivalli%20Glass%20Traders,%20I%20am%20looking%20for%20a%20glass%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full text-xs font-bold bg-[#8B1E2D] hover:bg-[#68121E] text-white shadow-sm hover:shadow transition-all flex items-center gap-1.5"
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
        <div className="hidden lg:flex items-center justify-end gap-6 py-1.5 border-t border-slate-100 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
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
