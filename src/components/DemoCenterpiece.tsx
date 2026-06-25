import React, { useState, useEffect, useRef } from "react";
import { 
  Phone, PhoneOff, Mic, MicOff, Video as VideoIcon, VideoOff, 
  Send, Sparkles, Volume2, Globe, CheckCircle2, AlertCircle, Play, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CHARACTERS } from "../data";
import { Character } from "../types";
import FallbackImage from "./FallbackImage";

export default function DemoCenterpiece() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCamOn, setIsCamOn] = useState<boolean>(false);
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const [customText, setCustomText] = useState<string>("");
  const [callLog, setCallLog] = useState<{ sender: 'user' | 'avatar'; text: string; timestamp: string }[]>([]);
  const [conversationState, setConversationState] = useState<'idle' | 'listening' | 'synthesizing' | 'speaking'>('idle');
  const [activeSpeechText, setActiveSpeechText] = useState<string>("");
  const [audioBars, setAudioBars] = useState<number[]>(new Array(16).fill(5));
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const speakTimeoutRef = useRef<any>(null);
  const audioIntervalRef = useRef<any>(null);

  // Check if Web Speech API is supported
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSpeech = "speechSynthesis" in window;
      setSpeechSupported(hasSpeech);
    }
  }, []);

  // Update audio visualizer bars when character is speaking
  useEffect(() => {
    if (conversationState === 'speaking') {
      audioIntervalRef.current = setInterval(() => {
        setAudioBars(prev => prev.map(() => Math.floor(Math.random() * 35) + 5));
      }, 100);
    } else if (conversationState === 'listening') {
      audioIntervalRef.current = setInterval(() => {
        setAudioBars(prev => prev.map(() => Math.floor(Math.random() * 12) + 2));
      }, 150);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setAudioBars(new Array(16).fill(4));
    }

    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [conversationState]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (userStream) {
        userStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [userStream]);

  // Handle call initiation
  const startCall = async () => {
    setIsConnecting(true);
    setPermissionError(null);
    
    // Simulate connection delay
    setTimeout(async () => {
      setIsConnecting(false);
      setIsCalling(true);
      setConversationState('idle');
      
      // Add initial greeting to log
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCallLog([
        {
          sender: 'avatar',
          text: selectedCharacter.greeting,
          timestamp: timeStr
        }
      ]);

      // Physical Speech Synthesis of the greeting
      speakText(selectedCharacter.greeting);
    }, 1500);

    // Try to get user camera/mic if they click Cam On or Mic On
    if (isCamOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setUserStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        console.warn("Media permissions declined or unavailable:", err);
        setPermissionError("Camera/Microphone permissions were not fully granted. Running in simulated fallback mode.");
        setIsCamOn(false);
      }
    }
  };

  // Toggle User Camera
  const toggleCam = async () => {
    if (!isCamOn) {
      setIsCamOn(true);
      if (isCalling) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setUserStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          setIsCamOn(false);
          setPermissionError("Could not access camera device.");
        }
      }
    } else {
      setIsCamOn(false);
      if (userStream) {
        userStream.getTracks().forEach(track => {
          if (track.kind === 'video') track.stop();
        });
      }
    }
  };

  // End active call
  const endCall = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (userStream) {
      userStream.getTracks().forEach(track => track.stop());
      setUserStream(null);
    }
    setIsCalling(false);
    setConversationState('idle');
    setCallLog([]);
  };

  // Speaks text using the Web Speech Synthesis API
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      // Speech synthesis not supported, simulate latency
      setConversationState('speaking');
      setActiveSpeechText(text);
      setTimeout(() => {
        setConversationState('idle');
      }, 4000);
      return;
    }

    // Stop current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to match voice to selected character profile
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (selectedCharacter.id === "amanda" || selectedCharacter.id === "evelyn") {
      // British voice
      selectedVoice = voices.find(v => v.lang.includes("en-GB") || v.name.includes("Google UK") || v.name.includes("Daniel") || v.name.includes("Hazel"));
    } else if (selectedCharacter.id === "marcus") {
      // American deep voice
      selectedVoice = voices.find(v => v.lang.includes("en-US") && (v.name.includes("Natural") || v.name.includes("Google US") || v.name.includes("David")));
    } else if (selectedCharacter.id === "priya") {
      // Indian voice
      selectedVoice = voices.find(v => v.lang.includes("en-IN") || v.name.includes("Heera") || v.name.includes("Ravi"));
    } else if (selectedCharacter.id === "kyra") {
      // Australian voice
      selectedVoice = voices.find(v => v.lang.includes("en-AU") || v.name.includes("Karen"));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = selectedCharacter.id === "marcus" ? 0.9 : 1.05;

    utterance.onstart = () => {
      setConversationState('speaking');
      setActiveSpeechText(text);
    };

    utterance.onend = () => {
      setConversationState('idle');
    };

    utterance.onerror = () => {
      setConversationState('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Change character while in call
  const selectCharacterInCall = (char: Character) => {
    setSelectedCharacter(char);
    if (isCalling) {
      // Add notification to log
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCallLog(prev => [
        ...prev,
        {
          sender: 'avatar',
          text: `[Handoff complete. Switched channel to ${char.name} (${char.role})]`,
          timestamp: timeStr
        }
      ]);
      speakText(char.greeting);
    }
  };

  // Submit response text
  const handleUserMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Cancel any speaking
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // 1. Add user message to log
    setCallLog(prev => [...prev, { sender: 'user', text: messageText, timestamp: timeStr }]);
    setCustomText("");

    // 2. Transition to Listening/Thinking
    setConversationState('listening');

    // 3. Simulate low-latency brain processing (Anam-style pipeline)
    setTimeout(() => {
      setConversationState('synthesizing');

      // Pick a logical reply from the character's pre-loaded options or generate generic beautiful responses
      setTimeout(() => {
        let matchedReply = "";
        
        // Match specific questions to pre-coded response options
        const optionIndex = selectedCharacter.responseOptions.indexOf(messageText);
        if (optionIndex !== -1) {
          if (selectedCharacter.id === "amanda") {
            if (optionIndex === 0) matchedReply = "Text chats are transactional and flat. But when you look at my face, your mirror neurons fire. You process my intent, my confidence, and my posture. This translates directly to professional trust and emotional comfort.";
            if (optionIndex === 1) matchedReply = "Our system utilizes Edge compilation nodes. By bypassing standard HTTP endpoints and streaming direct H.264 vector arrays, we've brought synthesis latency down to 124ms. It is practically imperceptible.";
            if (optionIndex === 2) matchedReply = "You can upload a single static image and a 20-second audio track. Our Neural Synthesis pipeline maps the phonemes and immediately brings your portrait to life with full skeletal deformation.";
          } else if (selectedCharacter.id === "marcus") {
            if (optionIndex === 0) matchedReply = "Security is built directly into our infrastructure. Every live video chunk is encrypted in transit via WebRTC DTLS and SRTP. We are SOC2 Type II compliant and do not cache user feeds.";
            if (optionIndex === 1) matchedReply = "In retail testing, replacing text chatbots with a premium face resulted in a 42% increase in cart size and cut drop-offs by half. People value professional conversation.";
            if (optionIndex === 2) matchedReply = "Our API provides clean REST endpoints and a lightweight React SDK. You initialize the live connection with a simple client key and pass session contexts easily.";
          } else {
            matchedReply = `I hear you completely. Regarding "${messageText}", Beryl is engineered to solve precisely this. Our low-latency synthesis delivers extreme clarity and realism. We are pioneering a world where AI doesn't feel like a terminal, but a human partner.`;
          }
        }

        if (!matchedReply) {
          matchedReply = `Thank you for asking that. In my role as ${selectedCharacter.role}, I see this as the fundamental challenge of modern tech. Beryl provides an elegant, humane response that bridges the gap between synthetic intelligence and authentic connection. Let's delve deeper!`;
        }

        setCallLog(prev => [...prev, { sender: 'avatar', text: matchedReply, timestamp: timeStr }]);
        speakText(matchedReply);
      }, 1000);
    }, 800);
  };

  return (
    <section className="bg-ocean-950 text-cream-50 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="demo">
      {/* Decorative Neon Portal Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sage-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-ocean-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-sage-400 uppercase tracking-widest bg-sage-900/50 px-3.5 py-1.5 rounded-full border border-sage-500/20 inline-flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse"></span>
            <span>EXPERIENCE INTUITIVE INTELLIGENCE</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold mt-4 text-white tracking-tight">
            The Interactive Portal
          </h2>
          <p className="font-sans text-sm sm:text-base text-cream-200/60 mt-4 leading-relaxed font-light">
            Do not take our word for it. Initiate a secure high-fidelity video session directly with our primary models. Experience eye-contact, low-latency, and authentic speech.
          </p>
        </div>

        {/* Central Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="interactive-portal-dashboard">
          
          {/* LEFT: Cinematic Avatar Live Viewport (7 cols) */}
          <div className="lg:col-span-7 bg-ocean-900/80 rounded-3xl border border-ocean-800/80 overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[500px] sm:min-h-[600px] group">
            
            {/* Top Telemetry Overlay */}
            <div className="p-4 sm:p-6 bg-gradient-to-b from-ocean-950/80 to-transparent absolute top-0 left-0 right-0 z-20 flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider font-semibold uppercase flex items-center space-x-1.5 ${
                  isCalling ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-sage-600/20 text-sage-300 border border-sage-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCalling ? 'bg-rose-400 animate-pulse' : 'bg-sage-400'}`}></span>
                  <span>{isCalling ? 'LIVE CONNECTED' : 'STANDBY'}</span>
                </div>
                <div className="bg-ocean-950/80 px-2.5 py-1 rounded-md border border-ocean-800 text-[10px] font-mono text-cream-300">
                  REF: {selectedCharacter.id.toUpperCase()}-v2.4
                </div>
              </div>

              <div className="bg-ocean-950/80 px-3 py-1 rounded-md border border-ocean-800 text-[10px] font-mono text-sage-400 flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-sage-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>VOICE CHANNEL: {selectedCharacter.voice.split(" (")[0]}</span>
              </div>
            </div>

            {/* Main Video Frame & Interactive States */}
            <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-ocean-950">
              <AnimatePresence mode="wait">
                {!isCalling && !isConnecting ? (
                  // Stanby / Not connected state
                  <motion.div 
                    key="standby"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-ocean-950 relative"
                  >
                    {/* Background Fallback Image with dimming overlay */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <FallbackImage
                        baseName={selectedCharacter.id}
                        fallbackUrl={selectedCharacter.avatarUrl}
                        alt=""
                        className="w-full h-full object-cover opacity-15"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/80 to-ocean-950/95" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                      <div className="w-20 h-20 rounded-full bg-sage-500/10 border border-sage-400/30 flex items-center justify-center mb-6 shadow-lg shadow-sage-950/20 cursor-pointer" onClick={startCall}>
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2.5 }}
                          className="w-14 h-14 rounded-full bg-sage-500 hover:bg-sage-600 flex items-center justify-center"
                        >
                          <Play className="w-6 h-6 text-ocean-950 fill-ocean-950 translate-x-0.5" />
                        </motion.div>
                      </div>
                      <h3 className="font-serif text-2xl font-medium tracking-tight text-white mb-2">
                        Ready to talk with {selectedCharacter.name}?
                      </h3>
                      <p className="font-sans text-xs text-cream-200/60 max-w-md mb-6 leading-relaxed">
                        Initialize an immersive audio-video call to experience direct synthetic eye contact and sub-180ms neural responses.
                      </p>
                      <button 
                        onClick={startCall}
                        className="px-6 py-3 rounded-full bg-cream-50 hover:bg-cream-100 text-ocean-950 text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer relative z-20"
                      >
                        Connect Face-To-Face
                      </button>
                    </div>
                  </motion.div>
                ) : isConnecting ? (
                  // Connecting State
                  <motion.div 
                    key="connecting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-ocean-950 z-20"
                  >
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full border-2 border-sage-500/20 border-t-sage-400 animate-spin" />
                      <RefreshCw className="w-6 h-6 text-sage-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <span className="font-mono text-xs text-sage-400 uppercase tracking-widest animate-pulse">
                      Synthesizing WebRTC Connection...
                    </span>
                    <p className="text-[11px] text-cream-200/40 mt-2">
                      Resolving neural audio pipeline, matching phoneme matrix nodes
                    </p>
                  </motion.div>
                ) : (
                  // Active call screen
                  <motion.div 
                    key="active-call"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Character Video Feed Representation */}
                    <FallbackImage 
                      baseName={selectedCharacter.id}
                      fallbackUrl={selectedCharacter.avatarUrl} 
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover select-none object-top filter contrast-[1.05] brightness-[0.95]"
                    />

                    {/* Subtle micro-motion background glow mapping active state */}
                    <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                      conversationState === 'speaking' ? 'bg-sage-500/5 shadow-[inset_0_0_80px_rgba(107,142,114,0.15)]' :
                      conversationState === 'listening' ? 'bg-ocean-500/5 shadow-[inset_0_0_80px_rgba(27,73,101,0.15)]' : 'bg-transparent'
                    }`} />

                    {/* Interactive Subtitles Box (Runway character model styled) */}
                    <AnimatePresence>
                      {activeSpeechText && conversationState === 'speaking' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-28 left-4 right-4 sm:left-8 sm:right-8 bg-ocean-950/85 backdrop-blur-md p-4 rounded-xl border border-ocean-800 z-20 shadow-xl"
                        >
                          <span className="font-mono text-[9px] font-bold text-sage-400 uppercase tracking-wider block mb-1">
                            {selectedCharacter.name} (v2.4 Core Voice)
                          </span>
                          <p className="font-sans text-xs sm:text-sm text-cream-50 leading-relaxed font-light">
                            {activeSpeechText}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Small User Camera Overlay PiP Box */}
                    {isCamOn && (
                      <div className="absolute bottom-28 right-4 w-28 sm:w-36 aspect-[3/4] sm:aspect-video rounded-xl bg-ocean-950 border border-ocean-800/80 overflow-hidden shadow-2xl z-20">
                        <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline 
                          muted 
                          className="w-full h-full object-cover transform -scale-x-100"
                        />
                        <span className="absolute bottom-1.5 left-1.5 font-mono text-[8px] bg-ocean-950/80 px-1.5 py-0.5 rounded text-cream-200 border border-ocean-800">
                          USER FEED
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Controls Bar (Visible only when in-call) */}
            <div className="p-4 sm:p-6 bg-gradient-to-t from-ocean-950 to-transparent absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center space-y-4">
              
              {/* Telemetry Waveform */}
              {isCalling && (
                <div className="flex items-center space-x-1 bg-ocean-950/85 backdrop-blur-md px-4 py-2.5 rounded-full border border-ocean-800 w-full sm:w-auto min-w-[280px] justify-between shadow-lg">
                  <span className="font-mono text-[10px] text-sage-400 font-bold uppercase tracking-wider select-none">
                    {conversationState === 'idle' && 'STANDBY'}
                    {conversationState === 'listening' && 'LISTENING'}
                    {conversationState === 'synthesizing' && 'THINKING...'}
                    {conversationState === 'speaking' && 'SPEAKING'}
                  </span>
                  
                  {/* Visualizer Wave Bars */}
                  <div className="flex items-center space-x-1 h-5">
                    {audioBars.map((val, idx) => (
                      <div 
                        key={idx}
                        className={`w-0.5 rounded-full transition-all duration-100 ${
                          conversationState === 'speaking' ? 'bg-sage-400 wave-bar' :
                          conversationState === 'listening' ? 'bg-ocean-100' : 'bg-ocean-800'
                        }`}
                        style={{ 
                          height: `${val}px`,
                          animationDelay: `${idx * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Functional Phone Action Toggles */}
              <div className="flex items-center space-x-4">
                {/* Mute Mic */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all border shadow-lg ${
                    isMuted 
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30' 
                      : 'bg-ocean-900/90 text-cream-50 border-ocean-800 hover:bg-ocean-800'
                  }`}
                  title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                  disabled={!isCalling}
                >
                  {isMuted ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
                </motion.button>

                {/* Main CONNECT / DISCONNECT Trigger */}
                {!isCalling ? (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startCall}
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-sage-500 hover:bg-sage-600 text-ocean-950 font-sans text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center space-x-2 border border-sage-400 cursor-pointer shadow-lg shadow-sage-950/20"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Talk Face-to-Face</span>
                  </motion.button>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={endCall}
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center space-x-2 border border-rose-500 cursor-pointer shadow-lg shadow-rose-950/20"
                  >
                    <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Disconnect Call</span>
                  </motion.button>
                )}

                {/* Toggle Camera */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCam}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all border shadow-lg ${
                    isCamOn 
                      ? 'bg-sage-500/20 text-sage-300 border-sage-500/40 hover:bg-sage-500/30' 
                      : 'bg-ocean-900/90 text-cream-50 border-ocean-800 hover:bg-ocean-800'
                  }`}
                  title={isCamOn ? "Disable Camera Input" : "Enable Camera Input"}
                >
                  {isCamOn ? <VideoIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <VideoOff className="w-4 h-4 sm:w-5 sm:h-5" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* RIGHT: Sophisticated Interactive Control Panel (5 cols) */}
          <div className="lg:col-span-5 bg-ocean-900/50 rounded-3xl border border-ocean-800/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            
            <div className="flex flex-col space-y-6">
              
              {/* Selected Character Metadata */}
              <div className="pb-6 border-b border-ocean-800 flex items-center space-x-4">
                <FallbackImage 
                  baseName={selectedCharacter.id}
                  fallbackUrl={selectedCharacter.avatarUrl} 
                  alt={selectedCharacter.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-ocean-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-lg font-medium text-white truncate">{selectedCharacter.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${
                      selectedCharacter.status === 'Available' ? 'bg-sage-400' :
                      selectedCharacter.status === 'In Call' ? 'bg-amber-400' : 'bg-ocean-800'
                    }`} />
                  </div>
                  <p className="font-sans text-xs text-cream-200/50 truncate leading-tight mt-0.5">{selectedCharacter.role}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedCharacter.badges?.map((tag, idx) => (
                      <span key={idx} className="bg-ocean-950 text-sage-400 border border-ocean-800 text-[8px] font-mono font-semibold tracking-wide uppercase px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Character Directory List (Horizontal mini roster select) */}
              <div>
                <span className="font-mono text-[10px] font-bold text-sage-400 tracking-wider uppercase block mb-3 select-none">
                  Switch Active Face Matrix
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2.5">
                  {CHARACTERS.map((char) => {
                    const isActive = selectedCharacter.id === char.id;
                    return (
                      <button
                        key={char.id}
                        onClick={() => selectCharacterInCall(char)}
                        className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                          isActive 
                            ? 'bg-sage-500/10 border-sage-500/50 text-white' 
                            : 'bg-ocean-950/40 border-ocean-800/40 text-cream-200/60 hover:border-ocean-800 hover:bg-ocean-900'
                        }`}
                      >
                        <div className="relative">
                          <FallbackImage 
                            baseName={char.id}
                            fallbackUrl={char.avatarUrl} 
                            alt={char.name}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-ocean-900 ${
                            char.status === 'Available' ? 'bg-sage-400' :
                            char.status === 'In Call' ? 'bg-amber-400' : 'bg-rose-500'
                          }`} />
                        </div>
                        <span className="font-sans text-[10px] font-medium mt-1.5 truncate w-full">
                          {char.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simulated Conversation Prompt Recommendations */}
              <div>
                <span className="font-mono text-[10px] font-bold text-sage-400 tracking-wider uppercase block mb-3 select-none">
                  Select Topic to Speak
                </span>
                <div className="space-y-2">
                  {selectedCharacter.responseOptions.map((option, idx) => (
                    <button
                      key={idx}
                      disabled={!isCalling || conversationState !== 'idle'}
                      onClick={() => handleUserMessage(option)}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-center justify-between ${
                        !isCalling 
                          ? 'bg-ocean-950/10 border-ocean-900/50 text-cream-200/30 cursor-not-allowed'
                          : conversationState !== 'idle'
                            ? 'bg-ocean-950/20 border-ocean-800 text-cream-200/40 cursor-not-allowed'
                            : 'bg-ocean-950/40 border-ocean-800/50 hover:border-sage-500/30 hover:bg-ocean-900 text-cream-200 hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-4">{option}</span>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                        !isCalling ? 'text-ocean-900' : 'text-sage-500/60'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Interactive Message Terminal */}
            <div className="mt-8 pt-6 border-t border-ocean-800">
              {permissionError && (
                <div className="bg-amber-500/10 text-amber-300 text-[10px] leading-normal border border-amber-500/20 p-2.5 rounded-xl mb-4 flex items-start space-x-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{permissionError}</span>
                </div>
              )}

              <span className="font-mono text-[10px] font-bold text-sage-400 tracking-wider uppercase block mb-2 select-none">
                Interactive Text Terminal
              </span>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customText.trim()) handleUserMessage(customText);
                }}
                className="flex items-center space-x-2 relative"
              >
                <input 
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  disabled={!isCalling || conversationState !== 'idle'}
                  placeholder={
                    !isCalling 
                      ? "Connect call to begin typing..." 
                      : conversationState === 'listening' 
                        ? "Listening..."
                        : conversationState === 'synthesizing'
                          ? "Synthesizing vocal expressions..."
                          : "Type a thought, then press send..."
                  }
                  className="flex-1 bg-ocean-950 border border-ocean-800 rounded-xl px-4 py-3.5 text-xs text-cream-100 placeholder-ocean-100/30 focus:outline-none focus:border-sage-500/50 transition-colors disabled:cursor-not-allowed disabled:bg-ocean-950/35"
                />
                <button
                  type="submit"
                  disabled={!isCalling || !customText.trim() || conversationState !== 'idle'}
                  className="p-3.5 rounded-xl bg-sage-500 hover:bg-sage-600 disabled:bg-ocean-800/80 text-ocean-950 disabled:text-ocean-100/30 transition-colors cursor-pointer flex items-center justify-center shadow-md disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-cream-200/30 font-mono mt-2 uppercase select-none">
                <span>Secured WebRTC Audio Node</span>
                <span>Press Enter to talk</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
