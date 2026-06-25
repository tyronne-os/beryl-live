import React, { useState, useRef } from "react";
import { 
  Play, Pause, Volume2, Subtitles, Activity, Eye, Sliders, ChevronDown, Check, Clock 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SHOWCASE_VIDEOS } from "../data";
import { ShowcaseVideo } from "../types";
import FallbackImage from "./FallbackImage";

export default function VideoQualityShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const categories = ["All", "Corporate", "Customer Experience", "Healthcare", "Developer Relations"];

  const filteredVideos = selectedCategory === "All"
    ? SHOWCASE_VIDEOS
    : SHOWCASE_VIDEOS.filter(vid => vid.category === selectedCategory);

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (activeVideo === id) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else {
      // Pause current active video if exists
      if (activeVideo && videoRefs.current[activeVideo]) {
        videoRefs.current[activeVideo]?.pause();
      }
      setActiveVideo(id);
      video.play();
    }
  };

  const handleSpeedChange = (id: string, speed: number) => {
    setPlaybackSpeed(speed);
    const video = videoRefs.current[id];
    if (video) {
      video.playbackRate = speed;
    }
  };

  const handleMuteToggle = (id: string) => {
    setIsMuted(!isMuted);
    const video = videoRefs.current[id];
    if (video) {
      video.muted = !isMuted;
    }
  };

  return (
    <section className="bg-cream-50 py-24 px-4 sm:px-6 lg:px-8 border-b border-cream-200" id="showcase">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <span className="font-mono text-xs font-bold text-sage-600 uppercase tracking-widest bg-sage-100 px-3 py-1 rounded-full border border-sage-200/50 inline-flex items-center space-x-1.5 mb-4">
              <Activity className="w-3.5 h-3.5" />
              <span>PHOTOREAL NEURAL ALIGNMENT</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ocean-900 tracking-tight leading-none">
              High-Fidelity Action Grid
            </h2>
            <p className="font-sans text-sm text-ocean-900/60 mt-4 leading-relaxed font-light">
              Observe how our models retain alignment, eye gaze vector coordinates, and muscular micro-vibrations across varying domains. Click any card to launch real-time rendering.
            </p>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2 bg-cream-100 p-1.5 rounded-full border border-cream-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-ocean-900 text-cream-50 shadow-sm"
                    : "text-ocean-900/60 hover:text-ocean-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* VIDEOS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="quality-showcase-video-grid">
          {filteredVideos.map((video) => {
            const isCurrentPlaying = activeVideo === video.id;
            
            return (
              <motion.div
                layout
                key={video.id}
                className="bg-white rounded-3xl border border-cream-300 overflow-hidden shadow-sm hover:shadow-md hover:border-sage-400/40 transition-all flex flex-col justify-between"
              >
                {/* Visual Viewport */}
                <div className="relative aspect-video bg-ocean-950 group/video cursor-pointer" onClick={() => togglePlay(video.id)}>
                  
                  {/* HTML5 video tag */}
                  <video
                    ref={el => { videoRefs.current[video.id] = el; }}
                    src={video.videoUrl}
                    loop
                    muted={isMuted}
                    playsInline
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isCurrentPlaying ? "opacity-100" : "opacity-0 absolute pointer-events-none"
                    }`}
                  />

                  {/* Fallback image when not playing */}
                  {!isCurrentPlaying && (
                    <FallbackImage
                      baseName={`${video.modelName.toLowerCase().replace("dr. ", "julian").replace(".", "")}_thumbnail`}
                      fallbackUrl={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover select-none object-top filter contrast-[1.05] brightness-[0.95]"
                    />
                  )}

                  {/* Play Overlay (Visible when not playing or on hover) */}
                  <div className={`absolute inset-0 bg-ocean-950/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 z-10 ${
                    isCurrentPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                  }`}>
                    <div className="w-16 h-16 rounded-full bg-white/95 text-ocean-900 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/video:scale-105">
                      {!isCurrentPlaying ? (
                        <Play className="w-6 h-6 fill-ocean-900 translate-x-0.5" />
                      ) : (
                        <Pause className="w-6 h-6 fill-ocean-900" />
                      )}
                    </div>
                  </div>

                  {/* Subtitles Overlay */}
                  <AnimatePresence>
                    {isCurrentPlaying && showSubtitles && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-16 left-6 right-6 bg-ocean-950/85 backdrop-blur-md px-4 py-2 rounded-xl text-[11px] font-sans text-cream-100 border border-ocean-800 pointer-events-none text-center z-15 shadow-xl"
                      >
                        [Voice Profile Synthesized - {video.modelName} (v2.4)]: Analyzing database fields for {video.category.toLowerCase()} client alignment...
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Duration Tag */}
                  <div className="absolute top-4 right-4 bg-ocean-950/80 px-2.5 py-1 rounded text-[10px] font-mono text-cream-300 border border-ocean-800 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-sage-400" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Active Telemetry Line overlay */}
                  {isCurrentPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-sage-500 origin-left animate-[marquee_10s_linear_infinite]" />
                  )}
                </div>

                {/* Video Info and Controls Dashboard */}
                <div className="p-6 sm:p-8 flex flex-col space-y-6 bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-sage-600 bg-sage-50 border border-sage-100 px-2.5 py-1 rounded uppercase tracking-wider">
                        {video.category}
                      </span>
                      <h3 className="font-serif text-xl font-medium text-ocean-900 mt-2">{video.title}</h3>
                      <p className="font-sans text-xs text-ocean-900/60 mt-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Control strip */}
                  <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center justify-between gap-4">
                    {/* Play / pause button */}
                    <button
                      onClick={() => togglePlay(video.id)}
                      className="px-4 py-2 rounded-full border border-cream-300 hover:border-sage-400/50 bg-white text-xs font-semibold text-ocean-900 flex items-center space-x-2 transition-all cursor-pointer shadow-sm hover:bg-cream-50"
                    >
                      {isCurrentPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-sage-600" />
                          <span>Pause Clip</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-sage-600 fill-sage-600" />
                          <span>Play Render</span>
                        </>
                      )}
                    </button>

                    {/* Speech adjustments */}
                    <div className="flex items-center space-x-4">
                      
                      {/* Subtitles Toggle */}
                      <button
                        onClick={() => setShowSubtitles(!showSubtitles)}
                        className={`p-2 rounded-lg border transition-all cursor-pointer ${
                          showSubtitles 
                            ? "bg-sage-500/10 border-sage-500/40 text-sage-700" 
                            : "bg-white border-cream-300 text-ocean-900/50 hover:text-ocean-900"
                        }`}
                        title="Toggle Subtitles"
                      >
                        <Subtitles className="w-4 h-4" />
                      </button>

                      {/* Mute toggle */}
                      <button
                        onClick={() => handleMuteToggle(video.id)}
                        className={`p-2 rounded-lg border transition-all cursor-pointer ${
                          isMuted 
                            ? "bg-rose-50 border-rose-200 text-rose-500" 
                            : "bg-white border-cream-300 text-ocean-900/50 hover:text-ocean-900"
                        }`}
                        title="Mute Audio Stream"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Speed selectors */}
                      <div className="flex items-center bg-cream-100 p-1 rounded-lg border border-cream-200 text-[10px] font-semibold text-ocean-900/60">
                        {[0.5, 1, 1.5].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(video.id, speed)}
                            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                              playbackSpeed === speed 
                                ? "bg-white text-ocean-900 shadow-sm" 
                                : "hover:text-ocean-900"
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
