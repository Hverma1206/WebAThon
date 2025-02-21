import React from 'react';
import { X } from 'lucide-react';
import { Event } from '../types';

interface EventSidebarProps {
  events: Event[];
  selectedDate: Date | null;
  onClose: () => void;
}

const EventSidebar: React.FC<EventSidebarProps> = ({
  events,
  selectedDate,
  onClose,
}) => {
  if (!selectedDate || events.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
        <p className="text-white/60 text-center">
          Select a date to view events
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          Events for {selectedDate.toLocaleDateString()}
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-purple-400" />
        </button>
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-400/50 transition-colors"
          >
            <h4 className="text-lg font-medium text-white mb-2">
              {event.title}
            </h4>
            <p className="text-white/60 text-sm">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSidebar;