"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { pairRates } from "@/lib/calculator/pairRates";
import { rates, type Currency } from "@/lib/calculator/rates";
import { getSymbol } from "@/lib/calculator/utils";

// Optimized Premium Components
import Header from "./Header";
import ModeToggle from "./ModeToggle";
import PairSelect from "./PairSelect";
import PipInputs from "./PipInputs";
import RiskInputs from "./RiskInputs";
import ResultBox from "./ResultBox";
import { Coins, ChevronRight } from "lucide-react";
import Link from "next/link";

type Mode = "pip" | "risk";
type Pair = keyof typeof pairRates;

export default function ForexCalculator() {
  const [mode, setMode] = useState<Mode>("pip");
  const [pair, setPair] = useState<Pair>("EURUSD");
  const [currency, setCurrency] = useState<Currency>("USD");

  const [lots, setLots] = useState("");
  const [pips, setPips] = useState("");
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [stopLoss, setStopLoss] = useState("");

  const symbol = getSymbol(currency);

  const result = useMemo<{ value: string; riskAmount: string }>(() => {
    if (mode === "pip") {
      if (!lots || !pips) return { value: "0.00", riskAmount: "" };
      let value = pairRates[pair] * Number(lots) * Number(pips);
      value /= rates[currency];
      return { value: value.toFixed(2), riskAmount: "" };
    }

    if (!accountSize || !riskPercent || !stopLoss)
      return { value: "0.000", riskAmount: "0.00" };

    let riskAmount = (Number(accountSize) * Number(riskPercent)) / 100;
    riskAmount /= rates[currency];
    const lotSize = riskAmount / (Number(stopLoss) * pairRates[pair]);

    return { value: lotSize.toFixed(3), riskAmount: riskAmount.toFixed(2) };
  }, [mode, lots, pips, pair, currency, accountSize, riskPercent, stopLoss]);

  return (
    <div className="min-h-screen bg-[#07090D] relative flex flex-col items-center justify-center p-0 sm:p-4 overflow-hidden font-sans selection:bg-sky-500/50">
      
      {/* --- TRADING CHART BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 1. Technical Grid */}
        <div 
          className="absolute inset-0 opacity-[0.1]" 
          style={{
            backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), 
                             linear-gradient(to bottom, #334155 1px, transparent 1px)`,
            backgroundSize: '45px 45px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />

        {/* 2. Bullish Trend Line (Animated Path) */}
        <svg className="absolute top-[25%] left-0 w-full h-64 opacity-20 blur-[2px]" preserveAspectRatio="none">
          <motion.path
            d="M0 160 Q 150 140, 300 100 T 500 120 T 750 40 T 1000 70"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>

        {/* 3. Bearish Trend Line (Animated Path) */}
        <svg className="absolute bottom-[20%] left-0 w-full h-80 opacity-10 blur-[1px]" preserveAspectRatio="none">
          <motion.path
            d="M0 50 Q 200 100, 400 80 T 700 180 T 1100 120"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
          />
        </svg>

        {/* 4. Ambient Gloom/Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-transparent via-transparent to-[#07090D] z-1" />
      </div>

      {/* --- 3D HARDWARE CALCULATOR --- */}
      <div className="relative z-10 w-full max-w-md min-h-screen sm:min-h-0 
                      sm:shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] 
                      bg-[#151921] 
                      sm:rounded-[2.8rem] 
                      sm:border-[6px] sm:border-[#1F242D] 
                      sm:ring-1 sm:ring-slate-700/50
                      flex flex-col overflow-hidden">
        
        <div className="flex-1 flex flex-col">
          {/* Header Section */}
          <div className="px-6 pt-6 sm:pt-8 pb-2">
            <Header mode={mode} />
            <div className="mt-4">
               <ModeToggle mode={mode} setMode={setMode} />
            </div>
          </div>

          {/* Form Body */}
          <div className="px-6 pb-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PairSelect pair={pair} setPair={setPair} />
              
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1">
                  <Coins size={10} className="text-sky-500" /> Currency
                </label>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="w-full h-11 px-4 bg-[#0B0F14] border-2 border-slate-800/50 rounded-xl text-sm font-bold text-white appearance-none cursor-pointer focus:ring-2 focus:ring-sky-500/40 outline-none transition-all pr-10 shadow-inner"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                  <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-slate-800 to-transparent w-full" />

            {/* Inputs Container */}
            <div className="min-h-fit py-2">
              {mode === "pip" ? (
                <PipInputs lots={lots} setLots={setLots} pips={pips} setPips={setPips} />
              ) : (
                <RiskInputs
                  accountSize={accountSize}
                  setAccountSize={setAccountSize}
                  riskPercent={riskPercent}
                  setRiskPercent={setRiskPercent}
                  stopLoss={stopLoss}
                  setStopLoss={setStopLoss}
                />
              )}
            </div>
          </div>
        </div>

        {/* LCD Screen Result Section */}
        <div className="mt-auto">
          <div className="p-6 bg-[#1A1F26]/90 border-t border-slate-800/80 backdrop-blur-xl">
            <ResultBox
              value={result.value}
              symbol={symbol}
              mode={mode}
              riskAmount={result.riskAmount}
            />
            
           <div className="mt-6 flex items-center justify-center gap-4 px-2">
          {/* Left Decorative Line - Increased Opacity */}
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent opacity-40" />
          
          <div className="flex items-center gap-3 group">
            {/* Text: Increased opacity and added a subtle text-shadow for "glow" */}
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-sky-400/70 whitespace-nowrap group-hover:text-sky-400 transition-all duration-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
              Precision Trading Engine
            </p>
            
            {/* Legal & Policy Link: Defined more clearly as a hardware button */}
            <Link 
              href="/terms" 
              className="flex items-center justify-center w-5 h-5 rounded-full 
                        bg-[#0B0F14] border border-slate-700 
                        text-sky-400 shadow-lg
                        hover:border-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.4)] 
                        hover:scale-110 active:scale-95
                        transition-all duration-300"
              title="Terms & Privacy Policy"
            >
              <span className="text-[10px] font-black italic">?</span>
            </Link>
          </div>

          {/* Right Decorative Line - Increased Opacity */}
          <div className="h-px flex-1 bg-linear-to-l from-transparent via-slate-700 to-transparent opacity-40" />
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}