'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Layers, Filter, Search, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';

// Catalog data from database service
const PRODUCTS = [
  {
    id: 'prd-01',
    sku: 'CFG-05MM',
    name: '5mm Clear Float Glass',
    category: 'Clear Float Glass',
    thicknessMm: 5,
    glassType: 'Clear Float Glass',
    dimensions: 'Custom Sizes up to 10ft × 8ft',
    description: 'High-clarity float glass for residential window panes, picture frames, and showcase cabinets.',
    availability: 'In Stock',
  },
  {
    id: 'prd-02',
    sku: 'CFG-08MM',
    name: '8mm Clear Float Glass',
    category: 'Clear Float Glass',
    thicknessMm: 8,
    glassType: 'Clear Float Glass',
    dimensions: 'Custom Sizes up to 10ft × 8ft',
    description: 'Durable clear architectural glass suitable for table tops, showcase shelves, and interior glazing.',
    availability: 'In Stock',
  },
  {
    id: 'prd-03',
    sku: 'CFG-12MM',
    name: '12mm Clear Float Glass',
    category: 'Clear Float Glass',
    thicknessMm: 12,
    glassType: 'Clear Float Glass',
    dimensions: 'Custom Sizes up to 12ft × 8ft',
    description: 'Heavy duty clear float glass for frameless glazing, retail counters, and heavy partition panels.',
    availability: 'In Stock',
  },
  {
    id: 'prd-04',
    sku: 'TGH-08MM',
    name: '8mm Clear Toughened Glass',
    category: 'Toughened Glass',
    thicknessMm: 8,
    glassType: 'Toughened Glass',
    dimensions: 'Tempered to Exact Custom Drawing',
    description: 'Heat-strengthened safety glass 4x stronger than standard float glass. For shower partitions & windows.',
    availability: 'In Stock',
  },
  {
    id: 'prd-05',
    sku: 'TGH-10MM',
    name: '10mm Clear Toughened Glass',
    category: 'Toughened Glass',
    thicknessMm: 10,
    glassType: 'Toughened Glass',
    dimensions: 'Custom Architectural Sizes',
    description: 'Premium structural tempered glass designed for commercial shopfronts, office partitions, and railings.',
    availability: 'In Stock',
  },
  {
    id: 'prd-06',
    sku: 'TGH-12MM',
    name: '12mm Clear Toughened Glass',
    category: 'Toughened Glass',
    thicknessMm: 12,
    glassType: 'Toughened Glass',
    dimensions: 'Custom Cut with Holes/Cutouts',
    description: 'High-strength structural glass for frameless glass doors, balcony parapets, and spiral staircases.',
    availability: 'In Stock',
  },
  {
    id: 'prd-07',
    sku: 'TNT-05MM-BRZ',
    name: '5mm Bronze Tinted Glass',
    category: 'Tinted Glass',
    thicknessMm: 5,
    glassType: 'Tinted Glass',
    dimensions: 'Custom Sizes up to 10ft × 7ft',
    description: 'Solar heat reducing warm bronze body-tinted glass for architectural windows and wardrobe shutters.',
    availability: 'In Stock',
  },
  {
    id: 'prd-08',
    sku: 'FRS-05MM',
    name: '5mm Acid Frosted Glass',
    category: 'Frosted Glass',
    thicknessMm: 5,
    glassType: 'Frosted Glass',
    dimensions: 'Custom Sizes Available',
    description: 'Evenly diffused translucent privacy glass with smooth fingerprint-resistant surface.',
    availability: 'In Stock',
  },
  {
    id: 'prd-09',
    sku: 'MIR-05MM',
    name: '5mm Modiguard Ultra Mirror',
    category: 'Mirror Glass',
    thicknessMm: 5,
    glassType: 'Mirror Glass',
    dimensions: 'Custom Sizes up to 8ft × 6ft',
    description: 'Distortion-free copper-free silver coated mirror glass with moisture resistant backing for bathrooms & salons.',
    availability: 'In Stock',
  },
];

const CATEGORIES = [
  'All Categories',
  'Clear Float Glass',
  'Toughened Glass',
  'Tinted Glass',
  'Frosted Glass',
  'Mirror Glass',
];

const THICKNESS_OPTIONS = ['All Thicknesses', '5mm', '8mm', '10mm', '12mm'];

export default function ProductsPage() {
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [selectedThickness, setSelectedThickness] = useState('All Thicknesses');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCat === 'All Categories' || p.category === selectedCat;
      const matchThick =
        selectedThickness === 'All Thicknesses' || `${p.thicknessMm}mm` === selectedThickness;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.glassType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchThick && matchSearch;
    });
  }, [selectedCat, selectedThickness, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <PublicNavbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-brand-navyDark via-brand-navy to-slate-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow">
            Commercial Glass Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Glass Products &amp; Specifications
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Browse our available glass inventory. Every product can be customized to your exact dimensions in feet, inches, or millimeters.
          </p>
        </div>
      </section>

      {/* Filter & Catalog Section */}
      <section className="py-12 bg-slate-900 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-brand-teal"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Filter className="w-3.5 h-3.5 text-brand-tealGlow" /> Category:
              </span>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <span className="text-xs text-slate-400 ml-2 font-medium">Thickness:</span>
              <select
                value={selectedThickness}
                onChange={(e) => setSelectedThickness(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
              >
                {THICKNESS_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl bg-slate-800/60 border border-white/10 hover:border-brand-teal/50 transition-all p-6 flex flex-col justify-between hover:shadow-glassHover"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded text-xs font-bold bg-teal-500/20 text-brand-tealGlow border border-teal-500/30">
                      {p.thicknessMm}mm
                    </span>
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{p.availability}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-teal-400 font-medium mb-3">{p.category}</p>
                  
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {p.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1 mb-4 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Dimensions:</span>
                      <span className="text-white font-medium">{p.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Cut Option:</span>
                      <span className="text-white font-medium">Straight &amp; Edge Polishing</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Ready for Custom Sizing</span>
                  <Link
                    href={`/quote?product=${encodeURIComponent(p.name)}&thickness=${p.thicknessMm}`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
              <Layers className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No products found matching filters</h3>
              <p className="text-xs text-slate-400">Try clearing the search query or selecting &quot;All Categories&quot;.</p>
            </div>
          )}

        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

