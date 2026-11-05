'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Building2 } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <PublicNavbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-brand-navyDark via-brand-navy to-slate-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-tealGlow">
            Visit or Call Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact Srivalli Glass Traders
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Reach out for wholesale glass sheets, custom residential glass cuts, or onsite commercial project consultations in Hyderabad.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 bg-slate-900 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-800/60 border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white">Workshop &amp; Trading Office</h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-brand-tealGlow shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Physical Location:</strong>
                      <span className="text-slate-300 leading-relaxed text-xs">
                        Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana 500001, India
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-brand-tealGlow shrink-0" />
                    <div>
                      <strong className="text-white block">Phone Consultation:</strong>
                      <a href="tel:+919876543210" className="text-brand-tealGlow hover:underline text-xs">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white block">WhatsApp Direct:</strong>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline text-xs"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-brand-tealGlow shrink-0" />
                    <div>
                      <strong className="text-white block">Email:</strong>
                      <a href="mailto:contact@srivalliglasstraders.com" className="text-slate-300 hover:underline text-xs">
                        contact@srivalliglasstraders.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2 border-t border-white/10">
                    <Clock className="w-5 h-5 text-brand-tealGlow shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Operating Hours:</strong>
                      <span className="text-slate-300 text-xs leading-normal">
                        Monday – Saturday: 9:00 AM – 8:30 PM<br />
                        Sunday: 10:00 AM – 3:00 PM
                      </span>
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <span className="inline-block px-3 py-1.5 rounded-xl text-xs bg-slate-900 border border-white/10 text-slate-300">
                    GSTIN: <strong>36AAAAA0000A1Z5</strong> (Telangana)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-white/10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-brand-tealGlow flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Received!</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, {name}. Our sales incharge will contact you shortly regarding your glass requirement.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-2">Send an Inquiry</h3>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
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
                      placeholder="e.g. 98490 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Message / Project Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify required glass types, thicknesses, or delivery requirements in Hyderabad..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Workshop</span>
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

