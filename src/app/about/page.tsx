import React from 'react';
import Link from 'next/link';
import { Layers, CheckCircle2, ShieldCheck, MapPin, ArrowRight, Phone, MessageSquare, Building2, Truck, Award } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#8B1E2D] selection:text-white">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="font-serif italic tracking-[0.25em] text-slate-500 text-sm uppercase font-semibold">
            A B O U T &nbsp; O U R &nbsp; E N T E R P R I S E
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Srivalli Glass Traders
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Commercial glass trading, custom-dimension straight cutting, and architectural glass supply based in Hyderabad, Telangana.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: What We Do */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#8B1E2D] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">What We Do</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Srivalli Glass Traders is an established commercial glass trading enterprise operating in Hyderabad. 
              We procure prime architectural glass sheets in jumbo and standard dimensions from leading glass manufacturers 
              and wholesale suppliers, supplying them in custom cuts and full sheets to contractors, builders, interior designers, 
              dealers, and retail homeowners.
            </p>
          </div>

          {/* Section 2: Sourcing & Pricing Focus */}
          <div className="p-7 sm:p-9 rounded-3xl bg-slate-50 border border-slate-200 space-y-5 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-[#8B1E2D]" />
              <span>Wholesale Sourcing &amp; Competitive Rates</span>
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              By working closely with authorized float glass distributors and regional tempering facilities across South India, 
              we ensure our customers receive certified glass grades at competitive per-square-foot rates. Our pricing model 
              transparently accounts for sheet square footage, cutting charges, and safe local transportation without hidden costs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                <span className="font-semibold">Clear Float Glass (3mm to 19mm)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                <span className="font-semibold">Certified Tempered Toughened Glass</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                <span className="font-semibold">Body Tinted Bronze &amp; Grey Glass</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                <span className="font-semibold">Acid-Etched &amp; Sandblasted Frosted Glass</span>
              </div>
            </div>
          </div>

          {/* Section 3: Customer Segments Served */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Serving Varied Customer Requirements</h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We cater to diverse glass requirements across Hyderabad and Secunderabad:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
                <h4 className="text-base font-bold text-slate-900">Contractors &amp; Builders</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bulk supplies for residential balcony glass railings, aluminium window glazings, and commercial facade panels.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
                <h4 className="text-base font-bold text-slate-900">Interior Designers &amp; Architects</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Precision-cut shower cubicle partitions, wardrobe mirrors, dining table tops, and decorative fluted glass elements.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
                <h4 className="text-base font-bold text-slate-900">Glass Dealers &amp; Workshops</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Full jumbo sheets and economical reusable offcuts for local fabrication shops.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
                <h4 className="text-base font-bold text-slate-900">Retail &amp; Homeowners</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Individual custom pieces for window glass replacements, shelves, and dresser mirrors with polished safe edges.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Custom Size Cutting & Remnant Salvage */}
          <div className="p-7 sm:p-9 rounded-3xl bg-red-50/70 border border-red-200 space-y-3.5">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-[#8B1E2D]" />
              <span>Smart Material Utilization &amp; Remnant Salvage</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              In glass trading, minimizing waste is critical. When large sheets are cut, usable leftover offcuts are carefully 
              cataloged in our remnant stock. This allows us to supply smaller custom sizes quickly at economical rates while saving 
              customers the cost of cutting an entire full sheet.
            </p>
          </div>

          {/* Section 5: Workshop Contact & CTA */}
          <div className="p-7 sm:p-9 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center sm:text-left">
              <h4 className="text-xl font-bold">Have a specific dimension or project in mind?</h4>
              <p className="text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#C2364B] shrink-0" />
                <span>Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana</span>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/quote"
                className="px-6 py-3 rounded-xl text-sm font-bold bg-[#8B1E2D] hover:bg-[#68121E] text-white transition-all shadow-md"
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
