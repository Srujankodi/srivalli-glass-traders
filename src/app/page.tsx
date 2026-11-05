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
  Maximize2
} from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { DataService } from '@/lib/data-service';

export default function HomePage() {
  const categories = DataService.getCategories();
  const products = DataService.getProducts(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-navyDark via-brand-navy to-slate-900 py-20 lg:py-28 border-b border-white/10">
        {/* Subtle glass grid and glow background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-40 right-10 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-60 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/15 border border-brand-teal/40 text-brand-tealGlow text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hyderabad&apos;s Trusted Glass Wholesale & Custom Cutting Partner</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Sri Valli <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tealGlow to-teal-300">Glass Traders</span>
              </h1>

              <p className="text-xl text-teal-100/90 font-medium">
                Quality Glass Solutions at Competitive Prices
              </p>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Your trusted glass trading partner in Hyderabad, supplying quality glass products 
                for residential, commercial, construction, and interior design requirements.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/quote"
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-glassHover transition-all flex items-center gap-2"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/products"
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
                >
                  Explore Products
                </Link>
              </div>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-tealGlow shrink-0" />
                  <span>Wholesale Rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-tealGlow shrink-0" />
                  <span>Custom Cut Sizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-tealGlow shrink-0" />
                  <span>Hyderabad Delivery</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6">
                
                {/* Visual Glass Sheet Representation */}
                <div className="relative h-64 w-full rounded-xl overflow-hidden border border-brand-teal/30 bg-gradient-to-tr from-slate-900 via-brand-navy to-teal-950/80 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded bg-brand-teal/20 text-brand-tealGlow text-xs font-mono font-semibold">
                      ARCHITECTURAL GLASS
                    </span>
                    <span className="text-xs text-slate-400 font-mono">10ft &times; 8ft Jumbo</span>
                  </div>

                  {/* Cut Lines Illustration */}
                  <div className="relative border-2 border-dashed border-teal-400/40 rounded-lg p-4 bg-teal-500/5">
                    <div className="flex items-center justify-between text-xs text-teal-200">
                      <span>Custom Dimensions Cutting</span>
                      <Ruler className="w-4 h-4 text-brand-tealGlow" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Precise millimeter straight cuts & reusable remnant salvage</p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-white/10">
                    <span>Float &bull; Toughened &bull; Tinted</span>
                    <span className="text-brand-tealGlow font-medium">3mm - 19mm</span>
                  </div>
                </div>

                {/* Instant Quote Shortcut Card */}
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Need an urgent size cut?</h4>
                    <p className="text-[11px] text-slate-300">Call our workshop direct in Hyderabad</p>
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="p-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors"
                    title="Call Now"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-slate-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow">
              Our Products & Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Configurable Glass Categories
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We source directly from wholesale manufacturers and supply certified float, toughened, 
              and specialized architectural glass tailored to your exact measurements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group relative rounded-2xl bg-slate-800/60 hover:bg-slate-800/90 border border-white/10 hover:border-brand-teal/50 p-6 transition-all duration-300 hover:shadow-glassHover flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/15 text-brand-tealGlow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-tealGlow transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-teal-400">Custom Cuts Available</span>
                  <Link
                    href={`/quote?category=${encodeURIComponent(cat.name)}`}
                    className="text-xs text-brand-silver hover:text-white flex items-center gap-1 font-semibold"
                  >
                    Quote <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-20 bg-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow">
                Popular Glass Types & Thicknesses
              </span>
              <h2 className="text-3xl font-bold text-white mt-1">
                Standard Commercial Sizing
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm text-brand-tealGlow hover:text-teal-300 font-semibold flex items-center gap-1.5"
            >
              View Full Product Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((prod) => (
              <div
                key={prod.id}
                className="rounded-xl bg-slate-900 border border-white/10 p-5 flex flex-col justify-between hover:border-teal-500/40 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-slate-300">
                      {prod.thicknessMm}mm Thickness
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">In Stock</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{prod.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Glass Type: <strong className="text-white">{prod.glassType}</strong></span>
                  <Link
                    href={`/quote?product=${encodeURIComponent(prod.name)}&thickness=${prod.thicknessMm}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow">
              Business Strengths
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Choose Sri Valli Glass Traders
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Delivering accurate glass sizes, transparent square-foot rates, and responsive customer service for Hyderabad builders, designers, and home owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-brand-tealGlow flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Competitive Pricing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct wholesale sourcing from reputed manufacturers enables us to offer fair, competitive per-square-foot pricing for both small retail and bulk construction orders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-brand-tealGlow flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Multiple Glass Options</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive selection of Clear Float, Toughened, Bronze/Grey Tinted, Acid-Frosted, Mirror, and Laminated glass across 3mm to 19mm specifications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-brand-tealGlow flex items-center justify-center">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Custom Size Requirements</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your exact dimensions in feet, inches, centimeters, or millimeters. We cut glass to your custom specifications with precision edge handling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-brand-tealGlow flex items-center justify-center">
                <Maximize2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Wholesale Sourcing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strong supplier relationships with major float glass manufacturers and regional tempering plants for swift fulfillment of on-demand orders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-brand-tealGlow flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Customer Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Immediate assistance on WhatsApp, phone consultation for appropriate glass thickness selection, and transparent quotation breakdowns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-brand-tealGlow flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Reliable Service</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Careful handling, secure packaging, and coordinated local transportation across Hyderabad and Secunderabad for break-free arrival.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-teal-900/40 via-brand-navy to-slate-900 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Looking for Glass in a Specific Size?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Submit your length, width, thickness, and preferred glass type. Our team calculates the exact square footage and provides an immediate competitive quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/quote"
              className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-glassHover transition-all flex items-center gap-2"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20Sri%20Valli%20Glass,%20I%20have%20a%20custom%20glass%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center gap-2"
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
