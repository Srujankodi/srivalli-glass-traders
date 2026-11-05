import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET() {
  const quotations = DataService.getQuotations();
  return NextResponse.json({ quotations });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const quotation = DataService.createQuotation(body);
    return NextResponse.json({ success: true, quotation });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating quotation' }, { status: 500 });
  }
}
