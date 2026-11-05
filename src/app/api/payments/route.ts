import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET() {
  const payments = DataService.getPayments();
  return NextResponse.json({ payments });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payment = DataService.recordPayment(body);
    return NextResponse.json({ success: true, payment });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error recording payment' }, { status: 500 });
  }
}
