"use client";

import { ChevronDown, Globe } from "lucide-react";
import { pairRates } from "@/lib/calculator/pairRates";

type Pair = keyof typeof pairRates;

interface PairSelectProps {
  pair: Pair;
  setPair: (pair: Pair) => void;
}

export default function PairSelect({ pair, setPair }: PairSelectProps) {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-sky-400 transition-colors">
          Asset Selection
        </label>
        <span className="text-[10px] font-medium text-slate-600">FX Markets</span>
      </div>

      <div className="relative">
        {/* Leading Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors pointer-events-none">
          <Globe size={16} />
        </div>

        <select
          value={pair}
          onChange={(e) => setPair(e.target.value as Pair)}
          className="w-full h-12 pl-10 pr-10 rounded-xl bg-[#0B0F14] border border-slate-700 text-sm font-semibold text-white
                    appearance-none cursor-pointer transition-all duration-200
                    hover:border-slate-500 hover:bg-[#12161D]
                    focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500"
        >
          {Object.keys(pairRates).map((p) => (
            <option key={p} value={p} className="bg-[#151921] text-white py-2">
              {p.slice(0, 3)} / {p.slice(3)}
            </option>
          ))}
        </select>

        {/* Custom Chevron Arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-slate-300 transition-colors">
          <ChevronDown size={18} />
        </div>
      </div>
      
      {/* Visual indicator of active pair */}
      <div className="flex gap-1 overflow-hidden h-0.5 w-full bg-slate-800 rounded-full">
         <div className="w-1/3 h-full bg-sky-500" />
      </div>
    </div>
  );
}