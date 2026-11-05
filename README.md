# Sri Valli Glass Traders — Full-Stack Glass Trading ERP & Customer Website

> **Location:** Hyderabad, Telangana, India  
> **Industry:** Architectural Glass Trading & Building Materials  
> **Currency:** Indian Rupees (₹) &bull; **Selling Unit:** Square Feet (sq ft)  
> **Taxation:** GST 18% (Telangana Intra-State CGST 9% + SGST 9% &bull; State Code 36)

---

## 1. Project Overview & Business Background

**Sri Valli Glass Traders** is an actual commercial glass trading and processing enterprise based in Hyderabad, Telangana. The business operates across two interconnected domains:

1. **Wholesale Sourcing & Physical Stock Management**: Purchasing standard and jumbo sheets ($10\text{ ft} \times 8\text{ ft}$, $12\text{ ft} \times 8\text{ ft}$, etc.) from wholesale float manufacturers and regional tempering plants.
2. **Customer Order Fulfillment & Precision Cutting**: Supplying custom-dimension glass to residential clients, builders, interior designers, and contractors, while salvaging usable offcut remnants and monetizing scrap cullet.

This repository contains a full-stack, production-ready web application combining:
- A **Premium Public Customer Website** for product browsing, company information, and custom quotation inquiries with instant area calculation and WhatsApp integration.
- A **Secure Internal Enterprise Resource Planning (ERP) Dashboard** covering Products, Wholesale Suppliers, Purchase Orders, Landed Cost Tracking, 2D Glass Cutting, Reusable Remnants, Scrap Cullet Sales, CRM Pipeline, Quotations, GST Invoicing, Payments, Operating Expenses, and Real-time Profit Analytics.

---

## 2. Key Architecture & Technology Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling & UI**: Tailwind CSS, Lucide React icons, Glassmorphic Navy-Teal visual identity
- **Data Visualization**: Recharts (Revenue vs Purchases, Category Distribution, Material Yield)
- **Database & ORM**: PostgreSQL with Prisma ORM (27 normalized entities) & zero-latency file-backed persistence fallback (`.data/srivalli_db.json`)
- **Authentication**: Role-Based Session Guards (`OWNER` vs `OPERATOR`) with password hashing and JWT
- **Export Formats**: Standard CSV and Excel compatible exports for accounting and tax audits

---

## 3. Domain Math & Financial Formulas

### A. Square-Foot Area Formulas
- **Feet (`ft`)**: $\text{Area} = \text{Length} \times \text{Width}$
- **Inches (`in`)**: $\text{Area} = \frac{\text{Length} \times \text{Width}}{144}$
- **Millimeters (`mm`)**: $\text{Area} = \frac{\text{Length} \times \text{Width}}{92,903.04}$
- **Centimeters (`cm`)**: $\text{Area} = \frac{\text{Length} \times \text{Width}}{929.0304}$

### B. Landed Cost Allocation
$$\text{Landed Cost per sq ft} = \frac{\text{Purchase Subtotal} + \text{Freight} + \text{Hamali Unloading} + \text{Taxes}}{\text{Total Usable Square Feet}}$$

### C. Glass Cutting & Lineage Rules
- **Kerf Loss**: $3.0\text{ mm}$ standard score and wheel breakout width.
- **Usable Remnant Threshold**: Residual pieces with $\text{Area} \ge 2.0\text{ sq ft}$ and minimum dimension $\ge 250\text{ mm}$ are automatically assigned a unique Remnant Tag (`REM-2026-XXXX`) and cataloged in the remnant inventory.
- **Scrap (Cullet)**: Trimmings below $2.0\text{ sq ft}$ are logged into the scrap register by weight ($\text{kg}$) and sold to glass recycling aggregators in Hyderabad.

### D. Financial Engine
$$\text{Gross Profit} = \text{Net Sales Revenue} - \text{COGS (Allocated Landed Material Cost)}$$
$$\text{Net Profit} = \text{Gross Profit} + \text{Scrap Cullet Sales} - \text{Operating Expenses (Rent, Power, Tools, Labor)}$$

---

## 4. System Capabilities & Modules

| Module | Route | Functionality |
|---|---|---|
| **Public Homepage** | `/` | Hero section, category showcase, Why Choose Us, workshop location, WhatsApp & Call CTAs. |
| **Product Catalog** | `/products` | Interactive category & thickness filters, commercial specifications, quote request triggers. |
| **Instant Quote** | `/quote` | Custom size entry in ft/in/mm/cm with live sq ft calculation and CRM lead generation. |
| **About & Contact** | `/about`, `/contact` | Authentic business background, Hyderabad address, phone, GSTIN (36AAAAA0000A1Z5). |
| **Authentication** | `/login` | Secure role-based login with quick-fill demo buttons for Owner and Operator. |
| **Executive ERP** | `/admin` | 12 real-time KPI cards, monthly revenue vs purchases charts, and inventory breakdown. |
| **Sq Ft Calculator** | `/admin/calculator` | Multi-unit decimal-safe pricing calculator with cutting charges, transport, and Telangana GST 18%. |
| **2D Glass Cutting** | `/admin/cutting` | Interactive SVG guillotine layout visualizer, geometric fit verification, and remnant auto-creation. |
| **Reusable Remnants**| `/admin/remnants` | Offcut inventory with Smart Stock Matcher prioritizing zero material wastage. |
| **Scrap Cullet** | `/admin/scrap` | Scrap bin inventory by weight and sales receipts with cullet recycling revenue tracking. |
| **Suppliers** | `/admin/suppliers` | Wholesale distributor directory with automated Best Price Comparison Matrix. |
| **Purchases** | `/admin/purchases` | Purchase orders with landed cost breakdown (freight, hamali unloading, GST). |
| **Sheet Inventory** | `/admin/inventory` | Barcode tagged jumbo stock sheets with physical rack bin locations. |
| **CRM Leads** | `/admin/crm` | Kanban pipeline from website, WhatsApp, phone, and walk-in leads. |
| **Quotations** | `/admin/quotations` | Multi-item formal quotations with preformatted WhatsApp share links. |
| **Sales Orders** | `/admin/sales` | Confirmed customer orders and delivery fulfillment tracking. |
| **Tax Invoices** | `/admin/invoices` | Telangana intra-state CGST (9%) + SGST (9%) branded printable PDF invoices. |
| **Payments** | `/admin/payments` | Cash, UPI, and Bank NEFT/RTGS payment ledger reconciling customer & supplier accounts. |
| **Expenses** | `/admin/expenses` | Overhead expense book for labor wages, auto freight, cutter tools, and TSSPDCL electricity. |
| **Analytics** | `/admin/analytics` | P&L statements, gross margin trends, top-selling glass types, and material yield ratios. |
| **Reports** | `/admin/reports` | Downloadable CSV and Excel exports for sales, stock valuation, and remnants. |
| **Settings** | `/admin/settings` | Company details, GST registration parameters, and cutting engine thresholds. |

---

## 5. Getting Started & Local Setup

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node.js v24.16.0)
- npm `v9+` or `v11+`

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/srivalli-glass-traders.git
cd srivalli-glass-traders

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run Automated Test Suite
npm test

# Build for Production
npm run build

# Start Development Server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public customer website.  
Visit [http://localhost:3000/admin](http://localhost:3000/admin) for the ERP business dashboard.

---

## 6. Demonstration Accounts

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Proprietor / Owner** | `owner@srivalliglass.com` | `admin123` | Full access to all ERP modules, financial data, and settings |
| **Workshop Operator** | `operator@srivalliglass.com` | `operator123` | Glass cutting, remnants, scrap, and physical stock registers |

---

## 7. Recommended Daily Git Commit Messages (Bytecode Trainings)

For tracking development milestones across project phases:

```bash
git commit -m "feat(arch): initialize Next.js 14 project, design architecture and PostgreSQL schema"
git commit -m "feat(core): implement domain math calculator and 2D glass cutting engine with unit tests"
git commit -m "feat(public): create premium customer website, product catalog, and quotation inquiry form"
git commit -m "feat(erp): build executive dashboard with 12 KPIs, Recharts analytics, and session auth"
git commit -m "feat(operations): implement smart remnant matcher, visual cutting layout SVG, and scrap cullet module"
git commit -m "feat(billing): add GST tax invoicing, payment reconciliation, expenses book, and CSV exports"
git commit -m "test: add automated unit tests for cutting feasibility, landed costs, and profit formulas"
```

---

## 8. License & Attribution

Designed and developed for **Sri Valli Glass Traders**, Hyderabad, Telangana, India.  
Enterprise Project developed in compliance with Bytecode Trainings specifications.
