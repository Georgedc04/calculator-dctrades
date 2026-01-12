"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResultBoxProps {
  value: string;
  symbol: string;
  mode: "pip" | "risk";
  riskAmount?: string;
}

export default function ResultBox({
  value,
  symbol,
  mode,
  riskAmount,
}: ResultBoxProps) {
  const [copied, setCopied] = useState(false);
  
  const copyValue = mode === "risk" ? value : `${symbol}${value}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-500/10 to-emerald-500/10 border border-white/10 p-6 transition-all duration-300 hover:border-white/20">
      {/* Decorative Background Glow */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
      
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
          {mode === "pip" ? "Total Pip Value" : "Recommended Lot Size"}
        </span>

        <div className="flex items-baseline gap-1">
          <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">
            {mode === "pip" && <span className="mr-1 text-2xl text-slate-400">{symbol}</span>}
            {value}
          </h2>
          {mode === "risk" && (
            <span className="text-sm font-bold text-slate-500 uppercase ml-2">Lots</span>
          )}
        </div>

        {mode === "risk" && riskAmount && (
          <div className="mt-3 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] font-medium text-emerald-400 uppercase tracking-wide">
              Cash at Risk: {symbol}{riskAmount}
            </p>
          </div>
        )}

        <button
          onClick={handleCopy}
          className={`mt-5 flex items-center gap-2 rounded-xl px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            copied 
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          {copied ? (
            <>
              <Check size={14} className="animate-in zoom-in" /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy Result
            </>
          )}
        </button>
      </div>
    </div>
  );
}