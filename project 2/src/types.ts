export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string | null;
  type: 'meteor' | 'solar' | 'lunar' | 'other' | 'natural';
  location: string;
  duration?: string;
  intensity?: string;
  viewingTips?: string;
  coordinates?: [number, number];
  source?: {
    id: string;
    url: string;
  };
  category?: {
    id: string;
    title: string;
  };
}

export interface EONETEvent {
  id: string;
  title: string;
  description: string | null;
  link: string;
  closed: string | null;
  categories: Array<{
    id: string;
    title: string;
  }>;
  sources: Array<{
    id: string;
    url: string;
  }>;
  geometry: Array<{
    magnitudeValue: number | null;
    magnitudeUnit: string | null;
    date: string;
    type: string;
    coordinates: [number, number];
  }>;
}