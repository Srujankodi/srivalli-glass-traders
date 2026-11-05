import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';
import { findOptimalStockMatch } from '@/lib/remnant-matcher';
import { convertToMm } from '@/lib/calculator';

export async function GET() {
  const sheets = DataService.getGlassSheets();
  const remnants = DataService.getGlassRemnants();
  const scrap = DataService.getScrapInventory();
  const scrapSales = DataService.getScrapSales();

  return NextResponse.json({
    sheets,
    remnants,
    scrap,
    scrapSales,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'match') {
      const { length, width, unit = 'ft', thicknessMm, glassType } = body;
      const lengthMm = Math.round(convertToMm(Number(length), unit));
      const widthMm = Math.round(convertToMm(Number(width), unit));

      const remnants = DataService.getGlassRemnants();
      const sheets = DataService.getGlassSheets();

      const matches = findOptimalStockMatch(
        {
          lengthMm,
          widthMm,
          thicknessMm: Number(thicknessMm),
          glassType,
        },
        remnants,
        sheets
      );

      return NextResponse.json({ success: true, matches });
    }

    if (action === 'scrap-sale') {
      const sale = DataService.recordScrapSale(body);
      return NextResponse.json({ success: true, sale });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing inventory request' }, { status: 500 });
  }
}

