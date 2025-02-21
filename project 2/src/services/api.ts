import axios from 'axios';
import { EONETEvent, Event } from '../types';
import { format } from 'date-fns';

const EONET_API = 'https://eonet.gsfc.nasa.gov/api/v3';

export async function fetchEONETEvents(): Promise<Event[]> {
  try {
    const response = await axios.get<{ events: EONETEvent[] }>(
      `${EONET_API}/events?page=1&limit=10`
    );

    return response.data.events.map(event => transformEONETEvent(event));
  } catch (error) {
    console.error('Error fetching EONET events:', error);
    return [];
  }
}

function transformEONETEvent(eonetEvent: EONETEvent): Event {
  const geometry = eonetEvent.geometry[0];
  const category = eonetEvent.categories[0];
  const source = eonetEvent.sources[0];

  return {
    id: eonetEvent.id,
    title: eonetEvent.title,
    date: new Date(geometry.date),
    description: eonetEvent.description || `Natural event observed at coordinates: ${geometry.coordinates.join(', ')}`,
    type: 'natural',
    location: `Lat: ${geometry.coordinates[1]}, Long: ${geometry.coordinates[0]}`,
    coordinates: geometry.coordinates,
    category,
    source,
    viewingTips: source ? `More information available at: ${source.url}` : undefined
  };
}