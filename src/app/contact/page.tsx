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
  const [companyGstin, setCompanyGstin] = useState('36AAAAA0000A1Z5');

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
          if (s.gstin) setCompanyGstin(s.gstin);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-600 selection:text-white">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-24 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-teal-950/80 text-teal-300 border border-teal-500/30">
            Direct Hyderabad Depot Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact Srivalli Glass Traders
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Reach out for wholesale glass sheets, custom residential glass cuts, or onsite commercial project consultations in Hyderabad and Secunderabad.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 sm:py-20 bg-slate-950 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 sm:p-9 rounded-3xl bg-slate-900 border border-teal-500/25 space-y-7 shadow-2xl">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2.5 pb-4 border-b border-white/10">
                  <Building2 className="w-6 h-6 text-teal-400" />
                  <span>Depot &amp; Workshop</span>
                </h3>

                <div className="space-y-5 text-sm sm:text-base">
                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block font-semibold">Physical Workshop Location:</strong>
                      <span className="text-slate-300 leading-relaxed text-sm mt-0.5 block">
                        {companyAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block font-semibold">Phone Consultation:</strong>
                      <a href={`tel:${companyPhone.replace(/[^0-9+]/g, '')}`} className="text-teal-300 hover:underline font-bold text-base mt-0.5 block">
                        {companyPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block font-semibold">WhatsApp Direct:</strong>
                      <a
                        href={`https://wa.me/${companyPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline font-bold text-base mt-0.5 block"
                      >
                        {companyPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block font-semibold">Email:</strong>
                      <a href={`mailto:${companyEmail}`} className="text-slate-300 hover:text-white text-sm mt-0.5 block">
                        {companyEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 pt-4 border-t border-white/10">
                    <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block font-semibold">Operating Hours:</strong>
                      <span className="text-slate-300 text-sm leading-normal mt-0.5 block">
                        {companyHours}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <span className="inline-block px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-950 border border-teal-500/30 text-teal-300">
                    GSTIN: <strong>{companyGstin}</strong> (Telangana)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-slate-900 border border-teal-500/25 shadow-2xl">
              {submitted ? (
                <div className="py-14 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto border border-teal-500/40">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. Our Hyderabad sales desk has logged your requirement and will contact you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-white mb-2 pb-3 border-b border-white/10">Send an Inquiry</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-1.5">
                      Your Name / Enterprise *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Sharma / Modern Glaziers"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98490 12345"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-1.5">
                      Message / Custom Dimensions / Project Requirements *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify required glass varieties, thicknesses, dimensions, or site delivery location in Hyderabad..."
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 font-medium leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-base font-bold bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-teal-500/25"
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
