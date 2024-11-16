import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import type { JoinFormData } from '../types';

interface JoinFormProps {
  onJoin: (data: JoinFormData) => void;
}

export default function JoinForm({ onJoin }: JoinFormProps) {
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoin({ name, joinCode });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="joinCode" className="block text-sm font-medium text-gray-700">
          Meeting Code
        </label>
        <input
          type="text"
          id="joinCode"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <LogIn className="h-5 w-5 mr-2" />
        Join Meeting
      </button>
    </form>
  );
}