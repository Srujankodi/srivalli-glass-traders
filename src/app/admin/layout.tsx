import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-20 md:ml-64 transition-all duration-300">
        <AdminHeader />
        <main className="p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
