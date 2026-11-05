import React from 'react';
import Link from 'next/link';
import { Layers, CheckCircle2, ShieldCheck, MapPin, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-navyDark via-brand-navy to-slate-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow">
            About Our Enterprise
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Srivalli Glass Traders
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Dedicated glass trading and custom sizing operations located in Hyderabad, Telangana.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-900 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: What We Do */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-tealGlow" />
              <span>What We Do</span>
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Srivalli Glass Traders is an established commercial glass trading enterprise operating in Hyderabad. 
              We procure prime architectural glass sheets in jumbo and standard dimensions from leading glass manufacturers 
              and wholesale suppliers, supplying them in custom cuts and full sheets to contractors, builders, interior designers, 
              dealers, and retail homeowners.
            </p>
          </div>

          {/* Section 2: Sourcing & Pricing Focus */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white">Wholesale Sourcing &amp; Competitive Rates</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              By working closely with authorized float glass distributors and regional tempering facilities across South India, 
              we ensure our customers receive certified glass grades at competitive per-square-foot rates. Our pricing model 
              transparently accounts for sheet square footage, cutting charges, and safe local transportation without hidden costs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-tealGlow shrink-0" />
                <span>Clear Float Glass (3mm to 19mm)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-tealGlow shrink-0" />
                <span>Certified Tempered Toughened Glass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-tealGlow shrink-0" />
                <span>Body Tinted Bronze &amp; Grey Glass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-tealGlow shrink-0" />
                <span>Acid-Etched &amp; Sandblasted Frosted Glass</span>
              </div>
            </div>
          </div>

          {/* Section 3: Customer Segments Served */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Serving Varied Customer Requirements</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We cater to diverse glass requirements across Hyderabad and Secunderabad:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5 space-y-2">
                <h4 className="text-sm font-bold text-white">Contractors &amp; Builders</h4>
                <p className="text-xs text-slate-400">
                  Bulk supplies for residential balcony glass railings, aluminium window glazings, and commercial facade panels.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5 space-y-2">
                <h4 className="text-sm font-bold text-white">Interior Designers &amp; Architects</h4>
                <p className="text-xs text-slate-400">
                  Precision-cut shower cubicle partitions, wardrobe mirrors, dining table tops, and decorative fluted glass elements.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5 space-y-2">
                <h4 className="text-sm font-bold text-white">Glass Dealers &amp; Workshops</h4>
                <p className="text-xs text-slate-400">
                  Full jumbo sheets and economical reusable offcuts for local fabrication shops.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5 space-y-2">
                <h4 className="text-sm font-bold text-white">Retail &amp; Homeowners</h4>
                <p className="text-xs text-slate-400">
                  Individual custom pieces for window glass replacements, shelves, and dresser mirrors with polished safe edges.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Custom Size Cutting & Remnant Salvage */}
          <div className="p-6 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-tealGlow" />
              <span>Smart Material Utilization &amp; Custom Sizing</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In glass trading, minimizing waste is critical. When large sheets are cut, usable leftover offcuts are carefully 
              cataloged in our remnant stock. This allows us to supply smaller custom sizes quickly at economical rates while saving 
              customers the cost of cutting an entire full sheet.
            </p>
          </div>

          {/* Section 5: Workshop Contact & CTA */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Have a specific dimension or project in mind?</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-tealGlow" />
                <span>Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/quote"
                className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors"
              >
                Request Quote
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

