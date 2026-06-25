import React from "react";
import { ArrowRight, Video, Shield, CodeXml, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onScrollToDemo: () => void;
}

export default function Hero({ onScrollToDemo }: HeroProps) {
  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-cream-50 via-cream-50 to-cream-100 overflow-hidden py-12 px-4 sm:px-6 lg:px-8 border-b border-cream-200"
      id="hero"
    >
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-ocean-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Sleek Introductory Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border border-cream-300 shadow-sm mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-sage-600" />
          <span className="font-mono text-[10px] font-bold text-sage-700 tracking-wider uppercase">
            Beryl neural rendering engine v2.4
          </span>
        </motion.div>

        {/* The Core Manifesto Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-ocean-900 max-w-3xl leading-[1.05]"
        >
          We need to have <br />
          <span className="italic text-sage-600 font-normal">a face to face.</span>
        </motion.h1>

        {/* Subtitle / Explainer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 font-sans text-lg sm:text-xl text-ocean-900/60 max-w-2xl leading-relaxed font-light"
        >
          Boring, static text boxes belong in the archives. It is time to speak, 
          make eye contact, and connect in real-time with photorealistic 
          conversational AI avatars designed for enterprise.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onScrollToDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-ocean-900 hover:bg-ocean-800 text-cream-50 font-sans text-sm font-semibold tracking-wide transition-all shadow-xl shadow-ocean-950/15 flex items-center justify-center space-x-2 border border-ocean-800 group cursor-pointer"
          >
            <span>Talk to Amanda</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onScrollToDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-cream-50 text-ocean-900 font-sans text-sm font-semibold tracking-wide transition-all border border-cream-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Video className="w-4 h-4 text-sage-500" />
            <span>Select Other Models</span>
          </button>
        </motion.div>

        {/* Key trust attributes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-16 pt-12 border-t border-cream-200/60 w-full grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12"
        >
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl font-semibold text-ocean-900">
              &lt; 180ms
            </span>
            <span className="font-sans text-[11px] font-bold text-sage-600 uppercase tracking-widest mt-1">
              Lip-Sync Latency
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl font-semibold text-ocean-900">
              32
            </span>
            <span className="font-sans text-[11px] font-bold text-sage-600 uppercase tracking-widest mt-1">
              Supported Languages
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
            <span className="font-serif text-3xl font-semibold text-ocean-900">
              98.4%
            </span>
            <span className="font-sans text-[11px] font-bold text-sage-600 uppercase tracking-widest mt-1">
              Phoneme Accuracy
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
