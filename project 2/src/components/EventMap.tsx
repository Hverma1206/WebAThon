import React from 'react';
import { Event } from '../types';

interface EventMapProps {
  event: Event;
}

const EventMap: React.FC<EventMapProps> = ({ event }) => {
  if (!event.coordinates) {
    return null;
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${event.coordinates[1]},${event.coordinates[0]}&zoom=6&size=400x200&markers=color:red%7C${event.coordinates[1]},${event.coordinates[0]}&key=YOUR_GOOGLE_MAPS_API_KEY`;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-purple-400 mb-2">Event Location</h4>
      <div className="bg-white/5 rounded-lg overflow-hidden">
        <img
          src={mapUrl}
          alt={`Map showing location of ${event.title}`}
          className="w-full h-48 object-cover"
        />
      </div>
      <p className="text-white/60 text-sm mt-2">
        Coordinates: {event.coordinates[1]}°N, {event.coordinates[0]}°E
      </p>
    </div>
  );
};

export default EventMap;