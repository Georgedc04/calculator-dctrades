"use client";

import { Wallet, Percent, ShieldAlert, Plus, Minus } from "lucide-react";

interface RiskInputsProps {
  accountSize: string;
  setAccountSize: React.Dispatch<React.SetStateAction<string>>;
  riskPercent: string;
  setRiskPercent: React.Dispatch<React.SetStateAction<string>>;
  stopLoss: string;
  setStopLoss: React.Dispatch<React.SetStateAction<string>>;
}

export default function RiskInputs({
  accountSize,
  setAccountSize,
  riskPercent,
  setRiskPercent,
  stopLoss,
  setStopLoss,
}: RiskInputsProps) {
  const adjustValue = (
    current: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    amount: number
  ) => {
    const val = parseFloat(current) || 0;
    const next = Math.max(0, val + amount);
    setter(amount % 1 !== 0 ? next.toFixed(1) : next.toString());
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Account Size */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          Account Balance
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none">
            <Wallet size={18} />
          </div>
          <input
            type="number"
            inputMode="decimal"
            pattern="[0-9]*"
            step="any"
            placeholder="0.00"
            value={accountSize}
            onChange={(e) => setAccountSize(e.target.value)}
            className="w-full h-12 bg-[#0B0F14] border border-slate-700 rounded-xl pl-10 pr-4 text-white font-mono
                       focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Risk Percentage */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Risk (%)
          </label>
          <div className="relative flex items-center group">
            <div className="absolute left-3 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
              <Percent size={14} />
            </div>
            <input
              type="number"
              inputMode="decimal"
              pattern="[0-9]*"
              step="0.1"
              placeholder="1.0"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              className="w-full h-12 bg-[#0B0F14] border border-slate-700 rounded-xl pl-9 pr-8 text-white font-mono
                         focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all outline-none"
            />
            <div className="absolute right-1 flex flex-col scale-75">
              <button
                onClick={() => adjustValue(riskPercent, setRiskPercent, 0.5)}
                className="p-0.5 hover:text-emerald-400"
              >
                <Plus size={14} />
              </button>
              <button
                onClick={() => adjustValue(riskPercent, setRiskPercent, -0.5)}
                className="p-0.5 hover:text-red-400"
              >
                <Minus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Stop Loss */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Stop Loss (pips)
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-400 transition-colors">
              <ShieldAlert size={16} />
            </div>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              step="1"
              placeholder="20"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full h-12 bg-[#0B0F14] border border-slate-700 rounded-xl pl-10 pr-4 text-white font-mono
                         focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Quick Risk Presets */}
      <div className="flex gap-2 mt-2">
        {["0.5", "1.0", "2.0"].map((p) => (
          <button
            key={p}
            onClick={() => setRiskPercent(p)}
            className="flex-1 py-1.5 text-[10px] font-bold rounded-lg border border-slate-800
                       bg-slate-900/50 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
          >
            {p}% RISK
          </button>
        ))}
      </div>
    </div>
  );
}
