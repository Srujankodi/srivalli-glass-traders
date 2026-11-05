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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navyDark via-brand-navy to-slate-900 p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Logo & Heading */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center border border-brand-teal/40">
              <Layers className="w-5 h-5 text-brand-tealGlow" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Srivalli <span className="text-brand-tealGlow">Glass</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white">Internal Business Portal</h1>
          <p className="text-xs text-slate-400">ERP &bull; Inventory &bull; Glass Cutting &bull; Billing</p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-slate-800/80 border border-white/10 shadow-2xl space-y-6 backdrop-blur-md">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Authorized Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@srivalliglass.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to ERP Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Quick Click */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block text-center">
              Demonstration &amp; Testing Accounts
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill('owner')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-teal-500/30 hover:border-teal-500/60 text-left transition-colors"
              >
                <div className="font-bold text-teal-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> Owner
                </div>
                <div className="text-[10px] text-slate-400">Full Financial Access</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('operator')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-white/20 text-left transition-colors"
              >
                <div className="font-bold text-slate-200 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> Operator
                </div>
                <div className="text-[10px] text-slate-400">Cutting &amp; Stock Only</div>
              </button>
            </div>
          </div>

        </div>

        {/* Back to Public Website link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            &larr; Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}

