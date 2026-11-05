'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PackageCheck, 
  Truck, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  IndianRupee 
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

export default function SalesOrdersPage() {
  const [salesOrders, setSalesOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial verified orders
    setSalesOrders([
      {
        id: 'so-001',
        orderNumber: 'SO-2026-0001',
        customerName: 'Sri Krishna Interiors & Architects',
        orderDate: '2026-10-27',
        deliveryDate: '2026-10-29',
        status: 'DELIVERED',
        paymentStatus: 'PAID',
        subtotal: 18400,
        cuttingCharges: 1200,
        transportCharges: 1000,
        taxAmount: 3600,
        totalAmount: 24200,
        amountPaid: 24200,
        balanceDue: 0,
        notes: 'Delivered in full to Jubilee Hills site with inspection sign-off.',
      },
      {
        id: 'so-002',
        orderNumber: 'SO-2026-0002',
        customerName: 'Venkata Sai Builders & Developers',
        orderDate: '2026-11-02',
        deliveryDate: '2026-11-06',
        status: 'PROCESSING',
        paymentStatus: 'PARTIALLY_PAID',
        subtotal: 48000,
        cuttingCharges: 2500,
        transportCharges: 2000,
        taxAmount: 9450,
        totalAmount: 61950,
        amountPaid: 30000,
        balanceDue: 31950,
        notes: '12mm Toughened Balcony panels for Kukatpally project.',
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-teal-400" />
            <span>Sales Orders &amp; Delivery Tracking</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Confirmed customer orders, cutting fulfillment status, local Hyderabad site deliveries, and billing linkage.
          </p>
        </div>

        <Link
          href="/admin/calculator"
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span>Calculate New Order Size</span>
        </Link>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Sales Orders Register</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Target Delivery</th>
                <th className="p-3">Material + Cutting</th>
                <th className="p-3">GST (18%)</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Balance Due</th>
                <th className="p-3">Order Status</th>
                <th className="p-3 text-right">Invoice Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {salesOrders.map((so) => (
                <tr key={so.id} className="hover:bg-white/5 text-slate-300">
                  <td className="p-3 font-mono font-bold text-teal-300">{so.orderNumber}</td>
                  <td className="p-3 font-semibold text-white">{so.customerName}</td>
                  <td className="p-3 text-slate-400">{so.orderDate}</td>
                  <td className="p-3 text-slate-300">{so.deliveryDate}</td>
                  <td className="p-3 font-mono">{formatINR(so.subtotal + so.cuttingCharges + so.transportCharges)}</td>
                  <td className="p-3 font-mono text-slate-400">+{formatINR(so.taxAmount)}</td>
                  <td className="p-3 font-mono font-bold text-white text-sm">{formatINR(so.totalAmount)}</td>
                  <td className="p-3 font-mono font-bold text-rose-400">{formatINR(so.balanceDue)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        so.status === 'DELIVERED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {so.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href="/admin/invoices"
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 inline-flex items-center gap-1 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-400" />
                      <span>View Tax Invoice</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

