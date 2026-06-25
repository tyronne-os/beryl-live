export interface Character {
  id: string;
  name: string;
  role: string;
  status: 'Available' | 'Busy' | 'In Call' | 'Offline';
  voice: string;
  avatarUrl: string;
  greeting: string;
  responseOptions: string[];
  badges?: string[];
}

export interface ShowcaseVideo {
  id: string;
  title: string;
  category: string;
  videoUrl: string; // fallback if standard video element is used
  thumbnailUrl: string;
  duration: string;
  description: string;
  modelName: string;
}

export interface ManifestoPoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric?: {
    value: string;
    label: string;
  };
}
