const test = require('node:test');
const assert = require('node:assert');

test('9. Workflow A: Landed Cost Allocation per sq ft', () => {
  // PO of 10 sheets of 10ft x 8ft = 800 sq ft
  const purchaseSubtotal = 40000;
  const gstTax = 7200; // 18%
  const freight = 2500;
  const hamaliUnloading = 1500;
  const totalSqFt = 800;

  const totalLandedCost = purchaseSubtotal + gstTax + freight + hamaliUnloading;
  const landedRatePerSqFt = totalLandedCost / totalSqFt;

  assert.strictEqual(totalLandedCost, 51200);
  assert.strictEqual(landedRatePerSqFt, 64);
});

test('10. Workflow B: Supplier Price Comparison Matrix', () => {
  const supplierOffers = [
    { supplier: 'Supplier A', ratePerSqFt: 68.0, deliveryDays: 2 },
    { supplier: 'Supplier B', ratePerSqFt: 65.5, deliveryDays: 3 }, // Most economical
    { supplier: 'Supplier C', ratePerSqFt: 71.0, deliveryDays: 1 },
  ];

  supplierOffers.sort((a, b) => a.ratePerSqFt - b.ratePerSqFt);
  assert.strictEqual(supplierOffers[0].supplier, 'Supplier B');
  assert.strictEqual(supplierOffers[0].ratePerSqFt, 65.5);
});

test('11. Workflow C: Partial payment and balance reconciliation', () => {
  const invoice = {
    invoiceNumber: 'INV-2026-0002',
    totalAmount: 61950,
    amountPaid: 0,
    balanceDue: 61950,
    status: 'UNPAID',
  };

  // Customer pays ₹30,000 advance
  const advancePayment = 30000;
  invoice.amountPaid += advancePayment;
  invoice.balanceDue = invoice.totalAmount - invoice.amountPaid;
  invoice.status = invoice.balanceDue === 0 ? 'PAID' : 'PARTIALLY_PAID';

  assert.strictEqual(invoice.amountPaid, 30000);
  assert.strictEqual(invoice.balanceDue, 31950);
  assert.strictEqual(invoice.status, 'PARTIALLY_PAID');

  // Customer settles final balance of ₹31,950
  invoice.amountPaid += 31950;
  invoice.balanceDue = invoice.totalAmount - invoice.amountPaid;
  invoice.status = invoice.balanceDue === 0 ? 'PAID' : 'PARTIALLY_PAID';

  assert.strictEqual(invoice.amountPaid, 61950);
  assert.strictEqual(invoice.balanceDue, 0);
  assert.strictEqual(invoice.status, 'PAID');
});

test('12. Workflow D: Scrap sale recovery and revenue aggregation', () => {
  const scrapBins = [
    { type: 'Float Glass', weightKg: 100 },
    { type: 'Toughened Glass', weightKg: 50 },
  ];

  const ratePerKg = 3.5;
  const soldWeightKg = 120;
  const saleRevenue = soldWeightKg * ratePerKg;

  assert.strictEqual(saleRevenue, 420);
});

test('13. Workflow E: Financial Engine (Gross and Net Profit formulas)', () => {
  const totalSalesRevenue = 150000;
  const materialCOGS = 97500; // 65% wholesale landed cost
  const grossProfit = totalSalesRevenue - materialCOGS;

  const operatingExpenses = 15000; // Transport, hamali, power
  const scrapRecovery = 2500;      // Extra recovery from cullet

  const netProfit = grossProfit + scrapRecovery - operatingExpenses;
  const netProfitMargin = (netProfit / totalSalesRevenue) * 100;

  assert.strictEqual(grossProfit, 52500);
  assert.strictEqual(netProfit, 40000);
  assert.strictEqual(Math.round(netProfitMargin * 10) / 10, 26.7);
});
