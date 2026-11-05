'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Ruler, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { calculateSquareFootage, DimensionUnit } from '@/lib/calculator';

function QuoteContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get('product') || '';
  const initialThickness = searchParams.get('thickness') || '5';

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [glassType, setGlassType] = useState(initialProduct || 'Clear Float Glass');
  const [thicknessMm, setThicknessMm] = useState(initialThickness);
  const [length, setLength] = useState('6');
  const [width, setWidth] = useState('4');
  const [unit, setUnit] = useState<DimensionUnit>('ft');
  const [quantity, setQuantity] = useState('1');
  const [deliveryLocation, setDeliveryLocation] = useState('Hyderabad');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{
    referenceNumber: string;
    estimatedSqFt: number;
  } | null>(null);

  const liveCalculation = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const q = parseInt(quantity) || 1;
    if (l <= 0 || w <= 0) return { areaPerPiece: 0, totalSqFt: 0 };

    const areaPerPiece = calculateSquareFootage(l, w, unit);
    const totalSqFt = Math.round(areaPerPiece * q * 100) / 100;
    return { areaPerPiece, totalSqFt };
  }, [length, width, unit, quantity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          glassType,
          thicknessMm: Number(thicknessMm),
          length: Number(length),
          width: Number(width),
          unit,
          quantity: Number(quantity),
          deliveryLocation,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote inquiry');
      }

      setSubmittedLead({
        referenceNumber: data.referenceNumber,
        estimatedSqFt: data.estimatedSqFt,
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {submittedLead ? (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-800/90 border border-teal-500/50 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-brand-tealGlow flex items-center justify-center mx-auto border border-teal-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Quotation Request Submitted!
            </h2>
            <p className="text-sm text-slate-300">
              Thank you, <strong className="text-white">{customerName}</strong>. Your inquiry has been received by Sri Valli Glass Traders.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2 text-sm">
            <div className="flex justify-between items-center text-slate-400">
              <span>Inquiry Reference No:</span>
              <span className="text-brand-tealGlow font-mono font-bold text-base">
                {submittedLead.referenceNumber}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Glass Type &amp; Thickness:</span>
              <span className="text-white font-medium">{glassType} ({thicknessMm}mm)</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Dimensions Entered:</span>
              <span className="text-white font-medium">{length} &times; {width} {unit} &bull; Qty: {quantity}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Calculated Area:</span>
              <span className="text-teal-300 font-bold">{submittedLead.estimatedSqFt} sq ft</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/919876543210?text=Hello%20Sri%20Valli%20Glass,%20I%20have%20submitted%20inquiry%20${submittedLead.referenceNumber}%20for%20${glassType}%20(${submittedLead.estimatedSqFt}%20sq%20ft).%20Please%20share%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send to WhatsApp Direct</span>
            </a>

            <button
              onClick={() => setSubmittedLead(null)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 transition-all"
            >
              Submit Another Quote
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-tealGlow">
              <Ruler className="w-4 h-4" />
              <span>Enter Custom Glass Specifications</span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar / Interior Firm"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98480 12345"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Glass Type *
                  </label>
                  <select
                    value={glassType}
                    onChange={(e) => setGlassType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
                  >
                    <option value="Clear Float Glass">Clear Float Glass</option>
                    <option value="Toughened Glass">Toughened Glass</option>
                    <option value="Bronze Tinted Glass">Bronze Tinted Glass</option>
                    <option value="Grey Tinted Glass">Grey Tinted Glass</option>
                    <option value="Frosted Glass">Frosted Glass</option>
                    <option value="Mirror Glass">Mirror Glass</option>
                    <option value="Laminated Glass">Laminated Glass</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Thickness (mm) *
                  </label>
                  <select
                    value={thicknessMm}
                    onChange={(e) => setThicknessMm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
                  >
                    <option value="3">3mm</option>
                    <option value="4">4mm</option>
                    <option value="5">5mm (Standard)</option>
                    <option value="8">8mm (Heavy Table Top)</option>
                    <option value="10">10mm (Partition / Toughened)</option>
                    <option value="12">12mm (Structural Railing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Length *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Width *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Unit *
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as DimensionUnit)}
                    className="w-full px-2.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
                  >
                    <option value="ft">Feet (ft)</option>
                    <option value="in">Inches (in)</option>
                    <option value="mm">Millimeters (mm)</option>
                    <option value="cm">Centimeters (cm)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Number of Pieces *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Delivery Site / Area in Hyderabad
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Jubilee Hills, Kukatpally, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Additional Requirements / Edge Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Edge polishing, hole cutouts, frosted design, or site delivery urgency..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-glassHover"
              >
                {loading ? (
                  <span>Calculating &amp; Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-brand-teal/30 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" /> Live Calculation
                </span>
                <span className="text-xs text-slate-400 font-mono">Formula: Auto Sq Ft</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Input Dimensions:</span>
                  <strong className="text-white font-mono">{length} &times; {width} {unit}</strong>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Area per Piece:</span>
                  <strong className="text-white font-mono">{liveCalculation.areaPerPiece} sq ft</strong>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Quantity:</span>
                  <strong className="text-white font-mono">{quantity} piece(s)</strong>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-white">Total Square Footage:</span>
                  <span className="text-2xl font-extrabold text-brand-tealGlow font-mono">
                    {liveCalculation.totalSqFt} <span className="text-xs font-normal text-slate-400">sq ft</span>
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/20 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-teal-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Direct Workshop Advantage
                </p>
                <p className="text-[11px] text-slate-400 leading-snug">
                  We check our reusable remnant inventory first before cutting from a fresh sheet, saving you material costs!
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Prefer to message directly?</h4>
                <p className="text-[11px] text-slate-400">Send dimensions directly via WhatsApp</p>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hello%20Sri%20Valli%20Glass%20Traders,%20I%20need%20a%20quote%20for%20custom%20glass"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuoteRequestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-brand-navyDark via-brand-navy to-slate-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow">
            Instant Custom Sizing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Request a Custom Glass Quotation
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Specify your required length, width, thickness, and preferred unit. Our Hyderabad workshop team 
            will calculate the exact square-foot pricing and get back to you promptly.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-900 flex-1">
        <Suspense fallback={<div className="text-center text-slate-400 py-12">Loading quotation calculator...</div>}>
          <QuoteContent />
        </Suspense>
      </section>

      <PublicFooter />
    </div>
  );
}
