import React from 'react';
import Link from 'next/link';
import { Layers, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-brand-navyDark text-brand-silver border-t border-brand-teal/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Summary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center border border-brand-teal/40">
                <Layers className="w-5 h-5 text-brand-tealGlow" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Srivalli <span className="text-brand-tealGlow">Glass</span>
              </span>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">
              Your dependable glass trading and custom-cut glass supply partner in Hyderabad. 
              Supplying residential, commercial, and interior glass solutions with wholesale price benefits.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-tealGlow border border-brand-teal/30">
                GSTIN: 36AAAAA0000A1Z5 &bull; Telangana
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-tealGlow transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-tealGlow transition-colors">About Our Business</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-tealGlow transition-colors">Glass Product Catalog</Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-brand-tealGlow transition-colors">Request a Custom Quote</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-tealGlow transition-colors">Contact & Shop Location</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-brand-tealGlow transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Staff ERP Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Sourced */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Glass Products</h3>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>Clear Float Glass (3mm - 19mm)</li>
              <li>Toughened Structural Glass</li>
              <li>Bronze & Grey Tinted Glass</li>
              <li>Acid Etched Frosted Glass</li>
              <li>Laminated Acoustic Glass</li>
              <li>High-Definition Mirror Glass</li>
              <li>Custom Architectural Offcuts</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-tealGlow shrink-0 mt-1" />
                <span className="text-brand-muted leading-snug">
                  Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana 500001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-tealGlow shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-tealGlow shrink-0" />
                <a href="mailto:contact@srivalliglasstraders.com" className="hover:text-white transition-colors">
                  contact@srivalliglasstraders.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-tealGlow shrink-0 mt-1" />
                <span className="text-brand-muted text-xs leading-normal">
                  Mon - Sat: 9:00 AM - 8:30 PM<br />Sunday: 10:00 AM - 3:00 PM
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <p>&copy; {new Date().getFullYear()} Srivalli Glass Traders. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for professional glass trading operations in Hyderabad, Telangana.
          </p>
        </div>
      </div>
    </footer>
  );
}

