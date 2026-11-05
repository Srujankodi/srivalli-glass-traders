'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Layers, Filter, Search, ArrowRight, ShieldCheck, CheckCircle2, Ruler } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';

// Catalog benchmark fallback data
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
    name: '8mm Toughened Safety Glass',
    category: 'Toughened Glass',
    thicknessMm: 8,
    glassType: 'Toughened Glass',
    dimensions: 'Custom Cut with Holes/Cutouts',
    description: 'Impact-resistant tempered glass for shower cubicles, office partitions, and balcony railings.',
    availability: 'In Stock',
  },
  {
    id: 'prd-05',
    sku: 'TGH-10MM',
    name: '10mm Toughened Safety Glass',
    category: 'Toughened Glass',
    thicknessMm: 10,
    glassType: 'Toughened Glass',
    dimensions: 'Custom Cut with Holes/Cutouts',
    description: 'Certified architectural tempered glass for spider facades, glass doors, and canopy glazing.',
    availability: 'In Stock',
  },
  {
    id: 'prd-06',
    sku: 'TGH-12MM',
    name: '12mm Toughened Safety Glass',
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
  const [productsList, setProductsList] = useState<any[]>(PRODUCTS);
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [selectedThickness, setSelectedThickness] = useState('All Thicknesses');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/products?publicOnly=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          const enriched = data.products.map((p: any) => ({
            id: p.id,
            sku: p.sku,
            name: p.name,
            category: p.glassType || 'Glass',
            thicknessMm: p.thicknessMm,
            glassType: p.glassType,
            dimensions: 'Custom Sizes up to 10ft × 8ft',
            description: p.description || 'High-clarity glass tailored to exact specifications.',
            availability: 'In Stock',
          }));
          setProductsList(enriched);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      const matchCat = selectedCat === 'All Categories' || p.category === selectedCat;
      const matchThick =
        selectedThickness === 'All Thicknesses' || `${p.thicknessMm}mm` === selectedThickness;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.glassType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchThick && matchSearch;
    });
  }, [productsList, selectedCat, selectedThickness, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-600 selection:text-white">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-20 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-teal-950/80 text-teal-300 border border-teal-500/30">
            Commercial Glass Catalog &bull; Hyderabad
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Glass Products &amp; Specifications
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Browse our available glass inventory. Every item can be precisely cut to your custom measurements in feet, inches, centimeters, or millimeters.
          </p>
        </div>
      </section>

      {/* Filter & Catalog Section */}
      <section className="py-12 sm:py-16 bg-slate-950 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Filter Bar */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-teal-500/20 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
            
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search glass name, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 font-medium"
              />
            </div>

            {/* Category & Thickness Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <span className="text-sm text-slate-300 flex items-center gap-1.5 font-bold">
                <Filter className="w-4 h-4 text-teal-400" /> Category:
              </span>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="px-4 py-2.5 rounded-2xl text-sm bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-teal-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <span className="text-sm text-slate-300 ml-2 font-bold">Thickness:</span>
              <select
                value={selectedThickness}
                onChange={(e) => setSelectedThickness(e.target.value)}
                className="px-4 py-2.5 rounded-2xl text-sm bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-teal-400"
              >
                {THICKNESS_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-slate-900 border border-white/10 hover:border-teal-400/50 transition-all p-6 sm:p-7 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-950 text-teal-300 border border-teal-500/40">
                      {p.thicknessMm}mm Thickness
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{p.availability}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5">{p.name}</h3>
                  <p className="text-xs sm:text-sm text-teal-400 font-semibold mb-3">{p.category}</p>
                  
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {p.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 mb-5 text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Dimensions:</span>
                      <span className="text-white font-semibold">{p.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Cut Capabilities:</span>
                      <span className="text-white font-semibold">Straight Cut &amp; Edge Polished</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">Custom Sizing Ready</span>
                  <Link
                    href={`/quote?product=${encodeURIComponent(p.name)}&thickness=${p.thicknessMm}`}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white transition-all flex items-center gap-2 shadow-md"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-16 text-center rounded-3xl bg-slate-900 border border-white/10 space-y-3">
              <Layers className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No products found matching filters</h3>
              <p className="text-sm text-slate-400">Try clearing the search query or selecting &quot;All Categories&quot;.</p>
            </div>
          )}

        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
