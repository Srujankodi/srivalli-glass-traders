import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET() {
  const suppliers = DataService.getSuppliers();
  const prices = DataService.getSupplierPrices();
  const products = DataService.getProducts();

  // Compute price comparisons by product
  const comparisonByProduct = products.map((prod) => {
    const matchingPrices = prices.filter((sp) => sp.productId === prod.id);
    const enriched = matchingPrices.map((sp) => {
      const sup = suppliers.find((s) => s.id === sp.supplierId);
      return {
        supplierId: sp.supplierId,
        supplierName: sup?.name || 'Unknown',
        ratePerSqFt: sp.ratePerSqFt,
        minOrderSqFt: sp.minOrderSqFt,
        deliveryDays: sp.deliveryDays,
      };
    });

    enriched.sort((a, b) => a.ratePerSqFt - b.ratePerSqFt);

    return {
      product: prod,
      bestPrice: enriched[0] || null,
      offers: enriched,
    };
  });

  return NextResponse.json({
    suppliers,
    prices,
    comparisonByProduct,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supplier = DataService.createSupplier(body);
    return NextResponse.json({ success: true, supplier });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating supplier' }, { status: 500 });
  }
}

