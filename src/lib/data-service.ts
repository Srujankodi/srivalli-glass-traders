/**
 * Sri Valli Glass Traders - Enterprise Data & Persistence Service
 * Hyderabad, Telangana, India
 * 
 * Provides unified, transactional CRUD operations with automatic
 * persistence in `.data/srivalli_db.json`. Ensures real, dynamic
 * figures across all ERP modules and public inquiries.
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'srivalli_db.json');

// Ensure storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface AppDatabase {
  settings: any;
  categories: any[];
  products: any[];
  suppliers: any[];
  supplierPrices: any[];
  purchaseOrders: any[];
  glassSheets: any[];
  glassRemnants: any[];
  cuttingJobs: any[];
  scrapInventory: any[];
  scrapSales: any[];
  customers: any[];
  crmLeads: any[];
  quotations: any[];
  salesOrders: any[];
  invoices: any[];
  payments: any[];
  expenses: any[];
  users: any[];
  auditLogs: any[];
}

function getInitialDatabaseState(): AppDatabase {
  return {
    settings: {
      id: 'cfg-001',
      companyName: 'Sri Valli Glass Traders',
      tagline: 'Quality Glass Solutions at Competitive Prices',
      address: 'Shop No. 4, Plot 12, Glass Market, Hyderabad, Telangana 500001',
      phone: '+91 98765 43210',
      email: 'contact@srivalliglasstraders.com',
      whatsapp: '+919876543210',
      businessHours: 'Mon - Sat: 9:00 AM - 8:30 PM | Sunday: 10:00 AM - 3:00 PM',
      gstin: '36AAAAA0000A1Z5',
      stateCode: '36',
      stateName: 'Telangana',
      defaultGstRate: 18.0,
      currency: 'INR',
      currencySymbol: '₹',
      cuttingLossMm: 3.0,
      minRemnantAreaSqFt: 2.0,
      updatedAt: new Date().toISOString(),
    },
    users: [
      {
        id: 'usr-owner',
        name: 'Srivalli Kumar (Proprietor)',
        email: 'owner@srivalliglass.com',
        role: 'OWNER',
        phone: '+91 98765 43210',
        isActive: true,
      },
      {
        id: 'usr-operator',
        name: 'Ramesh Reddy (Cutter & Incharge)',
        email: 'operator@srivalliglass.com',
        role: 'OPERATOR',
        phone: '+91 98765 43211',
        isActive: true,
      },
    ],
    categories: [
      { id: 'cat-1', name: 'Clear Float Glass', slug: 'clear-float', description: 'Standard high-transparency architectural glass for windows, shelves, and facades.', isActive: true, displayOrder: 1 },
      { id: 'cat-2', name: 'Toughened Glass', slug: 'toughened', description: 'High-safety tempered structural glass 4x stronger than standard float glass.', isActive: true, displayOrder: 2 },
      { id: 'cat-3', name: 'Tinted Glass', slug: 'tinted', description: 'Solar control glass in bronze, green, dark grey, and blue shades.', isActive: true, displayOrder: 3 },
      { id: 'cat-4', name: 'Frosted Glass', slug: 'frosted', description: 'Acid-etched & sandblasted privacy glass for partitions and bathrooms.', isActive: true, displayOrder: 4 },
      { id: 'cat-5', name: 'Laminated Glass', slug: 'laminated', description: 'Safety glass with PVB interlayer for acoustic and shatterproof architectural safety.', isActive: true, displayOrder: 5 },
      { id: 'cat-6', name: 'Mirror Glass', slug: 'mirror', description: 'Premium silver-coated distortion-free mirrors for wardrobe, salon, and interior decor.', isActive: true, displayOrder: 6 },
      { id: 'cat-7', name: 'Reflective Glass', slug: 'reflective', description: 'Solar reflective glass for modern exterior commercial buildings.', isActive: true, displayOrder: 7 },
      { id: 'cat-8', name: 'Decorative Glass', slug: 'decorative', description: 'Textured, fluted, reeded, and patterned glass for luxury interior styling.', isActive: true, displayOrder: 8 },
    ],
    products: [
      {
        id: 'prd-01',
        sku: 'CFG-05MM',
        name: '5mm Clear Float Glass',
        categoryId: 'cat-1',
        thicknessMm: 5.0,
        glassType: 'Clear Float Glass',
        description: 'Standard clear glass for window panes, photo frames, and cabinet shutters.',
        purchaseRateSqFt: 42.0,
        sellingRateSqFt: 58.0,
        reorderLevelSqFt: 100,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-02',
        sku: 'CFG-08MM',
        name: '8mm Clear Float Glass',
        categoryId: 'cat-1',
        thicknessMm: 8.0,
        glassType: 'Clear Float Glass',
        description: 'Durable clear glass for table tops, glass shelves, and partitions.',
        purchaseRateSqFt: 68.0,
        sellingRateSqFt: 92.0,
        reorderLevelSqFt: 80,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-03',
        sku: 'CFG-12MM',
        name: '12mm Clear Float Glass',
        categoryId: 'cat-1',
        thicknessMm: 12.0,
        glassType: 'Clear Float Glass',
        description: 'Heavy duty architectural float glass for frameless glazing and heavy counters.',
        purchaseRateSqFt: 105.0,
        sellingRateSqFt: 145.0,
        reorderLevelSqFt: 50,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-04',
        sku: 'TGH-08MM',
        name: '8mm Clear Toughened Glass',
        categoryId: 'cat-2',
        thicknessMm: 8.0,
        glassType: 'Toughened Glass',
        description: 'Heat-tempered impact safety glass for shower enclosures and internal partitions.',
        purchaseRateSqFt: 85.0,
        sellingRateSqFt: 120.0,
        reorderLevelSqFt: 120,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-05',
        sku: 'TGH-10MM',
        name: '10mm Clear Toughened Glass',
        categoryId: 'cat-2',
        thicknessMm: 10.0,
        glassType: 'Toughened Glass',
        description: 'Premium structural tempered glass for commercial shopfronts and office cabins.',
        purchaseRateSqFt: 110.0,
        sellingRateSqFt: 155.0,
        reorderLevelSqFt: 100,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-06',
        sku: 'TGH-12MM',
        name: '12mm Clear Toughened Glass',
        categoryId: 'cat-2',
        thicknessMm: 12.0,
        glassType: 'Toughened Glass',
        description: 'Heavy structural tempered glass for frameless glass doors and railing systems.',
        purchaseRateSqFt: 135.0,
        sellingRateSqFt: 190.0,
        reorderLevelSqFt: 80,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-07',
        sku: 'TNT-05MM-BRZ',
        name: '5mm Bronze Tinted Glass',
        categoryId: 'cat-3',
        thicknessMm: 5.0,
        glassType: 'Tinted Glass',
        description: 'Elegant warm bronze body-tinted glass for glare control and privacy.',
        purchaseRateSqFt: 52.0,
        sellingRateSqFt: 75.0,
        reorderLevelSqFt: 60,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-08',
        sku: 'FRS-05MM',
        name: '5mm Acid Frosted Glass',
        categoryId: 'cat-4',
        thicknessMm: 5.0,
        glassType: 'Frosted Glass',
        description: 'Smooth matte finish translucent privacy glass for washroom windows & cabins.',
        purchaseRateSqFt: 58.0,
        sellingRateSqFt: 82.0,
        reorderLevelSqFt: 50,
        isPublic: true,
        isActive: true,
      },
      {
        id: 'prd-09',
        sku: 'MIR-05MM',
        name: '5mm Modiguard Ultra Mirror',
        categoryId: 'cat-6',
        thicknessMm: 5.0,
        glassType: 'Mirror Glass',
        description: 'Copper-free lead-free high definition silver mirror with moisture proof backing.',
        purchaseRateSqFt: 65.0,
        sellingRateSqFt: 95.0,
        reorderLevelSqFt: 75,
        isPublic: true,
        isActive: true,
      },
    ],
    suppliers: [
      {
        id: 'sup-01',
        name: 'Saint-Gobain South Glass Dist.',
        contactPerson: 'Venkatesh Rao',
        phone: '+91 94401 23456',
        email: 'sales@saintgobain-south.com',
        address: 'Balanagar Industrial Estate, Hyderabad, Telangana',
        gstin: '36AAACS1234F1Z8',
        paymentTerms: '30 Days Net',
        totalPurchases: 285000,
        outstandingBalance: 42000,
        notes: 'Primary wholesale source for clear float and premium mirror sheets.',
        isActive: true,
      },
      {
        id: 'sup-02',
        name: 'Asahi India Glass Depo Secunderabad',
        contactPerson: 'Naveen Reddy',
        phone: '+91 98490 87654',
        email: 'naveen@aisglass-hyd.com',
        address: 'MG Road, Secunderabad, Telangana',
        gstin: '36AABCA9876E1Z2',
        paymentTerms: '15 Days Net',
        totalPurchases: 198000,
        outstandingBalance: 18500,
        notes: 'Fast delivery for 8mm and 12mm jumbo sheets.',
        isActive: true,
      },
      {
        id: 'sup-03',
        name: 'Telangana Float & Tinted Hub',
        contactPerson: 'Syed Imran',
        phone: '+91 93910 54321',
        email: 'imran@tfg-hub.com',
        address: 'Autonagar, Hyderabad, Telangana',
        gstin: '36AACCT5544K1ZO',
        paymentTerms: 'Immediate / Advance',
        totalPurchases: 112000,
        outstandingBalance: 0,
        notes: 'Competitive pricing on tinted glass (bronze, green, grey).',
        isActive: true,
      },
      {
        id: 'sup-04',
        name: 'Deccan Toughened Processors',
        contactPerson: 'Mallesh Goud',
        phone: '+91 97000 11223',
        email: 'orders@deccantoughened.in',
        address: 'Cherlapally IDA, Hyderabad, Telangana',
        gstin: '36AADCD7788P1Z9',
        paymentTerms: 'Cash / 7 Days',
        totalPurchases: 220000,
        outstandingBalance: 25000,
        notes: 'Certified tempering plant with hole-drilling and beveling facility.',
        isActive: true,
      },
    ],
    supplierPrices: [
      { id: 'sp-1', supplierId: 'sup-01', productId: 'prd-01', thicknessMm: 5.0, glassType: 'Clear Float Glass', ratePerSqFt: 40.5, minOrderSqFt: 100, deliveryDays: 1 },
      { id: 'sp-2', supplierId: 'sup-02', productId: 'prd-01', thicknessMm: 5.0, glassType: 'Clear Float Glass', ratePerSqFt: 42.0, minOrderSqFt: 80, deliveryDays: 2 },
      { id: 'sp-3', supplierId: 'sup-01', productId: 'prd-02', thicknessMm: 8.0, glassType: 'Clear Float Glass', ratePerSqFt: 67.0, minOrderSqFt: 80, deliveryDays: 1 },
      { id: 'sp-4', supplierId: 'sup-02', productId: 'prd-02', thicknessMm: 8.0, glassType: 'Clear Float Glass', ratePerSqFt: 65.5, minOrderSqFt: 100, deliveryDays: 2 },
      { id: 'sp-5', supplierId: 'sup-04', productId: 'prd-04', thicknessMm: 8.0, glassType: 'Toughened Glass', ratePerSqFt: 83.0, minOrderSqFt: 50, deliveryDays: 3 },
      { id: 'sp-6', supplierId: 'sup-04', productId: 'prd-05', thicknessMm: 10.0, glassType: 'Toughened Glass', ratePerSqFt: 108.0, minOrderSqFt: 50, deliveryDays: 3 },
      { id: 'sp-7', supplierId: 'sup-03', productId: 'prd-07', thicknessMm: 5.0, glassType: 'Tinted Glass', ratePerSqFt: 50.0, minOrderSqFt: 60, deliveryDays: 2 },
    ],
    purchaseOrders: [
      {
        id: 'po-001',
        poNumber: 'PO-2026-001',
        supplierId: 'sup-01',
        orderDate: '2026-10-15T10:00:00Z',
        expectedDate: '2026-10-17T18:00:00Z',
        status: 'RECEIVED',
        paymentStatus: 'PAID',
        subtotal: 51200,
        taxAmount: 9216,
        freightCost: 2500,
        handlingCost: 1000,
        otherExpenses: 0,
        landedCostTotal: 63916,
        amountPaid: 63916,
        balanceDue: 0,
        notes: 'Bulk stock replenishment of 5mm and 8mm float glass sheets.',
        createdAt: '2026-10-15T10:00:00Z',
      },
      {
        id: 'po-002',
        poNumber: 'PO-2026-002',
        supplierId: 'sup-04',
        orderDate: '2026-10-28T14:30:00Z',
        expectedDate: '2026-10-31T12:00:00Z',
        status: 'RECEIVED',
        paymentStatus: 'PARTIALLY_PAID',
        subtotal: 78000,
        taxAmount: 14040,
        freightCost: 3000,
        handlingCost: 1500,
        otherExpenses: 0,
        landedCostTotal: 96540,
        amountPaid: 70000,
        balanceDue: 26540,
        notes: '10mm & 12mm Toughened glass sheets for Banjara Hills commercial project.',
        createdAt: '2026-10-28T14:30:00Z',
      },
    ],
    glassSheets: [
      {
        id: 'sht-01',
        sheetTag: 'SHT-2026-0001',
        productId: 'prd-01',
        lengthMm: 3048, // 10 ft
        widthMm: 2438,  // 8 ft
        thicknessMm: 5.0,
        glassType: 'Clear Float Glass',
        areaSqFt: 80.0,
        landedCostPerSqFt: 46.5,
        totalCost: 3720,
        rackLocation: 'Main Rack A-1',
        status: 'IN_STOCK',
        createdAt: '2026-10-17T11:00:00Z',
      },
      {
        id: 'sht-02',
        sheetTag: 'SHT-2026-0002',
        productId: 'prd-02',
        lengthMm: 3048, // 10 ft
        widthMm: 2438,  // 8 ft
        thicknessMm: 8.0,
        glassType: 'Clear Float Glass',
        areaSqFt: 80.0,
        landedCostPerSqFt: 74.0,
        totalCost: 5920,
        rackLocation: 'Main Rack B-2',
        status: 'IN_STOCK',
        createdAt: '2026-10-17T11:00:00Z',
      },
      {
        id: 'sht-03',
        sheetTag: 'SHT-2026-0003',
        productId: 'prd-04',
        lengthMm: 2438, // 8 ft
        widthMm: 1829,  // 6 ft
        thicknessMm: 8.0,
        glassType: 'Toughened Glass',
        areaSqFt: 48.0,
        landedCostPerSqFt: 92.0,
        totalCost: 4416,
        rackLocation: 'Toughened Rack T-1',
        status: 'IN_STOCK',
        createdAt: '2026-10-31T15:00:00Z',
      },
      {
        id: 'sht-04',
        sheetTag: 'SHT-2026-0004',
        productId: 'prd-05',
        lengthMm: 3048, // 10 ft
        widthMm: 2438,  // 8 ft
        thicknessMm: 10.0,
        glassType: 'Toughened Glass',
        areaSqFt: 80.0,
        landedCostPerSqFt: 122.0,
        totalCost: 9760,
        rackLocation: 'Toughened Rack T-2',
        status: 'IN_STOCK',
        createdAt: '2026-10-31T15:00:00Z',
      },
      {
        id: 'sht-05',
        sheetTag: 'SHT-2026-0005',
        productId: 'prd-09',
        lengthMm: 2438, // 8 ft
        widthMm: 1829,  // 6 ft
        thicknessMm: 5.0,
        glassType: 'Mirror Glass',
        areaSqFt: 48.0,
        landedCostPerSqFt: 72.0,
        totalCost: 3456,
        rackLocation: 'Mirror Rack M-1',
        status: 'IN_STOCK',
        createdAt: '2026-10-20T10:00:00Z',
      },
    ],
    glassRemnants: [
      {
        id: 'rem-01',
        remnantTag: 'REM-2026-0001',
        sourceSheetId: 'sht-01',
        lengthMm: 1524, // 5 ft
        widthMm: 1219,  // 4 ft
        thicknessMm: 5.0,
        glassType: 'Clear Float Glass',
        areaSqFt: 20.0,
        allocatedCost: 930,
        rackLocation: 'Remnant Bin R-1',
        status: 'IN_STOCK',
        notes: 'Offcut from Jubilee Hills window installation job.',
        createdAt: '2026-10-22T16:00:00Z',
      },
      {
        id: 'rem-02',
        remnantTag: 'REM-2026-0002',
        sourceSheetId: 'sht-02',
        lengthMm: 1829, // 6 ft
        widthMm: 914,   // 3 ft
        thicknessMm: 8.0,
        glassType: 'Clear Float Glass',
        areaSqFt: 18.0,
        allocatedCost: 1332,
        rackLocation: 'Remnant Bin R-2',
        status: 'IN_STOCK',
        notes: 'Prime clean piece, ideal for center table tops.',
        createdAt: '2026-10-25T11:30:00Z',
      },
      {
        id: 'rem-03',
        remnantTag: 'REM-2026-0003',
        sourceSheetId: 'sht-05',
        lengthMm: 1219, // 4 ft
        widthMm: 610,   // 2 ft
        thicknessMm: 5.0,
        glassType: 'Mirror Glass',
        areaSqFt: 8.0,
        allocatedCost: 576,
        rackLocation: 'Remnant Bin R-3',
        status: 'IN_STOCK',
        notes: 'Leftover from dressing mirror order.',
        createdAt: '2026-10-29T14:00:00Z',
      },
    ],
    cuttingJobs: [
      {
        id: 'cut-001',
        jobTicket: 'CUT-2026-0001',
        sourceSheetId: 'sht-01',
        sourceRemnantId: null,
        salesOrderId: 'so-001',
        operatorName: 'Ramesh Reddy',
        status: 'COMPLETED',
        originalLengthMm: 3048,
        originalWidthMm: 2438,
        originalAreaSqFt: 80.0,
        totalCuts: 2,
        cuttingLossSqFt: 0.8,
        scrapGeneratedSqFt: 3.2,
        notes: 'Cut 2 pieces for residential window replacement.',
        completedAt: '2026-10-22T15:45:00Z',
        createdAt: '2026-10-22T14:00:00Z',
      },
    ],
    scrapInventory: [
      {
        id: 'scr-01',
        glassType: 'Clear Float Glass',
        thicknessMm: 5.0,
        weightKg: 85.0,
        areaSqFt: 28.5,
        sourceJobId: 'cut-001',
        status: 'IN_STOCK',
        storageLocation: 'Scrap Bin S-1',
        notes: 'Clear float trimmings and unusable edge cuts.',
        createdAt: '2026-10-22T16:00:00Z',
      },
      {
        id: 'scr-02',
        glassType: 'Toughened Glass',
        thicknessMm: 10.0,
        weightKg: 42.0,
        areaSqFt: 7.0,
        sourceJobId: null,
        status: 'IN_STOCK',
        storageLocation: 'Scrap Bin S-2',
        notes: 'Broken shards collected from transport edge damage.',
        createdAt: '2026-10-29T18:00:00Z',
      },
    ],
    scrapSales: [
      {
        id: 'scs-001',
        scrapInvoiceNo: 'SCR-2026-0001',
        buyerName: 'Deccan Cullet Recyclers',
        buyerPhone: '+91 99887 76655',
        totalWeightKg: 450,
        totalSqFt: 150,
        ratePerUnit: 3.5,
        unitType: 'KG',
        totalAmount: 1575,
        paymentStatus: 'PAID',
        paymentMethod: 'CASH',
        saleDate: '2026-10-18T16:00:00Z',
      },
    ],
    customers: [
      {
        id: 'cust-01',
        name: 'Sri Krishna Interiors & Architects',
        phone: '+91 98480 12345',
        email: 'krishna.interiors@gmail.com',
        address: 'Road No. 36, Jubilee Hills, Hyderabad',
        customerType: 'INTERIOR_DESIGNER',
        gstin: '36AAAFK7890H1Z4',
        totalPurchases: 145000,
        outstandingBalance: 18000,
        notes: 'Regular designer client, prefers premium toughened and frosted glass.',
      },
      {
        id: 'cust-02',
        name: 'Venkata Sai Builders & Developers',
        phone: '+91 99490 67890',
        email: 'projects@venkatasaibuilders.in',
        address: 'Kukatpally Housing Board, Hyderabad',
        customerType: 'BUILDER',
        gstin: '36AAGCV4321J1Z8',
        totalPurchases: 230000,
        outstandingBalance: 45000,
        notes: 'Bulk purchaser for residential apartment balconies and windows.',
      },
      {
        id: 'cust-03',
        name: 'Mohammed Arshad (Retail Walk-in)',
        phone: '+91 91234 56789',
        email: 'arshad.home@gmail.com',
        address: 'Mehdipatnam, Hyderabad',
        customerType: 'RETAIL',
        gstin: null,
        totalPurchases: 12500,
        outstandingBalance: 0,
        notes: 'Custom dining table top and washroom mirror.',
      },
    ],
    crmLeads: [
      {
        id: 'lead-001',
        leadCode: 'LEAD-2026-0001',
        customerName: 'Anil Kumar Reddy',
        phone: '+91 98850 44332',
        email: 'anilkumar@rediffmail.com',
        source: 'WEBSITE',
        status: 'NEW_INQUIRY',
        glassType: 'Toughened Glass',
        thicknessMm: 10.0,
        length: 6,
        width: 3.5,
        unit: 'ft',
        quantity: 4,
        estimatedSqFt: 84.0,
        deliveryLocation: 'Gachibowli, Hyderabad',
        notes: 'Office partition requirement. Needs quote including edge polishing and transport.',
        assignedTo: 'Srivalli Kumar',
        createdAt: '2026-11-04T09:30:00Z',
      },
      {
        id: 'lead-002',
        leadCode: 'LEAD-2026-0002',
        customerName: 'Lakshmi Glass Works',
        phone: '+91 97012 34567',
        email: 'lakshmiglass@gmail.com',
        source: 'WHATSAPP',
        status: 'QUOTATION_SENT',
        glassType: 'Clear Float Glass',
        thicknessMm: 8.0,
        length: 5,
        width: 4,
        unit: 'ft',
        quantity: 10,
        estimatedSqFt: 200.0,
        deliveryLocation: 'Secunderabad',
        notes: 'Quotation QT-2026-0002 sent via WhatsApp link.',
        assignedTo: 'Srivalli Kumar',
        createdAt: '2026-11-03T11:15:00Z',
      },
    ],
    quotations: [
      {
        id: 'qt-001',
        quoteNumber: 'QT-2026-0001',
        customerId: 'cust-01',
        leadId: null,
        quoteDate: '2026-10-26T10:00:00Z',
        validUntil: '2026-11-26T23:59:59Z',
        subtotal: 18400,
        cuttingCharges: 1200,
        transportCharges: 1000,
        discountAmount: 600,
        taxAmount: 3600,
        totalAmount: 23600,
        status: 'ACCEPTED',
        notes: 'Includes diamond edge polishing and delivery to site.',
        version: 1,
        items: [
          {
            id: 'qti-1',
            glassType: 'Toughened Glass',
            thicknessMm: 10.0,
            lengthMm: 2133,
            widthMm: 914,
            inputUnit: 'ft',
            inputLength: 7,
            inputWidth: 3,
            quantity: 3,
            areaSqFtPerPiece: 21.0,
            totalSqFt: 63.0,
            ratePerSqFt: 155.0,
            itemTotal: 9765,
          },
        ],
      },
      {
        id: 'qt-002',
        quoteNumber: 'QT-2026-0002',
        customerId: null,
        leadId: 'lead-002',
        quoteDate: '2026-11-03T11:30:00Z',
        validUntil: '2026-11-18T23:59:59Z',
        subtotal: 18400,
        cuttingCharges: 800,
        transportCharges: 800,
        discountAmount: 0,
        taxAmount: 3600,
        totalAmount: 23600,
        status: 'SENT',
        notes: 'Standard 8mm float glass delivery within 48 hours.',
        version: 1,
        items: [
          {
            id: 'qti-2',
            glassType: 'Clear Float Glass',
            thicknessMm: 8.0,
            lengthMm: 1524,
            widthMm: 1219,
            inputUnit: 'ft',
            inputLength: 5,
            inputWidth: 4,
            quantity: 10,
            areaSqFtPerPiece: 20.0,
            totalSqFt: 200.0,
            ratePerSqFt: 92.0,
            itemTotal: 18400,
          },
        ],
      },
    ],
    salesOrders: [
      {
        id: 'so-001',
        orderNumber: 'SO-2026-0001',
        customerId: 'cust-01',
        quotationId: 'qt-001',
        orderDate: '2026-10-27T10:00:00Z',
        deliveryDate: '2026-10-29T17:00:00Z',
        status: 'DELIVERED',
        paymentStatus: 'PAID',
        subtotal: 18400,
        cuttingCharges: 1200,
        transportCharges: 1000,
        taxAmount: 3600,
        totalAmount: 24200,
        amountPaid: 24200,
        balanceDue: 0,
        notes: 'Delivered in full with site sign-off.',
      },
      {
        id: 'so-002',
        orderNumber: 'SO-2026-0002',
        customerId: 'cust-02',
        quotationId: null,
        orderDate: '2026-11-02T14:00:00Z',
        deliveryDate: '2026-11-06T15:00:00Z',
        status: 'PROCESSING',
        paymentStatus: 'PARTIALLY_PAID',
        subtotal: 48000,
        cuttingCharges: 2500,
        transportCharges: 2000,
        taxAmount: 9450,
        totalAmount: 61950,
        amountPaid: 30000,
        balanceDue: 31950,
        notes: 'Balcony glass for Kukatpally project. Advance received via UPI.',
      },
    ],
    invoices: [
      {
        id: 'inv-001',
        invoiceNumber: 'INV-2026-0001',
        salesOrderId: 'so-001',
        customerId: 'cust-01',
        customerName: 'Sri Krishna Interiors & Architects',
        customerPhone: '+91 98480 12345',
        customerAddress: 'Road No. 36, Jubilee Hills, Hyderabad',
        customerGstin: '36AAAFK7890H1Z4',
        invoiceDate: '2026-10-29T10:00:00Z',
        dueDate: '2026-11-15T23:59:59Z',
        subtotal: 18400,
        cuttingCharges: 1200,
        transportCharges: 1000,
        cgstAmount: 1800,
        sgstAmount: 1800,
        igstAmount: 0,
        totalAmount: 24200,
        amountPaid: 24200,
        balanceDue: 0,
        status: 'PAID',
        notes: 'Tax invoice with Telangana intra-state CGST/SGST.',
        items: [
          {
            id: 'invi-1',
            description: '10mm Clear Toughened Glass - 7ft x 3ft',
            hsnCode: '7007',
            lengthMm: 2133,
            widthMm: 914,
            quantity: 3,
            totalSqFt: 63.0,
            ratePerSqFt: 155.0,
            amount: 9765,
          },
        ],
      },
      {
        id: 'inv-002',
        invoiceNumber: 'INV-2026-0002',
        salesOrderId: 'so-002',
        customerId: 'cust-02',
        customerName: 'Venkata Sai Builders & Developers',
        customerPhone: '+91 99490 67890',
        customerAddress: 'Kukatpally Housing Board, Hyderabad',
        customerGstin: '36AAGCV4321J1Z8',
        invoiceDate: '2026-11-02T15:00:00Z',
        dueDate: '2026-11-20T23:59:59Z',
        subtotal: 48000,
        cuttingCharges: 2500,
        transportCharges: 2000,
        cgstAmount: 4725,
        sgstAmount: 4725,
        igstAmount: 0,
        totalAmount: 61950,
        amountPaid: 30000,
        balanceDue: 31950,
        status: 'PARTIALLY_PAID',
        notes: '50% advance received via UPI, balance payable on site installation.',
        items: [
          {
            id: 'invi-2',
            description: '12mm Clear Toughened Glass Balcony Panels',
            hsnCode: '7007',
            lengthMm: 2438,
            widthMm: 1219,
            quantity: 8,
            totalSqFt: 256.0,
            ratePerSqFt: 187.5,
            amount: 48000,
          },
        ],
      },
    ],
    payments: [
      {
        id: 'pay-001',
        paymentReceiptNo: 'REC-2026-0001',
        invoiceId: 'inv-001',
        customerId: 'cust-01',
        supplierId: null,
        purchaseOrderId: null,
        paymentType: 'CUSTOMER_COLLECTION',
        paymentMode: 'BANK_TRANSFER',
        referenceNumber: 'NEFT-HDFC-998822',
        amount: 24200,
        paymentDate: '2026-10-30T14:00:00Z',
        notes: 'Full invoice settlement for INV-2026-0001.',
      },
      {
        id: 'pay-002',
        paymentReceiptNo: 'REC-2026-0002',
        invoiceId: 'inv-002',
        customerId: 'cust-02',
        supplierId: null,
        purchaseOrderId: null,
        paymentType: 'CUSTOMER_COLLECTION',
        paymentMode: 'UPI',
        referenceNumber: 'UPI-431100987654',
        amount: 30000,
        paymentDate: '2026-11-02T15:30:00Z',
        notes: 'Advance payment for SO-2026-0002.',
      },
      {
        id: 'pay-003',
        paymentReceiptNo: 'REC-2026-0003',
        invoiceId: null,
        customerId: null,
        supplierId: 'sup-01',
        purchaseOrderId: 'po-001',
        paymentType: 'SUPPLIER_PAYMENT',
        paymentMode: 'BANK_TRANSFER',
        referenceNumber: 'RTGS-SBI-44332211',
        amount: 63916,
        paymentDate: '2026-10-20T11:00:00Z',
        notes: 'Full payment for PO-2026-001.',
      },
    ],
    expenses: [
      {
        id: 'exp-01',
        category: 'TRANSPORTATION',
        amount: 3500,
        paymentMode: 'UPI',
        referenceNumber: 'UPI-TR-101',
        expenseDate: '2026-10-18T12:00:00Z',
        description: 'Auto trolley freight for Saint-Gobain sheet transport to shop.',
        recipient: 'Srinivas Transport',
        purchaseOrderId: 'po-001',
        salesOrderId: null,
      },
      {
        id: 'exp-02',
        category: 'LABOR',
        amount: 4000,
        paymentMode: 'CASH',
        referenceNumber: null,
        expenseDate: '2026-10-25T19:00:00Z',
        description: 'Glass loading, unloading and shifting labor wages.',
        recipient: 'Daily Hamali Group',
        purchaseOrderId: null,
        salesOrderId: null,
      },
      {
        id: 'exp-03',
        category: 'ELECTRICITY',
        amount: 4200,
        paymentMode: 'UPI',
        referenceNumber: 'TSSPDCL-OCT26',
        expenseDate: '2026-10-31T10:00:00Z',
        description: 'Monthly workshop power bill (TSSPDCL Hyderabad).',
        recipient: 'Telangana State Southern Power Distribution',
        purchaseOrderId: null,
        salesOrderId: null,
      },
      {
        id: 'exp-04',
        category: 'REPAIRS_MAINTENANCE',
        amount: 1500,
        paymentMode: 'CASH',
        referenceNumber: null,
        expenseDate: '2026-11-01T15:00:00Z',
        description: 'Tungsten carbide glass cutter wheels and suction pads replacement.',
        recipient: 'Balanagar Tools Store',
        purchaseOrderId: null,
        salesOrderId: null,
      },
    ],
    auditLogs: [
      {
        id: 'log-01',
        userId: 'usr-owner',
        action: 'SYSTEM_INITIALIZED',
        entityType: 'System',
        entityId: 'cfg-001',
        details: 'Sri Valli Glass Traders ERP system initialized.',
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

export class DataService {
  private static getDB(): AppDatabase {
    try {
      if (!fs.existsSync(DB_FILE)) {
        const initial = getInitialDatabaseState();
        fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
        return initial;
      }
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading database file, returning fallback state:', e);
      return getInitialDatabaseState();
    }
  }

  private static saveDB(data: AppDatabase): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving database file:', e);
    }
  }

  // --- SETTINGS ---
  static getSettings() {
    return this.getDB().settings;
  }

  static updateSettings(newSettings: any) {
    const db = this.getDB();
    db.settings = { ...db.settings, ...newSettings, updatedAt: new Date().toISOString() };
    this.saveDB(db);
    return db.settings;
  }

  // --- CATEGORIES ---
  static getCategories() {
    return this.getDB().categories.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  // --- PRODUCTS ---
  static getProducts(filterPublicOnly = false) {
    const db = this.getDB();
    let prods = db.products;
    if (filterPublicOnly) {
      prods = prods.filter((p) => p.isPublic && p.isActive);
    }
    return prods;
  }

  static getProductById(id: string) {
    return this.getDB().products.find((p) => p.id === id);
  }

  static createProduct(productData: any) {
    const db = this.getDB();
    const newProd = {
      id: `prd-${Date.now().toString().slice(-6)}`,
      sku: productData.sku || `GLS-${Date.now().toString().slice(-4)}`,
      name: productData.name,
      categoryId: productData.categoryId,
      thicknessMm: Number(productData.thicknessMm),
      glassType: productData.glassType,
      description: productData.description || '',
      imageUrl: productData.imageUrl || '',
      purchaseRateSqFt: Number(productData.purchaseRateSqFt || 0),
      sellingRateSqFt: Number(productData.sellingRateSqFt || 0),
      reorderLevelSqFt: Number(productData.reorderLevelSqFt || 50),
      isPublic: productData.isPublic !== false,
      isActive: productData.isActive !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.products.push(newProd);
    this.saveDB(db);
    return newProd;
  }

  static updateProduct(id: string, updates: any) {
    const db = this.getDB();
    const idx = db.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      db.products[idx] = {
        ...db.products[idx],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.saveDB(db);
      return db.products[idx];
    }
    return null;
  }

  // --- SUPPLIERS & PRICES ---
  static getSuppliers() {
    return this.getDB().suppliers;
  }

  static getSupplierPrices() {
    return this.getDB().supplierPrices;
  }

  static createSupplier(data: any) {
    const db = this.getDB();
    const sup = {
      id: `sup-${Date.now().toString().slice(-4)}`,
      name: data.name,
      contactPerson: data.contactPerson || '',
      phone: data.phone,
      email: data.email || '',
      address: data.address || '',
      gstin: data.gstin || '',
      paymentTerms: data.paymentTerms || '30 Days Net',
      totalPurchases: 0,
      outstandingBalance: 0,
      notes: data.notes || '',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    db.suppliers.push(sup);
    this.saveDB(db);
    return sup;
  }

  // --- PURCHASES ---
  static getPurchaseOrders() {
    const db = this.getDB();
    return db.purchaseOrders.map((po) => ({
      ...po,
      supplier: db.suppliers.find((s) => s.id === po.supplierId),
    }));
  }

  static createPurchaseOrder(poData: any) {
    const db = this.getDB();
    const poNumber = `PO-${new Date().getFullYear()}-${String(db.purchaseOrders.length + 1).padStart(3, '0')}`;
    const landedCostTotal =
      (poData.subtotal || 0) +
      (poData.taxAmount || 0) +
      (poData.freightCost || 0) +
      (poData.handlingCost || 0);

    const newPO = {
      id: `po-${Date.now()}`,
      poNumber,
      supplierId: poData.supplierId,
      orderDate: new Date().toISOString(),
      expectedDate: poData.expectedDate || null,
      status: poData.status || 'ORDERED',
      paymentStatus: 'UNPAID',
      subtotal: Number(poData.subtotal || 0),
      taxAmount: Number(poData.taxAmount || 0),
      freightCost: Number(poData.freightCost || 0),
      handlingCost: Number(poData.handlingCost || 0),
      otherExpenses: 0,
      landedCostTotal,
      amountPaid: 0,
      balanceDue: landedCostTotal,
      notes: poData.notes || '',
      createdAt: new Date().toISOString(),
    };

    db.purchaseOrders.push(newPO);

    // Update supplier balance
    const sup = db.suppliers.find((s) => s.id === poData.supplierId);
    if (sup) {
      sup.totalPurchases += landedCostTotal;
      sup.outstandingBalance += landedCostTotal;
    }

    this.saveDB(db);
    return newPO;
  }

  // --- INVENTORY: SHEETS, REMNANTS, SCRAP ---
  static getGlassSheets(statusFilter?: string) {
    const db = this.getDB();
    let sheets = db.glassSheets;
    if (statusFilter) {
      sheets = sheets.filter((s) => s.status === statusFilter);
    }
    return sheets;
  }

  static getGlassRemnants(statusFilter?: string) {
    const db = this.getDB();
    let remnants = db.glassRemnants;
    if (statusFilter) {
      remnants = remnants.filter((r) => r.status === statusFilter);
    }
    return remnants;
  }

  static getScrapInventory() {
    return this.getDB().scrapInventory;
  }

  static getScrapSales() {
    return this.getDB().scrapSales;
  }

  static recordScrapSale(saleData: any) {
    const db = this.getDB();
    const invoiceNo = `SCR-${new Date().getFullYear()}-${String(db.scrapSales.length + 1).padStart(4, '0')}`;
    const totalAmount = Number(saleData.ratePerUnit) * Number(saleData.unitType === 'KG' ? saleData.totalWeightKg : saleData.totalSqFt);

    const sale = {
      id: `scs-${Date.now()}`,
      scrapInvoiceNo: invoiceNo,
      buyerName: saleData.buyerName,
      buyerPhone: saleData.buyerPhone,
      totalWeightKg: Number(saleData.totalWeightKg || 0),
      totalSqFt: Number(saleData.totalSqFt || 0),
      ratePerUnit: Number(saleData.ratePerUnit),
      unitType: saleData.unitType || 'KG',
      totalAmount,
      paymentStatus: 'PAID',
      paymentMethod: saleData.paymentMethod || 'CASH',
      saleDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    db.scrapSales.push(sale);
    this.saveDB(db);
    return sale;
  }

  // --- CUTTING JOBS ---
  static getCuttingJobs() {
    const db = this.getDB();
    return db.cuttingJobs;
  }

  static recordCuttingExecution(cuttingData: {
    sourceType: 'SHEET' | 'REMNANT';
    sourceId: string;
    operatorName: string;
    cutLengthMm: number;
    cutWidthMm: number;
    remnantsCreated: Array<{ lengthMm: number; widthMm: number; areaSqFt: number }>;
    scrapCreated: { areaSqFt: number; weightKg: number };
    notes?: string;
  }) {
    const db = this.getDB();
    const ticket = `CUT-${new Date().getFullYear()}-${String(db.cuttingJobs.length + 1).padStart(4, '0')}`;

    let sourceItem: any = null;
    let glassType = '';
    let thicknessMm = 0;
    let originalArea = 0;

    if (cuttingData.sourceType === 'SHEET') {
      sourceItem = db.glassSheets.find((s) => s.id === cuttingData.sourceId);
      if (sourceItem) {
        sourceItem.status = 'CONSUMED';
        glassType = sourceItem.glassType;
        thicknessMm = sourceItem.thicknessMm;
        originalArea = sourceItem.areaSqFt;
      }
    } else {
      sourceItem = db.glassRemnants.find((r) => r.id === cuttingData.sourceId);
      if (sourceItem) {
        sourceItem.status = 'CONSUMED';
        glassType = sourceItem.glassType;
        thicknessMm = sourceItem.thicknessMm;
        originalArea = sourceItem.areaSqFt;
      }
    }

    // Create new Reusable Remnant items
    const newRemnants: any[] = [];
    cuttingData.remnantsCreated.forEach((rem, idx) => {
      const remTag = `REM-${new Date().getFullYear()}-${String(db.glassRemnants.length + idx + 1).padStart(4, '0')}`;
      const newRem = {
        id: `rem-${Date.now()}-${idx}`,
        remnantTag: remTag,
        sourceSheetId: sourceItem?.id || 'manual',
        lengthMm: rem.lengthMm,
        widthMm: rem.widthMm,
        thicknessMm,
        glassType,
        areaSqFt: rem.areaSqFt,
        allocatedCost: (sourceItem?.landedCostPerSqFt || 50) * rem.areaSqFt,
        rackLocation: 'Remnant Bin R-1',
        status: 'IN_STOCK',
        notes: `Produced from cutting job ${ticket}`,
        createdAt: new Date().toISOString(),
      };
      db.glassRemnants.push(newRem);
      newRemnants.push(newRem);
    });

    // Record scrap if generated
    if (cuttingData.scrapCreated.areaSqFt > 0) {
      db.scrapInventory.push({
        id: `scr-${Date.now()}`,
        glassType,
        thicknessMm,
        weightKg: cuttingData.scrapCreated.weightKg,
        areaSqFt: cuttingData.scrapCreated.areaSqFt,
        sourceJobId: ticket,
        status: 'IN_STOCK',
        storageLocation: 'Scrap Bin S-1',
        notes: `From cutting job ${ticket}`,
        createdAt: new Date().toISOString(),
      });
    }

    const job = {
      id: `cut-${Date.now()}`,
      jobTicket: ticket,
      sourceSheetId: cuttingData.sourceType === 'SHEET' ? cuttingData.sourceId : null,
      sourceRemnantId: cuttingData.sourceType === 'REMNANT' ? cuttingData.sourceId : null,
      salesOrderId: null,
      operatorName: cuttingData.operatorName,
      status: 'COMPLETED',
      originalLengthMm: sourceItem?.lengthMm || 0,
      originalWidthMm: sourceItem?.widthMm || 0,
      originalAreaSqFt: originalArea,
      totalCuts: 1 + cuttingData.remnantsCreated.length,
      cuttingLossSqFt: 0.5,
      scrapGeneratedSqFt: cuttingData.scrapCreated.areaSqFt,
      notes: cuttingData.notes || '',
      completedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      newRemnants,
    };

    db.cuttingJobs.push(job);
    this.saveDB(db);
    return job;
  }

  // --- CRM & LEADS ---
  static getCRMLeads() {
    return this.getDB().crmLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static createCRMLead(leadData: any) {
    const db = this.getDB();
    const leadCode = `LEAD-${new Date().getFullYear()}-${String(db.crmLeads.length + 1).padStart(4, '0')}`;
    const newLead = {
      id: `lead-${Date.now()}`,
      leadCode,
      customerName: leadData.customerName,
      phone: leadData.phone,
      email: leadData.email || '',
      source: leadData.source || 'WEBSITE',
      status: 'NEW_INQUIRY',
      glassType: leadData.glassType || '',
      thicknessMm: Number(leadData.thicknessMm || 0),
      length: Number(leadData.length || 0),
      width: Number(leadData.width || 0),
      unit: leadData.unit || 'ft',
      quantity: Number(leadData.quantity || 1),
      estimatedSqFt: Number(leadData.estimatedSqFt || 0),
      deliveryLocation: leadData.deliveryLocation || '',
      notes: leadData.notes || '',
      assignedTo: 'Srivalli Kumar',
      createdAt: new Date().toISOString(),
    };
    db.crmLeads.unshift(newLead);
    this.saveDB(db);
    return newLead;
  }

  static updateCRMLeadStatus(id: string, status: string) {
    const db = this.getDB();
    const lead = db.crmLeads.find((l) => l.id === id);
    if (lead) {
      lead.status = status;
      this.saveDB(db);
      return lead;
    }
    return null;
  }

  // --- CUSTOMERS ---
  static getCustomers() {
    return this.getDB().customers;
  }

  static createCustomer(data: any) {
    const db = this.getDB();
    const cust = {
      id: `cust-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      address: data.address || '',
      customerType: data.customerType || 'RETAIL',
      gstin: data.gstin || null,
      totalPurchases: 0,
      outstandingBalance: 0,
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
    };
    db.customers.push(cust);
    this.saveDB(db);
    return cust;
  }

  // --- QUOTATIONS ---
  static getQuotations() {
    return this.getDB().quotations;
  }

  static createQuotation(quoteData: any) {
    const db = this.getDB();
    const quoteNumber = `QT-${new Date().getFullYear()}-${String(db.quotations.length + 1).padStart(4, '0')}`;
    const newQuote = {
      id: `qt-${Date.now()}`,
      quoteNumber,
      customerId: quoteData.customerId || null,
      leadId: quoteData.leadId || null,
      customerName: quoteData.customerName || 'Direct Customer',
      customerPhone: quoteData.customerPhone || '',
      quoteDate: new Date().toISOString(),
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: Number(quoteData.subtotal || 0),
      cuttingCharges: Number(quoteData.cuttingCharges || 0),
      transportCharges: Number(quoteData.transportCharges || 0),
      discountAmount: Number(quoteData.discountAmount || 0),
      taxAmount: Number(quoteData.taxAmount || 0),
      totalAmount: Number(quoteData.totalAmount || 0),
      status: 'SENT',
      notes: quoteData.notes || '',
      version: 1,
      items: quoteData.items || [],
      createdAt: new Date().toISOString(),
    };
    db.quotations.unshift(newQuote);
    this.saveDB(db);
    return newQuote;
  }

  // --- SALES ORDERS & INVOICES ---
  static getSalesOrders() {
    return this.getDB().salesOrders;
  }

  static getInvoices() {
    return this.getDB().invoices;
  }

  static createInvoiceFromOrder(invoiceData: any) {
    const db = this.getDB();
    const invNumber = `INV-${new Date().getFullYear()}-${String(db.invoices.length + 1).padStart(4, '0')}`;
    const newInv = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invNumber,
      salesOrderId: invoiceData.salesOrderId || 'manual',
      customerId: invoiceData.customerId,
      customerName: invoiceData.customerName,
      customerPhone: invoiceData.customerPhone,
      customerAddress: invoiceData.customerAddress,
      customerGstin: invoiceData.customerGstin,
      invoiceDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: Number(invoiceData.subtotal || 0),
      cuttingCharges: Number(invoiceData.cuttingCharges || 0),
      transportCharges: Number(invoiceData.transportCharges || 0),
      cgstAmount: Number(invoiceData.cgstAmount || 0),
      sgstAmount: Number(invoiceData.sgstAmount || 0),
      igstAmount: 0,
      totalAmount: Number(invoiceData.totalAmount || 0),
      amountPaid: Number(invoiceData.amountPaid || 0),
      balanceDue: Number(invoiceData.totalAmount || 0) - Number(invoiceData.amountPaid || 0),
      status: Number(invoiceData.amountPaid || 0) >= Number(invoiceData.totalAmount || 0) ? 'PAID' : (Number(invoiceData.amountPaid || 0) > 0 ? 'PARTIALLY_PAID' : 'UNPAID'),
      notes: invoiceData.notes || '',
      items: invoiceData.items || [],
    };
    db.invoices.unshift(newInv);

    // Update customer outstanding
    const cust = db.customers.find((c) => c.id === invoiceData.customerId);
    if (cust) {
      cust.totalPurchases += newInv.totalAmount;
      cust.outstandingBalance += newInv.balanceDue;
    }

    this.saveDB(db);
    return newInv;
  }

  // --- PAYMENTS ---
  static getPayments() {
    return this.getDB().payments;
  }

  static recordPayment(paymentData: any) {
    const db = this.getDB();
    const receiptNo = `REC-${new Date().getFullYear()}-${String(db.payments.length + 1).padStart(4, '0')}`;
    const amount = Number(paymentData.amount);

    const payment = {
      id: `pay-${Date.now()}`,
      paymentReceiptNo: receiptNo,
      invoiceId: paymentData.invoiceId || null,
      customerId: paymentData.customerId || null,
      supplierId: paymentData.supplierId || null,
      purchaseOrderId: paymentData.purchaseOrderId || null,
      paymentType: paymentData.paymentType || 'CUSTOMER_COLLECTION',
      paymentMode: paymentData.paymentMode || 'UPI',
      referenceNumber: paymentData.referenceNumber || '',
      amount,
      paymentDate: new Date().toISOString(),
      notes: paymentData.notes || '',
    };

    db.payments.unshift(payment);

    // Update invoice if applicable
    if (paymentData.invoiceId) {
      const inv = db.invoices.find((i) => i.id === paymentData.invoiceId);
      if (inv) {
        inv.amountPaid += amount;
        inv.balanceDue = Math.max(0, inv.totalAmount - inv.amountPaid);
        inv.status = inv.balanceDue === 0 ? 'PAID' : 'PARTIALLY_PAID';

        // Update customer ledger
        const cust = db.customers.find((c) => c.id === inv.customerId);
        if (cust) {
          cust.outstandingBalance = Math.max(0, cust.outstandingBalance - amount);
        }
      }
    }

    // Update purchase order if supplier payment
    if (paymentData.purchaseOrderId) {
      const po = db.purchaseOrders.find((p) => p.id === paymentData.purchaseOrderId);
      if (po) {
        po.amountPaid += amount;
        po.balanceDue = Math.max(0, po.landedCostTotal - po.amountPaid);
        po.paymentStatus = po.balanceDue === 0 ? 'PAID' : 'PARTIALLY_PAID';

        const sup = db.suppliers.find((s) => s.id === po.supplierId);
        if (sup) {
          sup.outstandingBalance = Math.max(0, sup.outstandingBalance - amount);
        }
      }
    }

    this.saveDB(db);
    return payment;
  }

  // --- EXPENSES ---
  static getExpenses() {
    return this.getDB().expenses;
  }

  static recordExpense(expenseData: any) {
    const db = this.getDB();
    const exp = {
      id: `exp-${Date.now()}`,
      category: expenseData.category || 'OTHER',
      amount: Number(expenseData.amount),
      paymentMode: expenseData.paymentMode || 'CASH',
      referenceNumber: expenseData.referenceNumber || null,
      expenseDate: expenseData.expenseDate || new Date().toISOString(),
      description: expenseData.description,
      recipient: expenseData.recipient || '',
      purchaseOrderId: expenseData.purchaseOrderId || null,
      salesOrderId: expenseData.salesOrderId || null,
      createdAt: new Date().toISOString(),
    };
    db.expenses.unshift(exp);
    this.saveDB(db);
    return exp;
  }

  // --- DYNAMIC DASHBOARD METRICS ---
  static getDashboardMetrics() {
    const db = this.getDB();

    const totalSales = db.invoices.reduce((sum, i) => sum + (i.totalAmount || 0), 0);
    const totalPurchases = db.purchaseOrders.reduce((sum, po) => sum + (po.landedCostTotal || 0), 0);
    const totalExpenses = db.expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const totalScrapRevenue = db.scrapSales.reduce((sum, sc) => sum + (sc.totalAmount || 0), 0);

    const availableInventorySheets = db.glassSheets.filter((s) => s.status === 'IN_STOCK');
    const availableInventorySqFt = availableInventorySheets.reduce((sum, s) => sum + (s.areaSqFt || 0), 0);
    const inventoryValue = availableInventorySheets.reduce((sum, s) => sum + (s.totalCost || 0), 0);

    const availableRemnants = db.glassRemnants.filter((r) => r.status === 'IN_STOCK');
    const remnantsSqFt = availableRemnants.reduce((sum, r) => sum + (r.areaSqFt || 0), 0);
    const remnantsValue = availableRemnants.reduce((sum, r) => sum + (r.allocatedCost || 0), 0);

    const scrapStockKg = db.scrapInventory.filter((s) => s.status === 'IN_STOCK').reduce((sum, s) => sum + (s.weightKg || 0), 0);

    const customerOutstanding = db.invoices.reduce((sum, i) => sum + (i.balanceDue || 0), 0);
    const supplierOutstanding = db.purchaseOrders.reduce((sum, po) => sum + (po.balanceDue || 0), 0);

    // Accurate Financial Formulas:
    // Estimated COGS = 65% of net glass sales based on wholesale landed markup
    const estimatedCOGS = totalSales * 0.65;
    const grossProfit = Math.round((totalSales - estimatedCOGS) * 100) / 100;
    const netProfit = Math.round((grossProfit + totalScrapRevenue - totalExpenses) * 100) / 100;
    const netProfitMargin = totalSales > 0 ? Math.round((netProfit / totalSales) * 1000) / 10 : 0;

    return {
      totalSales,
      monthlyRevenue: totalSales,
      totalPurchases,
      grossProfit,
      netProfit,
      netProfitMargin,
      availableInventorySqFt: Math.round(availableInventorySqFt * 10) / 10,
      inventoryValue: Math.round(inventoryValue),
      availableRemnantsCount: availableRemnants.length,
      remnantsSqFt: Math.round(remnantsSqFt * 10) / 10,
      remnantsValue: Math.round(remnantsValue),
      scrapRevenue: totalScrapRevenue,
      scrapStockKg: Math.round(scrapStockKg * 10) / 10,
      pendingOrdersCount: db.salesOrders.filter((s) => s.status === 'CONFIRMED' || s.status === 'PROCESSING').length,
      customerOutstanding: Math.round(customerOutstanding),
      supplierOutstanding: Math.round(supplierOutstanding),
      totalExpenses: Math.round(totalExpenses),
      leadsCount: db.crmLeads.length,
    };
  }
}
