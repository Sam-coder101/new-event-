import React, { useState } from 'react';
import { Code, Users, Copy, LogOut } from 'lucide-react';
import Editor from '@monaco-editor/react';
import type { Event, User } from '../types';
import MediaControls from './MediaControls';
import Toast from './Toast';
import useMedia from '../hooks/useMedia';

interface DashboardProps {
  event: Event;
  currentUser: User;
  onLeave: () => void;
}

export default function Dashboard({ event, currentUser, onLeave }: DashboardProps) {
  const {
    isVideoOn,
    isAudioOn,
    isScreenSharing,
    videoRef,
    screenRef,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    error,
    clearError,
  } = useMedia();

  const [isCompilerOpen, setIsCompilerOpen] = useState(false);
  const [code, setCode] = useState('// Start coding here');
  const [participants] = useState<User[]>([currentUser]);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);

  const copyJoinCode = () => {
    if (event.joinCode) {
      navigator.clipboard.writeText(event.joinCode);
      setToast({ message: 'Join code copied to clipboard!', type: 'success' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                {event.isAdmin && event.joinCode && (
                  <button
                    onClick={copyJoinCode}
                    className="inline-flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    title="Copy join code"
                  >
                    <span className="text-sm font-medium mr-2">{event.joinCode}</span>
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{event.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <MediaControls
                isVideoOn={isVideoOn}
                isAudioOn={isAudioOn}
                isScreenSharing={isScreenSharing}
                onVideoToggle={toggleVideo}
                onAudioToggle={toggleAudio}
                onScreenShare={toggleScreenShare}
                isAdmin={event.isAdmin}
              />
              <button
                onClick={onLeave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {event.isAdmin ? 'End Meeting' : 'Leave Meeting'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video and Screen Share Section */}
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Live Session</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full aspect-video bg-black rounded-lg"
                />
                <video
                  ref={screenRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-video bg-black rounded-lg"
                />
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Participants</h2>
              </div>
              <ul className="space-y-2">
                {participants.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="flex-1">{user.name}</span>
                    {user.isAdmin && (
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                        Admin
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Online Compiler Section */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Online Compiler</h2>
                <button
                  onClick={() => setIsCompilerOpen(!isCompilerOpen)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Code className="h-5 w-5" />
                </button>
              </div>
              {isCompilerOpen && (
                <div className="h-[600px] border rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {(error || toast) && (
        <Toast
          message={error || toast?.message || ''}
          type={error ? 'error' : (toast?.type || 'info')}
          onClose={() => {
            clearError();
            setToast(null);
          }}
        />
      )}
    </div>
  );
}