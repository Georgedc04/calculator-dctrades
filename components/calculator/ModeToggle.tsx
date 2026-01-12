"use client";

import { CircleDollarSign, Percent } from "lucide-react";
import { motion } from "framer-motion";

type Mode = "pip" | "risk";

interface ModeToggleProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function ModeToggle({ mode, setMode }: ModeToggleProps) {
  return (
    <div className="relative flex justify-center mb-8">
      {/* Outer Container */}
      <div className="relative flex p-1 bg-[#0B0F14] border border-slate-800 rounded-2xl w-full max-w-[320px]">
        
        {/* Animated Sliding Background */}
        <motion.div
          initial={false}
          animate={{
            x: mode === "pip" ? 0 : "100%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-linear-to-r from-sky-600 to-blue-600 shadow-lg shadow-blue-500/20"
        />

        {/* Pip Mode Button */}
        <button
          onClick={() => setMode("pip")}
          className={`relative z-10 flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
            mode === "pip" ? "text-white" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <CircleDollarSign size={16} className={mode === "pip" ? "animate-pulse" : ""} />
          <span>Pip Mode</span>
        </button>

        {/* Risk Mode Button */}
        <button
          onClick={() => setMode("risk")}
          className={`relative z-10 flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
            mode === "risk" ? "text-white" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Percent size={16} className={mode === "risk" ? "animate-pulse" : ""} />
          <span>Risk Mode</span>
        </button>
      </div>
    </div>
  );
}