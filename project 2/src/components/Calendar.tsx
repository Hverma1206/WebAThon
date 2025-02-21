import React from 'react';
import { Event } from '../types';
import { Moon, Star, Sun } from 'lucide-react';

interface CalendarProps {
  currentMonth: Date;
  events: Event[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  events,
  selectedDate,
  onSelectDate,
}) => {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meteor':
        return <Star className="w-4 h-4 text-yellow-400" />;
      case 'solar':
        return <Sun className="w-4 h-4 text-orange-400" />;
      case 'lunar':
        return <Moon className="w-4 h-4 text-blue-400" />;
      default:
        return <Star className="w-4 h-4 text-purple-400" />;
    }
  };

  const hasEvents = (day: number) => {
    return events.some(
      event =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter(
      event =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day &&
           selectedDate?.getMonth() === currentMonth.getMonth() &&
           selectedDate?.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div
          key={day}
          className="p-2 text-center text-sm font-medium text-purple-400"
        >
          {day}
        </div>
      ))}
      
      {emptyDays.map(day => (
        <div
          key={`empty-${day}`}
          className="aspect-square p-2 text-center"
        />
      ))}
      
      {days.map(day => {
        const dayEvents = getEventsForDay(day);
        const selected = isSelected(day);
        
        return (
          <button
            key={day}
            onClick={() => onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
            className={`
              aspect-square p-2 rounded-lg relative
              transition-all duration-200 ease-in-out
              ${selected
                ? 'bg-purple-500/30 border-2 border-purple-400'
                : hasEvents(day)
                ? 'hover:bg-white/10 bg-white/5'
                : 'hover:bg-white/5'
              }
            `}
          >
            <span className={`
              text-sm font-medium
              ${selected ? 'text-white' : 'text-white/80'}
            `}>
              {day}
            </span>
            
            {dayEvents.length > 0 && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
                {dayEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`
                      transition-transform duration-200
                      hover:scale-125 hover:z-10
                      ${selected ? 'scale-110' : ''}
                    `}
                  >
                    {getEventIcon(event.type)}
                  </div>
                ))}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Calendar;