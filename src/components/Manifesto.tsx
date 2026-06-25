import React from "react";
import { Sparkles, MessageSquareX, Eye, Flame, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { MANIFESTO_POINTS } from "../data";

export default function Manifesto() {
  return (
    <section className="bg-ocean-900 text-cream-50 py-28 px-4 sm:px-6 lg:px-8 border-b border-ocean-950 relative overflow-hidden" id="manifesto">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-sage-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-ocean-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Manifesto Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20 border-b border-ocean-800">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs font-bold text-sage-400 uppercase tracking-widest bg-sage-950/40 border border-sage-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5 mb-6 select-none">
              <MessageSquareX className="w-3.5 h-3.5 text-sage-400" />
              <span>THE ANTI-CHATBOX MANIFESTO</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
              Typing is an <br />
              <span className="italic text-sage-400 font-normal">interim step.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 font-sans text-lg sm:text-xl text-cream-200/70 leading-relaxed font-light">
            We spent the last five years feeding prompts into sterile gray boxes. We got used to paragraphs of clinical, emotionless static. But human connection isn’t transactions of raw text. Beryl has unlocked the true visual layer: the blink, the tone, the micro-smile, the glance. That is where trust resides.
          </div>
        </div>

        {/* THREE CORE PHILOSOPHY BLOCKS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-20" id="manifesto-philosophy-grid">
          {MANIFESTO_POINTS.map((point, idx) => (
            <div 
              key={point.id}
              className="flex flex-col justify-between space-y-8 bg-ocean-950/40 border border-ocean-800 p-8 sm:p-10 rounded-3xl"
            >
              {/* Point Top */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-ocean-900 flex items-center justify-center border border-ocean-800">
                  <span className="font-mono text-xs font-bold text-sage-400">0{idx + 1}</span>
                </div>
                
                <h3 className="font-serif text-2xl font-medium text-white tracking-tight">
                  {point.title}
                </h3>
                <p className="font-sans text-xs font-semibold text-sage-400 tracking-tight leading-normal uppercase">
                  {point.subtitle}
                </p>
                <p className="font-sans text-sm text-cream-200/50 leading-relaxed font-light pt-2">
                  {point.description}
                </p>
              </div>

              {/* Point Metrics Callout */}
              {point.metric && (
                <div className="pt-6 border-t border-ocean-800/60 flex items-baseline space-x-3">
                  <span className="font-serif text-4xl font-bold text-white tracking-tight">
                    {point.metric.value}
                  </span>
                  <span className="font-sans text-[10px] font-bold text-sage-400 uppercase tracking-widest max-w-[120px] leading-tight">
                    {point.metric.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sizable Footer Quote Block */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-ocean-950 to-ocean-900 border border-ocean-800 text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sage-500/5 blur-3xl rounded-full" />
          
          <p className="font-serif text-xl sm:text-2xl text-cream-200 italic max-w-3xl leading-relaxed relative z-10 font-light">
            &ldquo;Communication isn't about compiling data; it is about physical reassurance. When the eye aligns and the tone of voice matches, the friction of computer interaction instantly vanishes.&rdquo;
          </p>
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-sage-400 mt-6 block relative z-10 select-none">
            - Dr. Julian, VP of Neural Synthesis, Beryl Live
          </span>
        </div>

      </div>
    </section>
  );
}
