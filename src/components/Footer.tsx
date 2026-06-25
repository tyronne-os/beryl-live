import React from "react";
import { ArrowUp, Sparkles, Shield, Heart } from "lucide-react";
import { motion } from "motion/react";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="bg-ocean-950 text-cream-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-ocean-900 select-none" id="footer-details">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Typographic Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onScrollToTop}>
          <div className="w-8 h-8 rounded-lg bg-cream-50 flex items-center justify-center border border-cream-200">
            <span className="font-serif text-sm font-bold text-ocean-950 tracking-wider">B</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base font-bold text-white tracking-tight leading-none">Beryl</span>
            <span className="font-sans text-[9px] font-bold text-sage-400 tracking-widest uppercase mt-0.5">Live</span>
          </div>
        </div>

        {/* Quick details */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-xs font-semibold text-cream-200/40">
          <a href="#" className="hover:text-cream-50 transition-colors">Developer Terms</a>
          <a href="#" className="hover:text-cream-50 transition-colors">Privacy Ledger</a>
          <a href="#" className="hover:text-cream-50 transition-colors">Ethics Guidelines</a>
          <a href="#" className="hover:text-cream-50 transition-colors">Network Status</a>
        </div>

        {/* Back to top trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollToTop}
          className="p-3.5 rounded-full bg-ocean-900 hover:bg-ocean-800 border border-ocean-800 text-sage-400 hover:text-white transition-all cursor-pointer shadow-lg"
          title="Scroll Back To Top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-ocean-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-cream-200/20 font-mono uppercase">
        <span>© 2026 BERYL SYSTEMS INC. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center space-x-1">
          <Shield className="w-3.5 h-3.5 text-sage-600/40" />
          <span>Fidelity Secured WebRTC Protocol</span>
        </div>
      </div>
    </footer>
  );
}
