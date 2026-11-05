import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET() {
  const invoices = DataService.getInvoices();
  return NextResponse.json({ invoices });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const invoice = DataService.createInvoiceFromOrder(body);
    return NextResponse.json({ success: true, invoice });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating invoice' }, { status: 500 });
  }
}

