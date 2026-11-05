import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'metrics';
    const format = searchParams.get('format') || 'json';

    if (type === 'metrics') {
      const metrics = DataService.getDashboardMetrics();
      return NextResponse.json({ metrics });
    }

    if (type === 'sales') {
      const invoices = DataService.getInvoices();
      if (format === 'csv') {
        const headers = 'InvoiceNumber,CustomerName,Date,Subtotal,Tax,TotalAmount,Paid,BalanceDue,Status\n';
        const rows = invoices
          .map(
            (i) =>
              `"${i.invoiceNumber}","${i.customerName}","${i.invoiceDate?.slice(0, 10)}",${i.subtotal},${i.cgstAmount + i.sgstAmount},${i.totalAmount},${i.amountPaid},${i.balanceDue},"${i.status}"`
          )
          .join('\n');
        return new NextResponse(headers + rows, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="srivalli_sales_report.csv"',
          },
        });
      }
      return NextResponse.json({ invoices });
    }

    if (type === 'inventory') {
      const sheets = DataService.getGlassSheets();
      if (format === 'csv') {
        const headers = 'SheetTag,GlassType,ThicknessMm,LengthMm,WidthMm,AreaSqFt,LandedCostPerSqFt,TotalCost,RackLocation,Status\n';
        const rows = sheets
          .map(
            (s) =>
              `"${s.sheetTag}","${s.glassType}",${s.thicknessMm},${s.lengthMm},${s.widthMm},${s.areaSqFt},${s.landedCostPerSqFt},${s.totalCost},"${s.rackLocation}","${s.status}"`
          )
          .join('\n');
        return new NextResponse(headers + rows, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="srivalli_sheet_inventory.csv"',
          },
        });
      }
      return NextResponse.json({ sheets });
    }

    if (type === 'remnants') {
      const remnants = DataService.getGlassRemnants();
      if (format === 'csv') {
        const headers = 'RemnantTag,SourceSheetId,GlassType,ThicknessMm,LengthMm,WidthMm,AreaSqFt,AllocatedCost,RackLocation,Status\n';
        const rows = remnants
          .map(
            (r) =>
              `"${r.remnantTag}","${r.sourceSheetId}","${r.glassType}",${r.thicknessMm},${r.lengthMm},${r.widthMm},${r.areaSqFt},${r.allocatedCost},"${r.rackLocation}","${r.status}"`
          )
          .join('\n');
        return new NextResponse(headers + rows, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="srivalli_reusable_remnants.csv"',
          },
        });
      }
      return NextResponse.json({ remnants });
    }

    return NextResponse.json({ error: 'Unknown report type' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error generating report' }, { status: 500 });
  }
}
