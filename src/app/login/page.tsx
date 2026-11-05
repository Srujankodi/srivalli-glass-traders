'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layers, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('owner@srivalliglass.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Successfully authenticated
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (role: 'owner' | 'operator') => {
    if (role === 'owner') {
      setEmail('owner@srivalliglass.com');
      setPassword('admin123');
    } else {
      setEmail('operator@srivalliglass.com');
      setPassword('operator123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 font-sans selection:bg-teal-600 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        
        {/* Logo & Heading */}
        <div className="text-center space-y-2.5">
          <Link href="/" className="inline-flex items-center gap-3 mb-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-slate-900 flex items-center justify-center border border-teal-400/40 shadow-lg group-hover:scale-105 transition-all">
              <Layers className="w-6 h-6 text-teal-100" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Srivalli <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Glass Traders</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Staff Management Portal</h1>
          <p className="text-sm text-slate-300">ERP &bull; Inventory &bull; Glass Cutting &bull; GST Invoicing</p>
        </div>

        {/* Login Card */}
        <div className="p-8 sm:p-9 rounded-3xl bg-slate-900 border border-teal-500/25 shadow-2xl space-y-6 backdrop-blur-xl">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">
                Authorized Staff Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@srivalliglass.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-base font-bold bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white transition-all flex items-center justify-center gap-2.5 shadow-xl hover:shadow-teal-500/25 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Sign In to ERP Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Fill Testing Credentials */}
          <div className="pt-5 border-t border-white/10 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block text-center">
              Quick Sign-in for Testing
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => handleQuickFill('owner')}
                className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-teal-500/30 hover:border-teal-500/60 text-left transition-colors"
              >
                <div className="font-bold text-teal-300 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" /> Owner Account
                </div>
                <div className="text-xs text-slate-300 mt-0.5">Full Financials &amp; CRM</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('operator')}
                className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-left transition-colors"
              >
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-teal-400" /> Operator Account
                </div>
                <div className="text-xs text-slate-300 mt-0.5">Cutting &amp; Stock Only</div>
              </button>
            </div>
          </div>

        </div>

        {/* Back to Public Website link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            &larr; Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
