import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';
import { calculateSquareFootage } from '@/lib/calculator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      glassType,
      thicknessMm,
      length,
      width,
      unit = 'ft',
      quantity = 1,
      deliveryLocation,
      notes,
    } = body;

    if (!customerName || !phone || !glassType || !length || !width) {
      return NextResponse.json(
        { error: 'Please provide Customer Name, Phone, Glass Type, Length, and Width' },
        { status: 400 }
      );
    }

    const numL = Number(length);
    const numW = Number(width);
    const numQty = Number(quantity) || 1;

    const areaPerPiece = calculateSquareFootage(numL, numW, unit as any);
    const totalSqFt = Math.round(areaPerPiece * numQty * 100) / 100;

    const lead = DataService.createCRMLead({
      customerName,
      phone,
      email,
      source: 'WEBSITE',
      glassType,
      thicknessMm: Number(thicknessMm) || 5,
      length: numL,
      width: numW,
      unit,
      quantity: numQty,
      estimatedSqFt: totalSqFt,
      deliveryLocation,
      notes,
    });

    return NextResponse.json({
      success: true,
      referenceNumber: lead.leadCode,
      estimatedSqFt: totalSqFt,
      message: 'Quotation inquiry received successfully. Our sales team will connect via WhatsApp/Call within 2 working hours.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing request' }, { status: 500 });
  }
}

export async function GET() {
  const leads = DataService.getCRMLeads();
  return NextResponse.json({ leads });
}

