import React from 'react';
import { Event } from '../types';
import { Moon, Star, Sun, AlertTriangle } from 'lucide-react';
import EventMap from './EventMap';

interface EventsListProps {
  events: Event[];
  showAll: boolean;
}

const EventsList: React.FC<EventsListProps> = ({ events, showAll }) => {
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  const displayEvents = showAll ? sortedEvents : sortedEvents.slice(0, 3);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meteor':
        return <Star className="w-6 h-6 text-yellow-400" />;
      case 'solar':
        return <Sun className="w-6 h-6 text-orange-400" />;
      case 'lunar':
        return <Moon className="w-6 h-6 text-blue-400" />;
      case 'natural':
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      default:
        return <Star className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {displayEvents.map(event => (
        <div
          key={event.id}
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:border-purple-400/50 transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {event.title}
                  </h3>
                  <p className="text-purple-400 text-sm mb-2">
                    {event.date.toLocaleDateString()} {event.duration && `• ${event.duration}`}
                  </p>
                </div>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60">
                  {event.location}
                </span>
              </div>
              <p className="text-white/60 mb-4">
                {event.description}
              </p>
              {event.viewingTips && (
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-purple-400 mb-2">
                    Viewing Tips
                  </h4>
                  <p className="text-white/60 text-sm">
                    {event.viewingTips}
                  </p>
                </div>
              )}
              {event.category && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-white/60">Category:</span>
                  <span className="px-2 py-1 bg-white/5 rounded-full text-sm text-purple-400">
                    {event.category.title}
                  </span>
                </div>
              )}
              {event.coordinates && <EventMap event={event} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;