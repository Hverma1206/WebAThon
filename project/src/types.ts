export interface Event {
  id: number;
  title: string;
  date: Date;
  description: string;
  type: 'meteor' | 'solar' | 'lunar' | 'other';
  location: string;
  duration: string;
  intensity: string;
  viewingTips: string;
}