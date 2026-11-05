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
  Building2,
  ArrowUp,
  Award,
  ChevronRight
} from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import HeroQuickCalculator from '@/components/public/HeroQuickCalculator';
import { DataService } from '@/lib/data-service';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const categories = DataService.getCategories();
  const products = DataService.getProducts(true);

  // Visual cards ribbon data matching the screenshot's rounded image-pill layout
  const visualPills = [
    {
      title: 'Clear Float Solutions',
      subtitle: 'Architectural Windows & Glazing',
      tag: '3mm – 19mm',
      bgGradient: 'from-slate-900/90 via-slate-800/80 to-transparent',
      borderColor: 'border-slate-200',
      bgColor: 'bg-gradient-to-tr from-slate-900 to-slate-700',
    },
    {
      title: 'Toughened Safety Glass',
      subtitle: 'Partitions & Balcony Railings',
      tag: '4x Impact Tough',
      bgGradient: 'from-[#68121E]/95 via-[#8B1E2D]/80 to-transparent',
      borderColor: 'border-red-200',
      bgColor: 'bg-gradient-to-tr from-[#68121E] to-[#8B1E2D]',
    },
    {
      title: 'Bronze & Tinted Glass',
      subtitle: 'Solar Heat Reduction Panes',
      tag: 'Warm Body Tint',
      bgGradient: 'from-amber-950/90 via-amber-900/80 to-transparent',
      borderColor: 'border-amber-200',
      bgColor: 'bg-gradient-to-tr from-amber-950 to-stone-800',
    },
    {
      title: 'Acid Frosted Privacy',
      subtitle: 'Partitions & Shower Cubicles',
      tag: 'Smooth Translucent',
      bgGradient: 'from-slate-900/90 via-slate-700/80 to-transparent',
      borderColor: 'border-slate-300',
      bgColor: 'bg-gradient-to-tr from-slate-800 to-slate-600',
    },
    {
      title: 'Ultra-Clear Mirrors',
      subtitle: 'Distortion-Free Silver Coated',
      tag: 'Copper-Free Backing',
      bgGradient: 'from-blue-950/90 via-slate-900/80 to-transparent',
      borderColor: 'border-blue-200',
      bgColor: 'bg-gradient-to-tr from-blue-950 to-slate-800',
    },
    {
      title: 'Reusable Remnants',
      subtitle: 'Economical Zero-Waste Offcuts',
      tag: 'Instant Savings',
      bgGradient: 'from-emerald-950/90 via-emerald-900/80 to-transparent',
      borderColor: 'border-emerald-200',
      bgColor: 'bg-gradient-to-tr from-emerald-950 to-slate-800',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#8B1E2D] selection:text-white">
      <PublicNavbar />

      {/* Hero Visual Pill Carousel / Cards Ribbon (Exactly as in screenshot) */}
      <section className="bg-slate-50/70 border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
            {visualPills.map((pill, idx) => (
              <div
                key={idx}
                className={`relative flex-shrink-0 w-64 sm:w-72 h-44 sm:h-48 rounded-3xl overflow-hidden shadow-sm hover:shadow-hover border ${pill.borderColor} transition-all duration-300 group snap-center cursor-pointer ${pill.bgColor}`}
              >
                {/* Visual Glass Pattern in pill */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                
                {/* Top Badge */}
                <div className="absolute top-3.5 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-[#8B1E2D] shadow-xs">
                    {pill.tag}
                  </span>
                </div>

                {/* Dark Gradient Overlay at Bottom */}
                <div className={`absolute inset-0 bg-gradient-to-t ${pill.bgGradient} flex flex-col justify-end p-5 text-white z-10`}>
                  <h4 className="text-base sm:text-lg font-extrabold leading-snug group-hover:text-amber-200 transition-colors">
                    {pill.title}
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-1 font-medium">
                    {pill.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Big Stats Strip (Identical to screenshot layout: 20 | 7 | 10,000+ | 950+ | 7,000+) */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#8B1E2D] tracking-tight">
                3mm – 19mm
              </div>
              <div className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-800 uppercase mt-2">
                THICKNESS RANGE
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#8B1E2D] tracking-tight">
                10ft × 8ft
              </div>
              <div className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-800 uppercase mt-2">
                JUMBO SHEET SIZES
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#8B1E2D] tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-800 uppercase mt-2">
                SIZING ACCURACY
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#8B1E2D] tracking-tight">
                ₹ DIRECT
              </div>
              <div className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-800 uppercase mt-2">
                WHOLESALE RATES
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6 col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#8B1E2D] tracking-tight">
                HYDERABAD
              </div>
              <div className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-800 uppercase mt-2">
                TELANGANA DISPATCH
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Feature Section (Matching screenshot typography & spacing) */}
      <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-4xl">
            {/* Eyebrow Header: W H Y   S R I V A L L I ? (Exact match to W H Y   G E N E S I S ?) */}
            <p className="font-serif italic tracking-[0.25em] text-slate-500 text-sm sm:text-base uppercase font-semibold">
              W H Y &nbsp; S R I V A L L I ?
            </p>

            {/* Major Heading (Exact match: Education that balances excellence, wellbeing, and ambition.) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Glass trading that balances certified quality, precision sizing, and wholesale pricing.
            </h1>

            {/* Subheading (Genesis Means "The Beginning.") */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
              Srivalli Means &quot;Trust, Certified Sourcing &amp; Zero Wastage.&quot;
            </h3>

            {/* Description (Every remarkable journey starts with a beginning.) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              Every architectural and residential project begins with reliable building materials. 
              As Hyderabad&apos;s trusted glass trading depot, we procure directly from certified float glass 
              manufacturers, offer exact millimeter guillotine sizing, and match reusable remnants to save our customers direct expenses.
            </p>
          </div>

          {/* Side-by-Side: Sizing Calculator & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6">
            
            {/* Left 7 cols: Interactive Size Calculator */}
            <div className="lg:col-span-7">
              <HeroQuickCalculator />
            </div>

            {/* Right 5 cols: Value Propositions */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E2D] block">
                  Direct Manufacturer Advantage
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Fair Wholesale Rates in Square Feet
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Transparent per-square-foot pricing for clear float, toughened, tinted, frosted, and mirror glass. No hidden charges or opaque markups.
                </p>
                
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Telangana GST Invoicing</span>
                  <Link
                    href="/products"
                    className="text-xs font-extrabold text-[#8B1E2D] hover:underline flex items-center gap-1"
                  >
                    View Catalog <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E2D] block">
                  Precision Workshop Handling
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Custom Guillotine &amp; CNC Cut Sizes
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enter dimensions in feet, inches, centimeters, or millimeters. We deliver smooth edge-polished straight cuts and safe vertical glass transport across Hyderabad.
                </p>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Remnant Salvage First</span>
                  <Link
                    href="/quote"
                    className="text-xs font-extrabold text-[#8B1E2D] hover:underline flex items-center gap-1"
                  >
                    Request Estimate <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-6 rounded-3xl bg-red-50 border border-red-200 flex items-center justify-between">
                <div>
                  <h5 className="text-base font-bold text-slate-900">Need urgent custom cuts?</h5>
                  <p className="text-xs text-slate-600 mt-0.5">Send your dimension list directly on WhatsApp</p>
                </div>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Srivalli%20Glass%20Traders,%20I%20have%20custom%20glass%20measurements%20for%20a%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full text-xs font-bold bg-[#8B1E2D] hover:bg-[#68121E] text-white shadow-sm flex items-center gap-1.5 transition-all shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Configurable Glass Categories Section */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="font-serif italic tracking-[0.25em] text-slate-500 text-sm uppercase font-semibold">
              O U R &nbsp; C O L L E C T I O N
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Architectural &amp; Commercial Glass Categories
            </h2>
            <p className="text-slate-600 text-base">
              Configurable glass grades sourced directly from leading manufacturers and supplied in custom dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-3xl bg-white border border-slate-200 p-7 flex flex-col justify-between hover:shadow-hover hover:border-[#8B1E2D]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#8B1E2D] flex items-center justify-center font-bold mb-5 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#8B1E2D] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Custom Cuts</span>
                  <Link
                    href={`/quote?category=${encodeURIComponent(cat.name)}`}
                    className="inline-flex items-center gap-1 text-sm font-extrabold text-[#8B1E2D] hover:underline"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Glass Products Grid */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-100 pb-6">
            <div>
              <p className="font-serif italic tracking-[0.25em] text-slate-500 text-sm uppercase font-semibold">
                S P E C I F I C A T I O N S
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                Popular Glass Types &amp; Thicknesses
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-extrabold text-[#8B1E2D] hover:underline flex items-center gap-1.5"
            >
              <span>View Full Glass Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.slice(0, 6).map((prod) => (
              <div
                key={prod.id}
                className="rounded-3xl bg-slate-50 border border-slate-200/90 p-7 flex flex-col justify-between hover:shadow-card hover:bg-white hover:border-[#8B1E2D]/30 transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-red-50 text-[#8B1E2D] border border-red-200">
                      {prod.thicknessMm}mm Thickness
                    </span>
                    <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-700" />
                      In Stock
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{prod.name}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{prod.description}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-700">
                    Category: <strong className="text-slate-900">{prod.glassType}</strong>
                  </div>
                  <Link
                    href={`/quote?product=${encodeURIComponent(prod.name)}&thickness=${prod.thicknessMm}`}
                    className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white transition-all shadow-xs"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Floating Action Button (Exact match to the bottom-right red circle button in screenshot) */}
      <a
        href="#top"
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#8B1E2D] hover:bg-[#68121E] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </a>

      <PublicFooter />
    </div>
  );
}
