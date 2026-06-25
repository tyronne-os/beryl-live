import React, { useState } from "react";
import { Terminal, Copy, Check, Sparkles, Code, PlaySquare, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function ApiSection() {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<"React" | "REST" | "Python">("React");

  const codeSnippets = {
    React: `import { BerylPortal } from "@beryl/react-sdk";

export default function App() {
  return (
    <BerylPortal
      apiKey={process.env.BERYL_SECRET_KEY}
      characterId="amanda"
      mode="realtime"
      onCallStarted={() => console.log("Handoff session alive")}
    />
  );
}`,
    REST: `curl -X POST "https://api.beryl.live/v1/sessions" \\
  -H "Authorization: Bearer $BERYL_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_id": "amanda",
    "voice_engine": "warm_rp_british",
    "latency_optimized": true
  }'`,
    Python: `from beryl import BerylClient

client = BerylClient(api_key="your_secret_key")

session = client.sessions.create(
    character_id="amanda",
    interactivity_mode="conversational",
    ambient_reflections=True
)

print(f"Neural session running: {session.webrtc_endpoint}")`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-cream-100 py-24 px-4 sm:px-6 lg:px-8 border-b border-cream-200" id="api">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT side description (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs font-bold text-sage-600 uppercase tracking-widest bg-sage-50 border border-sage-100 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5 select-none">
              <Code className="w-3.5 h-3.5 text-sage-600" />
              <span>DEVELOPER API INTEGRATION</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ocean-900 tracking-tight leading-none">
              Embed Face-to-Face <br />
              <span className="italic text-sage-600 font-normal">in three lines.</span>
            </h2>
            <p className="font-sans text-sm text-ocean-900/60 leading-relaxed font-light">
              Our lightweight SDK takes care of WebRTC negotiations, audio chunking, browser noise suppression, and real-time mesh video rendering. Just input your security token and select an avatar.
            </p>

            <ul className="space-y-3.5 pt-4">
              {[
                "WebRTC streaming with automatic STUN/TURN setups",
                "Phoneme-to-frame alignment inside our secure container pipeline",
                "Full event handling for vocal pauses, gestures, and sentiment hooks"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs text-ocean-900/70 font-medium">
                  <span className="w-5 h-5 rounded-full bg-sage-50 border border-sage-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <button className="px-6 py-3 rounded-full bg-ocean-900 hover:bg-ocean-800 text-cream-50 font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-ocean-950/10 flex items-center space-x-2 border border-ocean-800 cursor-pointer">
                <span>API Documentation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT side Sandbox editor (7 cols) */}
          <div className="lg:col-span-7 bg-ocean-950 rounded-3xl border border-ocean-800/60 p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[420px]" id="developer-code-terminal">
            
            {/* Terminal Header */}
            <div className="flex justify-between items-center pb-6 border-b border-ocean-900">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5 select-none">
                  <div className="w-3 h-3 rounded-full bg-rose-500/30 border border-rose-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-sage-500/30 border border-sage-500/40" />
                </div>
                <div className="bg-ocean-900 px-3 py-1 rounded border border-ocean-800 flex items-center space-x-1.5 text-[10px] font-mono text-cream-300">
                  <Terminal className="w-3 h-3 text-sage-400" />
                  <span>beryl-api-node.config</span>
                </div>
              </div>

              {/* Languages select list */}
              <div className="flex space-x-1.5 bg-ocean-900/50 p-1 rounded-lg border border-ocean-900 text-[10px] font-mono font-bold uppercase select-none">
                {(["React", "REST", "Python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setActiveLanguage(lang);
                      setCopied(false);
                    }}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      activeLanguage === lang 
                        ? "bg-ocean-900 text-sage-400 border border-ocean-800 shadow-sm" 
                        : "text-cream-200/40 hover:text-cream-200/80"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Code Display Area */}
            <div className="flex-1 py-6 overflow-x-auto">
              <pre className="font-mono text-xs text-cream-200/90 leading-relaxed max-w-full">
                <code>{codeSnippets[activeLanguage]}</code>
              </pre>
            </div>

            {/* Terminal Footer Info/Copy Trigger */}
            <div className="pt-4 border-t border-ocean-900 flex justify-between items-center text-[10px] font-mono text-cream-200/30 uppercase select-none">
              <span>Secure OAuth Auth Protocol</span>
              
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 hover:text-cream-50 transition-colors bg-ocean-900/60 hover:bg-ocean-900 border border-ocean-900 hover:border-ocean-800 px-3 py-1.5 rounded-lg cursor-pointer text-[9px] font-bold text-sage-400"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-sage-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
