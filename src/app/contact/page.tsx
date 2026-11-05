'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Building2 } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [companyAddress, setCompanyAddress] = useState('Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana 500001, India');
  const [companyPhone, setCompanyPhone] = useState('+91 98765 43210');
  const [companyEmail, setCompanyEmail] = useState('contact@srivalliglasstraders.com');
  const [companyHours, setCompanyHours] = useState('Monday – Saturday: 9:00 AM – 8:30 PM | Sunday: 10:00 AM – 3:00 PM');
  const [companyGstin, setCompanyGstin] = useState('36DRUPS5127N2ZQ');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          if (s.address) setCompanyAddress(s.address);
          if (s.phone) setCompanyPhone(s.phone);
          if (s.email) setCompanyEmail(s.email);
          if (s.businessHours) setCompanyHours(s.businessHours);
          if (s.gstin) setCompanyGstin(s.gstin.toUpperCase());
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#8B1E2D] selection:text-white">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="font-serif italic tracking-[0.25em] text-slate-500 text-sm uppercase font-semibold">
            V I S I T &nbsp; O R &nbsp; C A L L &nbsp; U S
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Srivalli Glass Traders
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Reach out for wholesale glass sheets, custom residential glass cuts, or onsite commercial project consultations in Hyderabad and Secunderabad.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 sm:py-20 bg-white flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 sm:p-9 rounded-3xl bg-slate-50 border border-slate-200 space-y-7 shadow-sm">
                <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5 pb-4 border-b border-slate-200">
                  <Building2 className="w-6 h-6 text-[#8B1E2D]" />
                  <span>Depot &amp; Workshop</span>
                </h3>

                <div className="space-y-5 text-sm sm:text-base">
                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 block font-bold">Physical Workshop Location:</strong>
                      <span className="text-slate-600 leading-relaxed text-sm mt-0.5 block">
                        {companyAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Phone className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 block font-bold">Phone Consultation:</strong>
                      <a href={`tel:${companyPhone.replace(/[^0-9+]/g, '')}`} className="text-[#8B1E2D] hover:underline font-extrabold text-base mt-0.5 block">
                        {companyPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 block font-bold">WhatsApp Direct:</strong>
                      <a
                        href={`https://wa.me/${companyPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:underline font-bold text-base mt-0.5 block"
                      >
                        {companyPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 block font-bold">Email:</strong>
                      <a href={`mailto:${companyEmail}`} className="text-slate-600 hover:text-slate-900 text-sm mt-0.5 block">
                        {companyEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 pt-4 border-t border-slate-200">
                    <Clock className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 block font-bold">Operating Hours:</strong>
                      <span className="text-slate-600 text-sm leading-normal mt-0.5 block">
                        {companyHours}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <span className="inline-block px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-white border border-slate-200 text-slate-800 shadow-xs">
                    GSTIN: <strong className="text-[#8B1E2D] font-mono uppercase font-black">{companyGstin ? companyGstin.toUpperCase() : '36DRUPS5127N2ZQ'}</strong> (Telangana)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-card">
              {submitted ? (
                <div className="py-14 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#8B1E2D] flex items-center justify-center mx-auto border border-red-200">
                    <CheckCircle2 className="w-8 h-8 text-[#8B1E2D]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{name}</strong>. Our Hyderabad sales desk has logged your requirement and will contact you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2 pb-3 border-b border-slate-100">Send an Inquiry</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Your Name / Enterprise *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Sharma / Modern Glaziers"
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
                      placeholder="e.g. 98490 12345"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Message / Custom Dimensions / Requirements *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify required glass varieties, thicknesses, dimensions, or site delivery location in Hyderabad..."
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B1E2D] focus:bg-white font-medium leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-base font-extrabold bg-[#8B1E2D] hover:bg-[#68121E] text-white transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Inquiry to Workshop</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
