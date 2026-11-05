import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Srivalli Glass Traders | Hyderabad Glass Trading & Cutting Specialists',
  description: 'Srivalli Glass Traders - Quality glass solutions at competitive prices in Hyderabad, Telangana. Wholesale float glass, toughened glass, custom cutting, mirrors, and remnants.',
  keywords: 'glass traders hyderabad, toughened glass, clear float glass, glass cutting hyderabad, mirror glass, glass suppliers telangana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

