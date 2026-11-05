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
  const initialProduct = searchParams.get('product') || searchParams.get('category') || '';
  const initialThickness = searchParams.get('thickness') || '5';
  const initialLength = searchParams.get('length') || '6';
  const initialWidth = searchParams.get('width') || '4';
  const initialUnit = (searchParams.get('unit') as DimensionUnit) || 'ft';

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [glassType, setGlassType] = useState(initialProduct || 'Clear Float Glass');
  const [thicknessMm, setThicknessMm] = useState(initialThickness);
  const [length, setLength] = useState(initialLength);
  const [width, setWidth] = useState(initialWidth);
  const [unit, setUnit] = useState<DimensionUnit>(initialUnit);
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {submittedLead ? (
        <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-red-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-red-50 text-[#8B1E2D] flex items-center justify-center mx-auto border border-red-200">
            <CheckCircle2 className="w-10 h-10 text-[#8B1E2D]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Quotation Request Received!
            </h2>
            <p className="text-base text-slate-600">
              Thank you, <strong className="text-slate-900 font-bold">{customerName}</strong>. Your custom glass inquiry is registered in our ERP system.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-sm sm:text-base">
            <div className="flex justify-between items-center text-slate-600">
              <span>Inquiry Reference No:</span>
              <span className="text-[#8B1E2D] font-mono font-black text-lg">
                {submittedLead.referenceNumber}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Glass Type &amp; Thickness:</span>
              <span className="text-slate-900 font-bold">{glassType} ({thicknessMm}mm)</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Dimensions Entered:</span>
              <span className="text-slate-900 font-bold">{length} &times; {width} {unit} &bull; Qty: {quantity}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-900">Calculated Square Footage:</span>
              <span className="text-[#8B1E2D] font-black text-xl">{submittedLead.estimatedSqFt} sq ft</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/919876543210?text=Hello%20Srivalli%20Glass,%20I%20have%20submitted%20inquiry%20${submittedLead.referenceNumber}%20for%20${glassType}%20(${submittedLead.estimatedSqFt}%20sq%20ft).%20Please%20share%20final%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-base font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white flex items-center justify-center gap-2.5 shadow-md transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send to WhatsApp Team</span>
            </a>

            <button
              onClick={() => setSubmittedLead(null)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-base font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all border border-slate-200"
            >
              Submit Another Size
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-card space-y-6">
            <div className="flex items-center gap-2.5 text-base font-extrabold text-[#8B1E2D] pb-4 border-b border-slate-100">
              <Ruler className="w-5 h-5" />
              <span>Step 1: Enter Customer &amp; Dimension Details</span>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-[#8B1E2D] text-sm font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Your Name / Firm *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Reddy / Arch Studio"
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98480 12345"
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. contact@business.com"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Glass Category *
                  </label>
                  <select
                    value={glassType}
                    onChange={(e) => setGlassType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-semibold"
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
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Thickness (mm) *
                  </label>
                  <select
                    value={thicknessMm}
                    onChange={(e) => setThicknessMm(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-semibold"
                  >
                    <option value="3">3mm Thin</option>
                    <option value="4">4mm Standard</option>
                    <option value="5">5mm Commercial Standard</option>
                    <option value="8">8mm Table Top / Shelves</option>
                    <option value="10">10mm Partition / Toughened</option>
                    <option value="12">12mm Heavy Structural</option>
                  </select>
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-bold text-slate-800">Dimensions *</label>
                  <span className="text-xs text-[#8B1E2D] font-bold">Auto Sq Ft Conversion</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="Length"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="Width"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
                    />
                  </div>
                  <div>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as DimensionUnit)}
                      className="w-full px-3 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
                    >
                      <option value="ft">Feet (ft)</option>
                      <option value="in">Inches (in)</option>
                      <option value="mm">Millimeters (mm)</option>
                      <option value="cm">Centimeters (cm)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Quantity (Pieces) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#8B1E2D] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Delivery Site in Hyderabad
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Jubilee Hills, Gachibowli..."
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">
                  Cut / Edge Processing Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Machine flat polishing, corner beveling, hole cutouts, or urgent site schedule..."
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-base font-extrabold text-white bg-[#8B1E2D] hover:bg-[#68121E] disabled:opacity-50 transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span>Processing Sizing Calculation...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate &amp; Submit Official Quote</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Calculation Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 space-y-6 shadow-card">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-sm font-extrabold uppercase tracking-wider text-[#8B1E2D] flex items-center gap-2">
                  <Calculator className="w-5 h-5" /> Live Sizing Breakdown
                </span>
                <span className="text-xs text-slate-500 font-mono">Precision Metric</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Glass:</span>
                  <strong className="text-slate-900">{glassType} ({thicknessMm}mm)</strong>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Input Dimensions:</span>
                  <strong className="text-slate-900 font-mono">{length} &times; {width} {unit}</strong>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Area per Piece:</span>
                  <strong className="text-slate-900 font-mono">{liveCalculation.areaPerPiece} sq ft</strong>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Pieces Count:</span>
                  <strong className="text-slate-900 font-mono">{quantity} piece(s)</strong>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-900">Total Square Feet:</span>
                  <span className="text-3xl font-black text-[#8B1E2D] font-mono tracking-tight">
                    {liveCalculation.totalSqFt} <span className="text-sm font-bold text-slate-600">sq ft</span>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-xs sm:text-sm text-slate-700 space-y-1">
                <p className="font-extrabold text-[#8B1E2D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B1E2D]" /> Remnant Salvage Priority
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our system automatically searches our certified reusable remnant pieces before cutting from a fresh sheet, saving you wastage and material expense!
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">Prefer to chat directly?</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Send custom size sketches via WhatsApp</p>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hello%20Srivalli%20Glass%20Traders,%20I%20have%20custom%20glass%20measurements%20for%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-sm font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white flex items-center gap-2 transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
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
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#8B1E2D] selection:text-white">
      <PublicNavbar />

      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="font-serif italic tracking-[0.25em] text-slate-500 text-sm uppercase font-semibold">
            I N S T A N T &nbsp; C U S T O M &nbsp; S I Z I N G
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Request a Custom Glass Quotation
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Specify your dimensions in feet, inches, centimeters, or millimeters. Our Hyderabad depot calculates the square footage and delivers an itemized wholesale estimate.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white flex-1">
        <Suspense fallback={<div className="text-center text-slate-500 py-16">Loading quotation calculator...</div>}>
          <QuoteContent />
        </Suspense>
      </section>

      <PublicFooter />
    </div>
  );
}
