import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';
import { evaluateCuttingFeasibility } from '@/lib/cutting-engine';
import { convertToMm } from '@/lib/calculator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'evaluate') {
      const {
        sheetId,
        isRemnant,
        cutLength,
        cutWidth,
        cutUnit = 'mm',
        thicknessMm,
        glassType,
        allowRotation = true,
      } = body;

      const sheets = DataService.getGlassSheets();
      const remnants = DataService.getGlassRemnants();

      let target: any = null;
      if (isRemnant) {
        target = remnants.find((r) => r.id === sheetId);
      } else {
        target = sheets.find((s) => s.id === sheetId);
      }

      if (!target) {
        return NextResponse.json({ error: 'Selected sheet or remnant not found' }, { status: 404 });
      }

      const cutLMm = Math.round(convertToMm(Number(cutLength), cutUnit));
      const cutWMm = Math.round(convertToMm(Number(cutWidth), cutUnit));

      const evaluation = evaluateCuttingFeasibility(
        {
          id: target.id,
          tag: isRemnant ? target.remnantTag : target.sheetTag,
          lengthMm: target.lengthMm,
          widthMm: target.widthMm,
          thicknessMm: target.thicknessMm,
          glassType: target.glassType,
          isRemnant: !!isRemnant,
        },
        {
          lengthMm: cutLMm,
          widthMm: cutWMm,
          thicknessMm: Number(thicknessMm || target.thicknessMm),
          glassType: glassType || target.glassType,
          allowRotation,
        }
      );

      return NextResponse.json({ success: true, evaluation, target });
    }

    if (action === 'execute') {
      const {
        sourceType,
        sourceId,
        operatorName,
        cutLengthMm,
        cutWidthMm,
        remnantsCreated,
        scrapCreated,
        notes,
      } = body;

      const job = DataService.recordCuttingExecution({
        sourceType: sourceType || 'SHEET',
        sourceId,
        operatorName: operatorName || 'Ramesh Reddy',
        cutLengthMm: Number(cutLengthMm),
        cutWidthMm: Number(cutWidthMm),
        remnantsCreated: remnantsCreated || [],
        scrapCreated: scrapCreated || { areaSqFt: 0, weightKg: 0 },
        notes,
      });

      return NextResponse.json({ success: true, job });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing cutting job' }, { status: 500 });
  }
}

export async function GET() {
  const jobs = DataService.getCuttingJobs();
  return NextResponse.json({ jobs });
}
