'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Scissors,
  Layers,
  Ruler,
  CheckCircle2,
  AlertTriangle,
  Boxes,
  Repeat,
  Trash2,
  RefreshCw,
  Send,
  Sparkles,
} from 'lucide-react';
import { formatINR } from '@/lib/calculator';

function GlassCuttingContent() {
  const searchParams = useSearchParams();
  const initL = searchParams.get('length') || '1829'; // 6ft in mm
  const initW = searchParams.get('width') || '1219';  // 4ft in mm
  const initThick = searchParams.get('thickness') || '5';
  const initType = searchParams.get('type') || 'Clear Float Glass';

  const [inventorySheets, setInventorySheets] = useState<any[]>([]);
  const [inventoryRemnants, setInventoryRemnants] = useState<any[]>([]);
  const [selectedSourceType, setSelectedSourceType] = useState<'SHEET' | 'REMNANT'>('SHEET');
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');

  const [cutLengthMm, setCutLengthMm] = useState(initL);
  const [cutWidthMm, setCutWidthMm] = useState(initW);
  const [thicknessMm, setThicknessMm] = useState(initThick);
  const [glassType, setGlassType] = useState(initType);
  const [allowRotation, setAllowRotation] = useState(true);
  const [operatorName, setOperatorName] = useState('Ramesh Reddy');

  const [evaluation, setEvaluation] = useState<any>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [executionSuccess, setExecutionSuccess] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const res = await fetch('/api/inventory');
      const data = await res.json();
      setInventorySheets(data.sheets || []);
      setInventoryRemnants(data.remnants || []);

      if (data.sheets && data.sheets.length > 0 && !selectedSourceId) {
        setSelectedSourceId(data.sheets[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!selectedSourceId) return;
    evaluateCut();
  }, [selectedSourceId, selectedSourceType, cutLengthMm, cutWidthMm, allowRotation, thicknessMm, glassType]);

  const evaluateCut = async () => {
    if (!selectedSourceId || !cutLengthMm || !cutWidthMm) return;
    setEvaluating(true);
    setError(null);
    setExecutionSuccess(null);

    try {
      const res = await fetch('/api/cutting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          sheetId: selectedSourceId,
          isRemnant: selectedSourceType === 'REMNANT',
          cutLength: Number(cutLengthMm),
          cutWidth: Number(cutWidthMm),
          cutUnit: 'mm',
          thicknessMm: Number(thicknessMm),
          glassType,
          allowRotation,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Evaluation failed');
      }
      setEvaluation(data.evaluation);
    } catch (err: any) {
      setError(err.message);
      setEvaluation(null);
    } finally {
      setEvaluating(false);
    }
  };

  const handleExecuteCut = async () => {
    if (!evaluation || !evaluation.feasible) return;
    setExecuting(true);
    setError(null);

    try {
      const res = await fetch('/api/cutting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'execute',
          sourceType: selectedSourceType,
          sourceId: selectedSourceId,
          operatorName,
          cutLengthMm: evaluation.customerCut.lengthMm,
          cutWidthMm: evaluation.customerCut.widthMm,
          remnantsCreated: evaluation.remnants,
          scrapCreated: {
            areaSqFt: evaluation.totalScrapAreaSqFt,
            weightKg: evaluation.scraps.reduce((sum: number, s: any) => sum + s.estimatedWeightKg, 0),
          },
          notes: `Cut performed by ${operatorName}. Customer cut piece allocated to sales order.`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to execute cutting job');
      }

      setExecutionSuccess(data.job);
      await loadInventory();
    } catch (err: any) {
      setError(err.message || 'Error executing cutting job');
    } finally {
      setExecuting(false);
    }
  };

  const activeSource =
    selectedSourceType === 'SHEET'
      ? inventorySheets.find((s) => s.id === selectedSourceId)
      : inventoryRemnants.find((r) => r.id === selectedSourceId);

  const svgWidth = 500;
  const sheetRealWidth = activeSource ? activeSource.lengthMm : 3048;
  const sheetRealHeight = activeSource ? activeSource.widthMm : 2438;
  const svgScale = svgWidth / sheetRealWidth;
  const svgHeight = sheetRealHeight * svgScale;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Scissors className="w-6 h-6 text-teal-400" />
            <span>Smart 2D Glass Cutting Engine &amp; Visualizer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulates physical guillotine cuts, validates geometry, prevents material wastage, and auto-generates reusable remnants.
          </p>
        </div>

        <button
          onClick={evaluateCut}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${evaluating ? 'animate-spin' : ''}`} />
          <span>Refresh Feasibility</span>
        </button>
      </div>

      {executionSuccess && (
        <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/50 space-y-3">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Cutting Job Executed Successfully! Ticket: {executionSuccess.jobTicket}</span>
          </div>
          <p className="text-xs text-slate-300">
            Source sheet marked as consumed. Produced <strong>{executionSuccess.newRemnants?.length || 0}</strong> reusable remnant(s) in inventory and logged scrap to the cullet ledger.
          </p>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setExecutionSuccess(null)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Start Another Cut Job
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Boxes className="w-4 h-4 text-teal-400" />
            <span>1. Choose Stock Material Source</span>
          </h2>

          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setSelectedSourceType('SHEET');
                if (inventorySheets.length > 0) setSelectedSourceId(inventorySheets[0].id);
              }}
              className={`py-2 rounded-lg font-semibold transition-all ${
                selectedSourceType === 'SHEET'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Sheet Stock ({inventorySheets.filter((s) => s.status === 'IN_STOCK').length})
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedSourceType('REMNANT');
                if (inventoryRemnants.length > 0) setSelectedSourceId(inventoryRemnants[0].id);
              }}
              className={`py-2 rounded-lg font-semibold transition-all ${
                selectedSourceType === 'REMNANT'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Reusable Remnant ({inventoryRemnants.filter((r) => r.status === 'IN_STOCK').length})
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Select Specific Material Item
            </label>
            <select
              value={selectedSourceId}
              onChange={(e) => {
                setSelectedSourceId(e.target.value);
                const found =
                  selectedSourceType === 'SHEET'
                    ? inventorySheets.find((s) => s.id === e.target.value)
                    : inventoryRemnants.find((r) => r.id === e.target.value);
                if (found) {
                  setGlassType(found.glassType);
                  setThicknessMm(String(found.thicknessMm));
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
            >
              {selectedSourceType === 'SHEET'
                ? inventorySheets
                    .filter((s) => s.status === 'IN_STOCK')
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.sheetTag} &bull; {s.glassType} ({s.thicknessMm}mm) &bull; {s.lengthMm} &times; {s.widthMm} mm ({s.areaSqFt.toFixed(1)} sq ft)
                      </option>
                    ))
                : inventoryRemnants
                    .filter((r) => r.status === 'IN_STOCK')
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.remnantTag} &bull; {r.glassType} ({r.thicknessMm}mm) &bull; {r.lengthMm} &times; {r.widthMm} mm ({r.areaSqFt.toFixed(1)} sq ft)
                      </option>
                    ))}
            </select>
          </div>

          {activeSource && (
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5 text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Available Dimensions:</span>
                <strong className="text-white font-mono">{activeSource.lengthMm} &times; {activeSource.widthMm} mm</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Area:</span>
                <strong className="text-teal-300 font-mono">{activeSource.areaSqFt.toFixed(2)} sq ft</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Storage Rack:</span>
                <span className="text-white">{activeSource.rackLocation}</span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Ruler className="w-4 h-4 text-teal-400" />
              <span>2. Required Customer Cut Size (mm)</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Length (mm)</label>
                <input
                  type="number"
                  value={cutLengthMm}
                  onChange={(e) => setCutLengthMm(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Width (mm)</label>
                <input
                  type="number"
                  value={cutWidthMm}
                  onChange={(e) => setCutWidthMm(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-800 border border-white/15 text-white font-mono focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowRotation}
                  onChange={(e) => setAllowRotation(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 bg-slate-800 border-white/20"
                />
                <span>Allow 90&deg; Rotation for optimal fit</span>
              </label>
              <span className="text-[11px] text-slate-400">Kerf Loss: 3mm</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Operator / Cutter Incharge</label>
              <input
                type="text"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-brand-teal"
              />
            </div>

            <button
              onClick={handleExecuteCut}
              disabled={!evaluation?.feasible || executing}
              className={`w-full py-3 rounded-xl text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-sm ${
                evaluation?.feasible
                  ? 'bg-teal-600 hover:bg-teal-500 shadow-glassHover'
                  : 'bg-slate-700 opacity-50 cursor-not-allowed'
              }`}
            >
              <Scissors className="w-4 h-4" />
              <span>
                {executing ? 'Executing Cut & Updating Stock...' : 'Confirm & Execute Cut Job'}
              </span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  2D Guillotine Cut Layout Preview
                </h3>
                <p className="text-xs text-slate-400">
                  Physical layout proportional to actual millimeter dimensions
                </p>
              </div>

              {evaluation && (
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      evaluation.feasible
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {evaluation.feasible ? 'Physically Feasible' : 'Infeasible Cut'}
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex flex-col items-center justify-center min-h-[300px] overflow-hidden">
              {evaluation?.feasible ? (
                <div className="space-y-4 w-full flex flex-col items-center">
                  <div className="relative border border-slate-600 rounded-lg overflow-hidden shadow-2xl bg-slate-900/80">
                    <svg
                      width={svgWidth}
                      height={svgHeight}
                      viewBox={`0 0 ${sheetRealWidth} ${sheetRealHeight}`}
                      className="max-w-full h-auto"
                    >
                      <rect
                        x="0"
                        y="0"
                        width={sheetRealWidth}
                        height={sheetRealHeight}
                        fill="#0F172A"
                        stroke="#475569"
                        strokeWidth="4"
                      />

                      {evaluation.layoutBoxes.map((box: any) => (
                        <g key={box.id}>
                          <rect
                            x={box.x}
                            y={box.y}
                            width={box.width}
                            height={box.height}
                            fill={box.color}
                            fillOpacity="0.75"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                          />
                          <text
                            x={box.x + box.width / 2}
                            y={box.y + box.height / 2 - 20}
                            fill="#FFFFFF"
                            fontSize={sheetRealWidth > 2000 ? '90' : '60'}
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="central"
                          >
                            {box.label}
                          </text>
                          <text
                            x={box.x + box.width / 2}
                            y={box.y + box.height / 2 + 50}
                            fill="#E2E8F0"
                            fontSize={sheetRealWidth > 2000 ? '70' : '45'}
                            textAnchor="middle"
                            dominantBaseline="central"
                          >
                            {box.areaSqFt.toFixed(2)} sq ft
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-teal-600 border border-white/20" />
                      <span className="text-white font-medium">Customer Cut ({evaluation.customerCut.areaSqFt.toFixed(2)} sq ft)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-blue-600 border border-white/20" />
                      <span className="text-white font-medium">Reusable Remnant ({evaluation.remnants.reduce((sum: number, r: any) => sum + r.areaSqFt, 0).toFixed(2)} sq ft)</span>
                    </div>
                    {evaluation.totalScrapAreaSqFt > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-slate-500 border border-white/20" />
                        <span className="text-slate-300">Scrap Cullet ({evaluation.totalScrapAreaSqFt.toFixed(2)} sq ft)</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-2">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Cut Exceeds Dimensions or Spec Mismatch</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {evaluation?.reason || 'Select an in-stock sheet and enter valid dimensions to see cutting simulation.'}
                  </p>
                </div>
              )}
            </div>

            {evaluation?.feasible && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-800/60 border border-white/5 text-xs">
                <div>
                  <span className="text-slate-400 block">Material Utilization:</span>
                  <strong className="text-teal-300 font-bold text-base">
                    {evaluation.materialUtilizationPercent}%
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">New Remnants Created:</span>
                  <strong className="text-blue-300 font-bold text-base">
                    {evaluation.remnants.length} piece(s)
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Scrap Cullet:</span>
                  <strong className="text-slate-300 font-bold text-base">
                    {evaluation.totalScrapAreaSqFt} sq ft
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GlassCuttingPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-12">Loading cutting engine...</div>}>
      <GlassCuttingContent />
    </Suspense>
  );
}
