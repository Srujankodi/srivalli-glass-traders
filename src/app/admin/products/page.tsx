'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  IndianRupee 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Add Product Modal
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [glassType, setGlassType] = useState('Clear Float Glass');
  const [thicknessMm, setThicknessMm] = useState('5');
  const [purchaseRateSqFt, setPurchaseRateSqFt] = useState('42');
  const [sellingRateSqFt, setSellingRateSqFt] = useState('58');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/suppliers'); // Enriched product comparisons endpoint
      const data = await res.json();
      setProducts(data.comparisonByProduct?.map((c: any) => c.product) || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newP = {
      id: `prd-${Date.now().toString().slice(-4)}`,
      sku: sku || `GLS-${Date.now().toString().slice(-4)}`,
      name,
      glassType,
      thicknessMm: parseFloat(thicknessMm),
      purchaseRateSqFt: parseFloat(purchaseRateSqFt),
      sellingRateSqFt: parseFloat(sellingRateSqFt),
      description,
      isPublic,
      isActive: true,
    };
    setProducts([newP, ...products]);
    setShowModal(false);
  };

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.glassType?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-teal-400" />
            <span>Product Catalog &amp; Wholesale/Selling Rates</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage commercial glass variants, thicknesses, standard square-foot selling rates, and public catalog visibility.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Glass Product</span>
        </button>
      </div>

      {/* Product List Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white">Glass Products ({filtered.length})</h2>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-800 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-brand-teal"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">SKU</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Glass Type</th>
                <th className="p-3">Thickness</th>
                <th className="p-3">Purchase Rate</th>
                <th className="p-3">Selling Rate</th>
                <th className="p-3">Gross Margin</th>
                <th className="p-3">Website Visibility</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => {
                const margin = p.sellingRateSqFt > 0
                  ? Math.round(((p.sellingRateSqFt - p.purchaseRateSqFt) / p.sellingRateSqFt) * 100)
                  : 0;
                return (
                  <tr key={p.id} className="hover:bg-white/5 text-slate-300">
                    <td className="p-3 font-mono font-bold text-teal-300">{p.sku}</td>
                    <td className="p-3 font-semibold text-white">{p.name}</td>
                    <td className="p-3">{p.glassType}</td>
                    <td className="p-3 font-bold">{p.thicknessMm}mm</td>
                    <td className="p-3 font-mono">{formatINR(p.purchaseRateSqFt)} / sq ft</td>
                    <td className="p-3 font-mono font-bold text-white">{formatINR(p.sellingRateSqFt)} / sq ft</td>
                    <td className="p-3 font-mono text-emerald-400 font-semibold">{margin}%</td>
                    <td className="p-3">
                      {p.isPublic ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-teal-300">
                          <Eye className="w-3 h-3" /> Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                          <EyeOff className="w-3 h-3" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Glass Product</h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 10mm Clear Toughened Glass"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="TGH-10MM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Thickness (mm) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={thicknessMm}
                    onChange={(e) => setThicknessMm(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Glass Category</label>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                >
                  <option value="Clear Float Glass">Clear Float Glass</option>
                  <option value="Toughened Glass">Toughened Glass</option>
                  <option value="Tinted Glass">Tinted Glass</option>
                  <option value="Frosted Glass">Frosted Glass</option>
                  <option value="Mirror Glass">Mirror Glass</option>
                  <option value="Laminated Glass">Laminated Glass</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Purchase Cost / Sq Ft (₹)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={purchaseRateSqFt}
                    onChange={(e) => setPurchaseRateSqFt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Selling Rate / Sq Ft (₹)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={sellingRateSqFt}
                    onChange={(e) => setSellingRateSqFt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white font-mono font-bold text-teal-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 bg-slate-800"
                />
                <span className="text-slate-300">Show in public website catalog</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

