'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Phone, MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Request Quote', href: '/quote' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-navyDark/90 backdrop-blur-md border-b border-brand-teal/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center border border-brand-teal/40 shadow-glass group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-brand-tealGlow" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Sri Valli <span className="text-brand-tealGlow">Glass</span> Traders
              </span>
              <p className="text-xs text-brand-silver/70">Hyderabad &bull; Quality &bull; Wholesale & Custom</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-tealGlow bg-white/5 font-semibold'
                      : 'text-brand-silver hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15"
            >
              <Phone className="w-3.5 h-3.5 text-brand-tealGlow" />
              <span>+91 98765 43210</span>
            </a>

            <a
              href="https://wa.me/919876543210?text=Hello%20Sri%20Valli%20Glass%20Traders,%20I%20am%20looking%20for%20a%20glass%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            <Link
              href="/login"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium text-brand-silver hover:text-white hover:bg-white/5 transition-colors"
              title="Internal ERP Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-tealGlow" />
              <span>Admin ERP</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/login"
              className="p-2 text-xs font-medium text-brand-tealGlow bg-white/5 rounded-lg border border-white/10"
            >
              ERP
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-silver hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navyDark/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-base font-medium ${
                  pathname === link.href ? 'text-brand-tealGlow bg-white/10' : 'text-brand-silver'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold bg-white/10 text-white"
            >
              <Phone className="w-4 h-4 text-brand-tealGlow" />
              <span>Call +91 98765 43210</span>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
