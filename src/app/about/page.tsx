import React from 'react';
import Link from 'next/link';
import { Layers, CheckCircle2, ShieldCheck, MapPin, ArrowRight, Phone, MessageSquare, Building2, Truck, Award } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-600 selection:text-white">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-24 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-teal-950/80 text-teal-300 border border-teal-500/30">
            About Our Enterprise
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Srivalli Glass Traders
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Commercial glass trading, custom-dimension straight cutting, and architectural glass supply based in Hyderabad, Telangana.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-slate-950 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: What We Do */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">What We Do</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              Srivalli Glass Traders is an established commercial glass trading enterprise operating in Hyderabad. 
              We procure prime architectural glass sheets in jumbo and standard dimensions from leading glass manufacturers 
              and wholesale suppliers, supplying them in custom cuts and full sheets to contractors, builders, interior designers, 
              dealers, and retail homeowners.
            </p>
          </div>

          {/* Section 2: Sourcing & Pricing Focus */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-900 border border-teal-500/20 space-y-5 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-teal-400" />
              <span>Wholesale Sourcing &amp; Competitive Rates</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              By working closely with authorized float glass distributors and regional tempering facilities across South India, 
              we ensure our customers receive certified glass grades at competitive per-square-foot rates. Our pricing model 
              transparently accounts for sheet square footage, cutting charges, and safe local transportation without hidden costs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clear Float Glass (3mm to 19mm)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified Tempered Toughened Glass</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Body Tinted Bronze &amp; Grey Glass</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acid-Etched &amp; Sandblasted Frosted Glass</span>
              </div>
            </div>
          </div>

          {/* Section 3: Customer Segments Served */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Serving Varied Customer Requirements</h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We cater to diverse glass requirements across Hyderabad and Secunderabad:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-2.5">
                <h4 className="text-base font-bold text-white">Contractors &amp; Builders</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Bulk supplies for residential balcony glass railings, aluminium window glazings, and commercial facade panels.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-2.5">
                <h4 className="text-base font-bold text-white">Interior Designers &amp; Architects</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Precision-cut shower cubicle partitions, wardrobe mirrors, dining table tops, and decorative fluted glass elements.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-2.5">
                <h4 className="text-base font-bold text-white">Glass Dealers &amp; Workshops</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Full jumbo sheets and economical reusable offcuts for local fabrication shops.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-2.5">
                <h4 className="text-base font-bold text-white">Retail &amp; Homeowners</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Individual custom pieces for window glass replacements, shelves, and dresser mirrors with polished safe edges.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Custom Size Cutting & Remnant Salvage */}
          <div className="p-7 sm:p-8 rounded-3xl bg-teal-950/40 border border-teal-500/30 space-y-3.5 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>Smart Material Utilization &amp; Custom Sizing</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In glass trading, minimizing waste is critical. When large sheets are cut, usable leftover offcuts are carefully 
              cataloged in our remnant stock. This allows us to supply smaller custom sizes quickly at economical rates while saving 
              customers the cost of cutting an entire full sheet.
            </p>
          </div>

          {/* Section 5: Workshop Contact & CTA */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5 text-center sm:text-left">
              <h4 className="text-lg font-bold text-white">Have a specific dimension or project in mind?</h4>
              <p className="text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana</span>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/quote"
                className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-500 hover:to-teal-400 transition-all shadow-md"
              >
                Request Quote
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
