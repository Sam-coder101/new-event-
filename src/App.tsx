import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import EventForm from './components/EventForm';
import JoinForm from './components/JoinForm';
import Dashboard from './components/Dashboard';
import type { Event, User, JoinFormData } from './types';
import { v4 as uuidv4 } from 'uuid';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventCreate = (event: Event) => {
    const user: User = {
      id: uuidv4(),
      name: 'Admin',
      isAdmin: true,
    };
    setCurrentUser(user);
    setEvents([...events, event]);
    setSelectedEvent(event);
  };

  const handleJoin = (data: JoinFormData) => {
    const event = events.find(e => e.joinCode === data.joinCode);
    if (event) {
      const user: User = {
        id: uuidv4(),
        name: data.name,
        isAdmin: false,
      };
      setCurrentUser(user);
      setSelectedEvent(event);
    }
  };

  const handleLeave = () => {
    setSelectedEvent(null);
    setCurrentUser(null);
  };

  if (selectedEvent && currentUser) {
    return (
      <Dashboard
        event={selectedEvent}
        currentUser={currentUser}
        onLeave={handleLeave}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Calendar className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Event Manager</h1>
          <p className="mt-2 text-lg text-gray-600">Create and manage live events with video chat and collaboration tools</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Event</h2>
            <EventForm onEventCreate={handleEventCreate} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Join Event</h2>
            <JoinForm onJoin={handleJoin} />
          </div>
        </div>

        {events.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Events</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{event.description}</p>
                  <p className="mt-2 text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {event.joinCode && (
                    <p className="mt-2 text-sm text-indigo-600">
                      Join Code: {event.joinCode}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}