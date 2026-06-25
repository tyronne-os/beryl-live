import React from "react";
import { Sparkles, ArrowUpRight, CheckCircle, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import FallbackImage from "./FallbackImage";

interface ScrollerModel {
  id: string;
  name: string;
  role: string;
  voiceStyle: string;
  badge: string;
  imageUrl: string;
}

const SCROLLER_MODELS: ScrollerModel[] = [
  {
    id: "amanda-scroller",
    name: "Amanda",
    role: "Brand Spokesperson / Core",
    voiceStyle: "Warm British Accent (RP)",
    badge: "99.4% LipSync Rate",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "marcus-scroller",
    name: "Marcus",
    role: "Enterprise Advisor",
    voiceStyle: "Deep Resonance Mid-Atlantic",
    badge: "DTLS Encrypted Feed",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "evelyn-scroller",
    name: "Evelyn",
    role: "Executive Advisor",
    voiceStyle: "Refined English Accent",
    badge: "Active Attention Tracker",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "julian-scroller",
    name: "Dr. Julian",
    role: "Neural Synthesis VP",
    voiceStyle: "Thoughtful Swiss-German",
    badge: "Phoneme Matrix v2.4",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "priya-scroller",
    name: "Priya",
    role: "Global Communications",
    voiceStyle: "Global Indian Accent",
    badge: "32 Languages Native",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "siddharth-scroller",
    name: "Siddharth",
    role: "Strategy & Onboarding Lead",
    voiceStyle: "Articulate American Accent",
    badge: "Ultra Low Latency Node",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "clara-scroller",
    name: "Clara",
    role: "Customer Operations Lead",
    voiceStyle: "Engaging Transatlantic",
    badge: "Full Custom Rig Ready",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kaito-scroller",
    name: "Kaito",
    role: "Global Operations Lead",
    voiceStyle: "Sleek Tokyo Accent",
    badge: "Synchronized Gaze Vector",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
  }
];

export default function ModelScroller() {
  return (
    <section className="bg-cream-100 py-24 border-b border-cream-200 overflow-hidden" id="roster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 text-sage-600 mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Amanda’s Character Suite</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ocean-900 tracking-tight leading-none">
              High-Fidelity Model Suite
            </h2>
            <p className="font-sans text-sm text-ocean-900/60 mt-4 leading-relaxed font-light">
              Meet our lineup of premium neural entities. Outfitted in elegant formal blazers, striped ties, custom crest badges, and luxury jewelry, they are pre-configured to handle elite operations.
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-sage-700 bg-white border border-cream-300 rounded-full px-4 py-2 shadow-sm select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
            <span>Hover card to pause continuous feed</span>
          </div>
        </div>

      </div>

      {/* INFINITE SCROLLER MARQUEE ROW */}
      <div className="relative w-full overflow-hidden flex flex-col justify-center select-none py-4">
        
        {/* Transparent Side Gradients for Seamless Blurs */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-cream-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-cream-100 to-transparent z-10 pointer-events-none" />

        {/* Double row marquee container for seamless infinite look */}
        <div className="animate-marquee gap-6">
          {/* First loop of models */}
          {SCROLLER_MODELS.map((model, idx) => (
            <div
              key={`${model.id}-1-${idx}`}
              className="w-[260px] sm:w-[300px] shrink-0 bg-white rounded-2xl border border-cream-300 p-4 shadow-sm hover:shadow-md hover:border-sage-400/40 transition-all cursor-pointer flex flex-col space-y-4 relative group"
            >
              {/* Image Frame with Status & Badges */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-cream-50">
                <FallbackImage
                  baseName={model.id.split("-")[0]}
                  fallbackUrl={model.imageUrl}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Crest Livery Badge overlay */}
                <div className="absolute top-3 left-3 bg-ocean-900/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono font-bold tracking-widest text-cream-50 border border-ocean-800 uppercase">
                  Livery Crest Certified
                </div>

                {/* Performance Badge Overlay */}
                <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1 rounded-md text-[9px] font-mono font-bold text-sage-700 border border-cream-300 shadow-sm uppercase">
                  {model.badge}
                </div>
              </div>

              {/* Character Details */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-medium text-ocean-900">{model.name}</span>
                  <div className="w-4 h-4 rounded-full bg-sage-50 border border-sage-100 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-sage-600" />
                  </div>
                </div>
                <span className="font-sans text-xs text-ocean-900/50 mt-0.5">{model.role}</span>
                
                <div className="mt-3 pt-3 border-t border-cream-200/60 flex items-center justify-between text-[10px] font-mono text-sage-600 uppercase">
                  <span>Voice Pitch</span>
                  <span className="font-bold text-ocean-900">{model.voiceStyle.split(" Accent")[0]}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicated Second loop of models to maintain infinite loop scrolling */}
          {SCROLLER_MODELS.map((model, idx) => (
            <div
              key={`${model.id}-2-${idx}`}
              className="w-[260px] sm:w-[300px] shrink-0 bg-white rounded-2xl border border-cream-300 p-4 shadow-sm hover:shadow-md hover:border-sage-400/40 transition-all cursor-pointer flex flex-col space-y-4 relative group"
            >
              {/* Image Frame with Status & Badges */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-cream-50">
                <FallbackImage
                  baseName={model.id.split("-")[0]}
                  fallbackUrl={model.imageUrl}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Crest Livery Badge overlay */}
                <div className="absolute top-3 left-3 bg-ocean-900/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono font-bold tracking-widest text-cream-50 border border-ocean-800 uppercase">
                  Livery Crest Certified
                </div>

                {/* Performance Badge Overlay */}
                <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1 rounded-md text-[9px] font-mono font-bold text-sage-700 border border-cream-300 shadow-sm uppercase">
                  {model.badge}
                </div>
              </div>

              {/* Character Details */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-medium text-ocean-900">{model.name}</span>
                  <div className="w-4 h-4 rounded-full bg-sage-50 border border-sage-100 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-sage-600" />
                  </div>
                </div>
                <span className="font-sans text-xs text-ocean-900/50 mt-0.5">{model.role}</span>
                
                <div className="mt-3 pt-3 border-t border-cream-200/60 flex items-center justify-between text-[10px] font-mono text-sage-600 uppercase">
                  <span>Voice Pitch</span>
                  <span className="font-bold text-ocean-900">{model.voiceStyle.split(" Accent")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
