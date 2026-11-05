'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Calculator,
  Users2,
  ShoppingCart,
  Boxes,
  Scissors,
  Repeat,
  Trash2,
  Contact2,
  Kanban,
  FileSpreadsheet,
  PackageCheck,
  FileText,
  CreditCard,
  Receipt,
  BarChart3,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Layers },
    { label: 'Sq Ft Calculator', href: '/admin/calculator', icon: Calculator },
    { label: 'Suppliers', href: '/admin/suppliers', icon: Users2 },
    { label: 'Purchases & POs', href: '/admin/purchases', icon: ShoppingCart },
    { label: 'Sheet Inventory', href: '/admin/inventory', icon: Boxes },
    { label: 'Glass Cutting', href: '/admin/cutting', icon: Scissors, highlight: true },
    { label: 'Reusable Remnants', href: '/admin/remnants', icon: Repeat },
    { label: 'Scrap (Cullet)', href: '/admin/scrap', icon: Trash2 },
    { label: 'Customers', href: '/admin/customers', icon: Contact2 },
    { label: 'CRM Leads', href: '/admin/crm', icon: Kanban },
    { label: 'Quotations', href: '/admin/quotations', icon: FileSpreadsheet },
    { label: 'Sales Orders', href: '/admin/sales', icon: PackageCheck },
    { label: 'Invoices & Billing', href: '/admin/invoices', icon: FileText },
    { label: 'Payments Ledger', href: '/admin/payments', icon: CreditCard },
    { label: 'Expenses Book', href: '/admin/expenses', icon: Receipt },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Reports & Export', href: '/admin/reports', icon: FileBarChart },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-white/10 z-40 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand & Collapse Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!collapsed && (
            <Link href="/admin" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-tight text-white truncate">
                Srivalli <span className="text-teal-400">ERP</span>
              </span>
            </Link>
          )}

          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white mx-auto">
              <Layers className="w-4 h-4" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links Scrollable */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                } ${item.highlight && !isActive ? 'text-teal-300' : ''}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-teal-400' : 'text-slate-400'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Open Public Customer Website in New Tab"
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-teal-400" />
          {!collapsed && <span>Public Website</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          title="Sign out of ERP"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

