import { Character, ShowcaseVideo, ManifestoPoint } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: "amanda",
    name: "Amanda",
    role: "Brand Concierge & Spokesperson",
    status: "Available",
    voice: "Warm, sophisticated, British (RP)",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    greeting: "Hello, I am Amanda. Welcome to Beryl Live. We have spent years believing that typing text into a dull chat box was the apex of AI communication. But let's be honest: we need to have a face to face. How can I help launch your brand today?",
    responseOptions: [
      "Why is face-to-face AI better than a normal chatbot?",
      "Can we talk about the audio latency and sync speed?",
      "How do we configure a custom avatar for our own brand?"
    ],
    badges: ["Core Model", "Ultra Low Latency"]
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Enterprise Advisory Lead",
    status: "Available",
    voice: "Deep, resonant, Mid-Atlantic",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    greeting: "Good day. I am Marcus, heading our Enterprise advisory sector. I operate with our premium custom coat-of-arms livery, which represents our strict commitment to fidelity and security. Shall we discuss how adding a face to your enterprise solution improves user retention by forty percent?",
    responseOptions: [
      "Tell me about Beryl's secure data compliance.",
      "What are the engagement metrics for business?",
      "How does Beryl interface with existing CRM databases?"
    ],
    badges: ["Enterprise", "Encryption Certified"]
  },
  {
    id: "evelyn",
    name: "Evelyn",
    role: "Executive Performance Coach",
    status: "In Call",
    voice: "Articulate, measured, English",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    greeting: "Welcome. I am Evelyn, an Executive Performance Advisor here at Beryl. In executive management, trust is earned face-to-face, through posture, micro-expressions, and active tone. That's exactly what Beryl has synthesized. Tell me about your growth plans.",
    responseOptions: [
      "How do micro-expressions convey credibility?",
      "What is the average session duration with coaching avatars?",
      "Can we script custom intellectual frameworks for you?"
    ],
    badges: ["Coaching", "Pro-Active Response"]
  },
  {
    id: "dr-julian",
    name: "Dr. Julian",
    role: "VP of Neural Synthesis",
    status: "Available",
    voice: "Thoughtful, academic, Swiss-German accent",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    greeting: "Guten Tag. I'm Julian. I lead our neural synthesis division. Our proprietary pipeline processes audio phonemes into highly expressive, 3D muscle-deformed video feeds within forty milliseconds. It completely eliminates the uncanny valley. Ask me anything about our math.",
    responseOptions: [
      "Explain the phoneme-to-expression mapping network.",
      "How does the model handle natural blinking and breathing?",
      "What kind of GPU cluster runs this in real-time?"
    ],
    badges: ["Technical", "PhD Advisor"]
  },
  {
    id: "priya",
    name: "Priya",
    role: "Cross-Cultural Communication Director",
    status: "Available",
    voice: "Warm, clear, global Indian accent",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    greeting: "Namaste. I am Priya. My mission is to translate corporate presence globally. The Beryl engine supports thirty-two languages natively, not just in voice, but adjusting facial gestures to respect cultural nuances. How can we take your business global?",
    responseOptions: [
      "Which languages do you support with lip-sync?",
      "How are cultural gestures synchronized?",
      "Can Beryl handle emotional switches mid-sentence?"
    ],
    badges: ["Multilingual", "Global Accents"]
  },
  {
    id: "kyra",
    name: "Kyra",
    role: "Conversational Creative Director",
    status: "Busy",
    voice: "Vibrant, dynamic, Australian",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    greeting: "Hi there! I'm Kyra, and I focus on the 'human' in high-tech humanism. Designing avatars isn't about rigid code; it's about drafting warmth, comfortable pauses, and natural eye-saccades. What personality are you looking to create?",
    responseOptions: [
      "Can we design a custom voice with Beryl?",
      "How do you configure pauses and sighs in responses?",
      "What makes a character feel warm instead of cold?"
    ],
    badges: ["Creative", "Interactive Design"]
  }
];

export const MANIFESTO_POINTS: ManifestoPoint[] = [
  {
    id: "anti-box",
    title: "The Text Box is an Evolutionary Dead-End",
    subtitle: "We did not evolve to talk to machines. We evolved to look at faces.",
    description: "For the last five years, generative AI has been trapped in a chat box. We typing, waiting, and reading cold paragraphs. But ninety-three percent of human communication is non-verbal. Beryl breaks AI out of the grid, restoring eye contact, vocal hesitation, micro-smiles, and raw human connection.",
    metric: {
      value: "93%",
      label: "of communication is non-verbal"
    }
  },
  {
    id: "latency",
    title: "Sub-180ms Response. Truly Conversational.",
    subtitle: "If there is a delay, it is not a conversation. It's an intercom.",
    description: "Our proprietary neural audio-to-video synthesizer compiles audio phonemes into fluid lip-sync and ocular micro-movements in real-time. By deploying massive scale Edge clusters directly paired with LLM backends, we've broken the latency barrier, making the response feel as natural as talking to a person across the table.",
    metric: {
      value: "180ms",
      label: "Average response latency"
    }
  },
  {
    id: "fidelity",
    title: "Bypassing the Uncanny Valley",
    subtitle: "Authenticity lies in the details that you can't consciously point out.",
    description: "Traditional avatars feel like flat cardboard. Beryl models physical details: pupils dilating with engagement, natural dry lip swallowing, clothing shifts based on breathing cycles, and soft skin reflection matching the environment's virtual light sources.",
    metric: {
      value: "4K",
      label: "Real-time neural rendering output"
    }
  }
];

export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    id: "vid-1",
    title: "Financial Strategy Real-time Interaction",
    category: "Corporate",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-businesswoman-giving-a-presentation-at-a-meeting-40505-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    duration: "1:24",
    description: "Marcus presenting real-time investment options. Notice the natural eye-contact and physical stance adjustments.",
    modelName: "Marcus"
  },
  {
    id: "vid-2",
    title: "Global Brand Onboarding & Customer Concierge",
    category: "Customer Experience",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-at-office-with-laptop-and-smiling-41865-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    duration: "0:45",
    description: "Amanda directing a customer through visual dashboard widgets. Lip-sync latency is completely indistinguishable from real life.",
    modelName: "Amanda"
  },
  {
    id: "vid-3",
    title: "Executive Medical & Clinical Communication",
    category: "Healthcare",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-female-doctor-smiling-with-stethoscope-around-her-neck-41121-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    duration: "1:12",
    description: "Simulation of our clinical coaching model answering complicated patient files with deep empathy indicators.",
    modelName: "Evelyn"
  },
  {
    id: "vid-4",
    title: "Automated Tech-Support Diagnostics Node",
    category: "Developer Relations",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-his-office-42173-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    duration: "2:05",
    description: "Dr. Julian parsing code issues, outputting terminal code directly side-by-side with interactive video.",
    modelName: "Dr. Julian"
  }
];
