import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publicOnly = searchParams.get('publicOnly') === 'true';
  const products = DataService.getProducts(publicOnly);
  const categories = DataService.getCategories();
  return NextResponse.json({ products, categories });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = DataService.createProduct(body);
    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating product' }, { status: 500 });
  }
}

