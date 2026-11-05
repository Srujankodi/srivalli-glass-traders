import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  Truck, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare,
  Maximize2,
  Clock,
  MapPin,
  Building2,
  Check,
  Award
} from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import HeroQuickCalculator from '@/components/public/HeroQuickCalculator';
import { DataService } from '@/lib/data-service';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const categories = DataService.getCategories();
  const products = DataService.getProducts(true);

  // Glass category visual metadata
  const categoryStyles: Record<string, { gradient: string; badge: string; accent: string }> = {
    'Clear Float Glass': {
      gradient: 'from-cyan-900/40 via-slate-800 to-slate-900',
      badge: 'High Clarity',
      accent: 'text-cyan-400',
    },
    'Toughened Glass': {
      gradient: 'from-teal-900/40 via-slate-800 to-slate-900',
      badge: '4x Impact Strength',
      accent: 'text-teal-400',
    },
    'Tinted Glass': {
      gradient: 'from-amber-950/40 via-slate-800 to-slate-900',
      badge: 'Solar Heat Control',
      accent: 'text-amber-400',
    },
    'Frosted Glass': {
      gradient: 'from-slate-700/40 via-slate-800 to-slate-900',
      badge: 'Translucent Privacy',
      accent: 'text-slate-300',
    },
    'Laminated Glass': {
      gradient: 'from-blue-900/40 via-slate-800 to-slate-900',
      badge: 'Acoustic & Safety',
      accent: 'text-blue-400',
    },
    'Mirror Glass': {
      gradient: 'from-indigo-900/40 via-slate-800 to-slate-900',
      badge: 'Distortion Free Silver',
      accent: 'text-indigo-300',
    },
    'Reflective Glass': {
      gradient: 'from-sky-900/40 via-slate-800 to-slate-900',
      badge: 'Facade Glazing',
      accent: 'text-sky-400',
    },
    'Decorative Glass': {
      gradient: 'from-emerald-900/40 via-slate-800 to-slate-900',
      badge: 'Textured & Fluted',
      accent: 'text-emerald-400',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-teal-500/20">
        {/* Subtle glass grid and ambient glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0D9488_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hyderabad&apos;s Premier Glass Wholesale &amp; Custom Sizing Partner</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                  Srivalli <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-cyan-300">Glass Traders</span>
                </h1>
                <p className="text-xl sm:text-2xl text-teal-100 font-semibold tracking-tight">
                  Quality Architectural Glass Solutions at Direct Wholesale Rates
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Serving Hyderabad, Secunderabad, and Telangana with prime architectural glass. 
                We procure directly from certified float manufacturers and cut precisely to your 
                residential, commercial, interior, and construction project dimensions.
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/quote"
                  className="px-7 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-lg hover:shadow-teal-500/25 transition-all flex items-center gap-2.5 group"
                >
                  <span>Request Custom Cut Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products"
                  className="px-7 py-4 rounded-xl text-base font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-teal-400/50 transition-all"
                >
                  Explore Glass Catalog
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                  <span className="font-medium">Direct Wholesale Rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                  <span className="font-medium">Precision Cut to Size</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                  <span className="font-medium">Hyderabad Delivery</span>
                </div>
              </div>
            </div>

            {/* Hero Right Interactive Quick Calculator */}
            <div className="lg:col-span-5">
              <HeroQuickCalculator />
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pillars Trust Bar */}
      <section className="bg-slate-900 border-b border-teal-500/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Wholesale Sourcing</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">Direct factory rates on prime Saint-Gobain &amp; Asahi glass grades.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Precision Sizing</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">Exact straight guillotine cuts in feet, inches, cm, and mm.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hyderabad Dispatch</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">Careful vertical glass handling and prompt site deliveries.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Zero Waste Salvage</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">Reusable remnant inventory matched first to save customer costs.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 lg:py-28 bg-slate-950 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400">
              Glass Varieties &amp; Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Configurable Glass Categories
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We stock and supply standard jumbo sheets and cut-to-size specifications for architects, interior contractors, fabricators, and homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const style = categoryStyles[cat.name] || {
                gradient: 'from-teal-900/40 via-slate-800 to-slate-900',
                badge: 'Architectural Grade',
                accent: 'text-teal-400',
              };

              return (
                <div
                  key={cat.id}
                  className={`group relative rounded-3xl bg-gradient-to-b ${style.gradient} border border-white/10 hover:border-teal-400/50 p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-110 transition-transform border border-teal-500/30">
                        <Layers className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10">
                        {style.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-300">Custom Cuts</span>
                    <Link
                      href={`/quote?category=${encodeURIComponent(cat.name)}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-teal-300 transition-colors"
                    >
                      <span>Quote</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Commercial Glass Sizes Showcase */}
      <section className="py-20 lg:py-24 bg-slate-900 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400">
                High-Demand Specifications
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Popular Commercial Glass Options
              </h2>
            </div>
            <Link
              href="/products"
              className="text-base text-teal-300 hover:text-teal-200 font-bold flex items-center gap-2 group"
            >
              <span>View Full Glass Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((prod) => (
              <div
                key={prod.id}
                className="rounded-3xl bg-slate-800/80 border border-white/10 p-6 flex flex-col justify-between hover:border-teal-400/50 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-950 text-teal-300 border border-teal-500/30">
                      {prod.thicknessMm}mm Thickness
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      In Stock
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{prod.name}</h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed line-clamp-2">{prod.description}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    Category: <strong className="text-white font-semibold">{prod.glassType}</strong>
                  </div>
                  <Link
                    href={`/quote?product=${encodeURIComponent(prod.name)}&thickness=${prod.thicknessMm}`}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-sm"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Srivalli Glass Traders */}
      <section className="py-20 lg:py-28 bg-slate-950 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400">
              Enterprise Strengths
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Why Partner With Srivalli Glass Traders
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Delivering accurate glass sizes, transparent square-foot rates, and dedicated customer service for Hyderabad builders, designers, and homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-7 rounded-3xl bg-slate-900 border border-white/10 space-y-3 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Competitive Sourcing Rates</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct wholesale sourcing from premier manufacturers allows us to provide fair, transparent per-square-foot pricing for both small retail and bulk construction orders.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900 border border-white/10 space-y-3 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Comprehensive Glass Range</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Clear Float, Toughened, Bronze &amp; Grey Tinted, Acid-Frosted, Mirror, and Laminated safety glass across 3mm to 19mm specifications in standard and jumbo sizes.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900 border border-white/10 space-y-3 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Custom Dimensions Cutting</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Enter your exact measurements in feet, inches, centimeters, or millimeters. We cut glass to your exact required sizes with precision edge safety handling.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900 border border-white/10 space-y-3 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Maximize2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Remnant Matching First</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our smart remnant inventory matches smaller cuts against certified prime offcuts first, reducing material waste and delivering direct cost savings to you.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900 border border-white/10 space-y-3 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Responsive WhatsApp Support</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Send dimensions directly via WhatsApp for quick quotations, thickness consultations, and delivery coordination with our Hyderabad depot team.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900 border border-white/10 space-y-3 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Careful City Transportation</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Specialized vertical glass handling, cushioned rack storage, and coordinated local transportation across Hyderabad and Secunderabad for break-free arrival.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Big Action Banner */}
      <section className="py-20 bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 border-b border-teal-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-teal-900/60 text-teal-300 border border-teal-500/30">
            <Clock className="w-4 h-4 text-emerald-400" /> Fast Response Within Workshop Hours
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Need Glass Cut to an Exact Measurement?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Submit your length, width, thickness, and preferred glass variety. We calculate the exact square footage and generate an itemized competitive estimate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/quote"
              className="px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-xl transition-all flex items-center gap-2"
            >
              <span>Calculate &amp; Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20Srivalli%20Glass%20Traders,%20I%20have%20a%20glass%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
