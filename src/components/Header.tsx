import React from "react";
import { Sparkles, Terminal, Activity, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Header({ onScrollTo }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full bg-cream-50/85 backdrop-blur-xl border-b border-cream-200/50"
      id="beryl-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Typographic Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onScrollTo("hero")}>
          <div className="w-9 h-9 rounded-xl bg-ocean-900 flex items-center justify-center shadow-lg shadow-ocean-900/10 border border-ocean-800/30">
            <span className="font-serif text-lg font-bold text-cream-50 tracking-wider">B</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-ocean-900 tracking-tight leading-none">Beryl</span>
            <span className="font-sans text-[10px] font-semibold text-sage-600 tracking-widest uppercase mt-0.5">Live</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-ocean-900/70">
          <button
            onClick={() => onScrollTo("manifesto")}
            className="hover:text-ocean-900 transition-colors cursor-pointer relative py-1 group"
          >
            Manifesto
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sage-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onScrollTo("demo")}
            className="hover:text-ocean-900 transition-colors cursor-pointer relative py-1 group"
          >
            Portal Demo
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sage-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onScrollTo("roster")}
            className="hover:text-ocean-900 transition-colors cursor-pointer relative py-1 group"
          >
            Character Roster
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sage-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onScrollTo("showcase")}
            className="hover:text-ocean-900 transition-colors cursor-pointer relative py-1 group"
          >
            Fidelity Showcase
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sage-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onScrollTo("api")}
            className="hover:text-ocean-900 transition-colors cursor-pointer relative py-1 group flex items-center space-x-1"
          >
            <Terminal className="w-3.5 h-3.5 text-sage-500" />
            <span>Developer API</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sage-500 transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Right side CTA / Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-100">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-600"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold text-sage-700 tracking-tight">
              Latency: 124ms
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onScrollTo("demo")}
            className="px-5 py-2.5 rounded-full bg-ocean-900 hover:bg-ocean-800 text-cream-50 font-sans text-xs font-semibold tracking-tight transition-all shadow-md shadow-ocean-950/10 flex items-center space-x-1.5 border border-ocean-800 cursor-pointer"
            id="header-cta-button"
          >
            <span>Launch Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
