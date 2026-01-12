"use client";

import { Box, Hash, Plus, Minus } from "lucide-react";

interface PipInputsProps {
  lots: string;
  setLots: React.Dispatch<React.SetStateAction<string>>;
  pips: string;
  setPips: React.Dispatch<React.SetStateAction<string>>;
}

export default function PipInputs({
  lots,
  setLots,
  pips,
  setPips,
}: PipInputsProps) {
  // Helper to safely increment/decrement values
  const adjustValue = (
    current: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    amount: number
  ) => {
    const val = parseFloat(current) || 0;
    const result = Math.max(0, val + amount);
    setter(
      amount === 0.01 || amount === -0.01
        ? result.toFixed(2)
        : result.toFixed(0)
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Lot Size Input */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          Position Size (Lots)
        </label>

        <div className="relative flex items-center group">
          <div className="absolute left-3 text-slate-500 group-focus-within:text-sky-400 transition-colors">
            <Box size={18} />
          </div>

          <input
            type="number"
            inputMode="decimal"
            pattern="[0-9]*"
            step="any"
            placeholder="0.00"
            value={lots}
            onChange={(e) => setLots(e.target.value)}
            className="w-full h-12 bg-[#0B0F14] border border-slate-700 rounded-xl pl-10 pr-24 text-white font-mono
                       focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
          />

          <div className="absolute right-1 flex gap-1">
            <button
              onClick={() => adjustValue(lots, setLots, -0.01)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <button
              onClick={() => adjustValue(lots, setLots, 0.01)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Pips Input */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          Desired Pips
        </label>

        <div className="relative flex items-center group">
          <div className="absolute left-3 text-slate-500 group-focus-within:text-sky-400 transition-colors">
            <Hash size={18} />
          </div>

          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            step="1"
            placeholder="0"
            value={pips}
            onChange={(e) => setPips(e.target.value)}
            className="w-full h-12 bg-[#0B0F14] border border-slate-700 rounded-xl pl-10 pr-24 text-white font-mono
                       focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
          />

          <div className="absolute right-1 flex gap-1">
            <button
              onClick={() => adjustValue(pips, setPips, -1)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <button
              onClick={() => adjustValue(pips, setPips, 1)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
