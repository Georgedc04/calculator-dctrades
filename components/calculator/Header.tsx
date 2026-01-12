"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  mode: "pip" | "risk";
}

export default function Header({ mode }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start space-y-1"
    >
      {/* Title & Mode Status Row */}
      <div className="flex items-baseline justify-between w-full">
        <h2 className="text-xl font-black tracking-tighter uppercase italic bg-linear-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          DC Trades
        </h2>
        
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      {/* Dynamic Mode Subtitle */}
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-0.5">
        {mode === "pip" ? "Pip Value Calculator" : "Risk Management Terminal"}
      </p>

      {/* Minimal underline to separate from the Toggle */}
      <div className="h-0.5 w-8 bg-sky-500/30 rounded-full mt-1" />
    </motion.div>
  );
}