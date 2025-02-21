import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Moon, Star, Sun, Search, Info, Users, Mail } from 'lucide-react';
import Calendar from './components/Calendar';
import EventSidebar from './components/EventSidebar';
import EventsList from './components/EventsList';
import { Event } from './types';

const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Meteor Shower',
    date: new Date(2024, 2, 15),
    description: 'Annual Geminids meteor shower peaks tonight. Best viewing conditions after midnight.',
    type: 'meteor',
    location: 'Visible worldwide',
    duration: '6 hours',
    intensity: 'High',
    viewingTips: 'Find a dark location away from city lights. Allow 30 minutes for your eyes to adjust to darkness.',
  },
  {
    id: 2,
    title: 'Solar Eclipse',
    date: new Date(2024, 2, 20),
    description: 'Partial solar eclipse visible from North America. Remember to use proper eye protection!',
    type: 'solar',
    location: 'North America',
    duration: '2 hours 30 minutes',
    intensity: 'Medium',
    viewingTips: 'Use certified eclipse glasses. Never look directly at the sun without proper protection.',
  },
  {
    id: 3,
    title: 'Lunar Eclipse',
    date: new Date(2024, 2, 25),
    description: 'Total lunar eclipse visible from most of Europe and Asia.',
    type: 'lunar',
    location: 'Europe and Asia',
    duration: '3 hours',
    intensity: 'High',
    viewingTips: 'No special equipment needed. Best viewed with binoculars or a small telescope.',
  },
  {
    id: 4,
    title: 'Venus at Maximum Brightness',
    date: new Date(2024, 2, 28),
    description: 'Venus reaches its peak brightness in the evening sky.',
    type: 'other',
    location: 'Global',
    duration: 'Several days',
    intensity: 'Medium',
    viewingTips: 'Look west after sunset. Venus will be the brightest object in the sky after the Moon.',
  }
];

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  const selectedEvents = selectedDate
    ? sampleEvents.filter(event => 
        event.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  const filteredEvents = searchQuery
    ? sampleEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleEvents;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/30 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-10 h-10 text-purple-400" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Space Astronomy Calendar
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  Track celestial events and plan your stargazing
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 w-64"
                />
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="#calendar" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Calendar
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#community" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover the Wonders of the Night Sky
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            Never miss another celestial event. From meteor showers to eclipses, 
            we help you track and prepare for all astronomical phenomena.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-purple-400" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </button>
                </div>
              </div>
              
              <Calendar
                currentMonth={currentMonth}
                events={sampleEvents}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            {/* Events List Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  Upcoming Events
                </h2>
                <button
                  onClick={() => setShowAllEvents(!showAllEvents)}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showAllEvents ? 'Show Less' : 'View All'}
                </button>
              </div>
              <EventsList
                events={filteredEvents}
                showAll={showAllEvents}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <EventSidebar
              events={selectedEvents}
              selectedDate={selectedDate}
              onClose={() => setSelectedDate(null)}
            />

            {/* Quick Tips Section */}
            <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-4">
                Stargazing Tips
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Moon className="w-5 h-5 text-purple-400 mt-1" />
                  <p className="text-white/60">Check moonrise and moonset times for optimal viewing conditions</p>
                </li>
                <li className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-purple-400 mt-1" />
                  <p className="text-white/60">Find dark sky locations away from city lights</p>
                </li>
                <li className="flex items-start space-x-3">
                  <Sun className="w-5 h-5 text-purple-400 mt-1" />
                  <p className="text-white/60">Allow your eyes to adjust to darkness for at least 30 minutes</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">About Us</h4>
              <p className="text-white/60 text-sm">
                Dedicated to making astronomy accessible and exciting for everyone.
                Track celestial events and explore the wonders of the universe.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#calendar" className="text-white/60 hover:text-white transition-colors">Calendar</a>
                </li>
                <li>
                  <a href="#events" className="text-white/60 hover:text-white transition-colors">Events</a>
                </li>
                <li>
                  <a href="#community" className="text-white/60 hover:text-white transition-colors">Community</a>
                </li>
                <li>
                  <a href="#resources" className="text-white/60 hover:text-white transition-colors">Resources</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#forum" className="text-white/60 hover:text-white transition-colors">Forum</a>
                </li>
                <li>
                  <a href="#blog" className="text-white/60 hover:text-white transition-colors">Blog</a>
                </li>
                <li>
                  <a href="#discord" className="text-white/60 hover:text-white transition-colors">Discord</a>
                </li>
                <li>
                  <a href="#social" className="text-white/60 hover:text-white transition-colors">Social Media</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
              <p className="text-white/60 text-sm mb-4">
                Subscribe to receive updates about upcoming celestial events.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 flex-1"
                />
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              © 2024 Space Astronomy Calendar. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#contact" className="text-white/60 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;