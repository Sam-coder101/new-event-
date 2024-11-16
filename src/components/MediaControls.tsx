import React from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, StopCircle } from 'lucide-react';

interface MediaControlsProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
  onVideoToggle: () => void;
  onAudioToggle: () => void;
  onScreenShare: () => void;
  isAdmin: boolean;
}

export function MediaControls({
  isVideoOn,
  isAudioOn,
  isScreenSharing,
  onVideoToggle,
  onAudioToggle,
  onScreenShare,
  isAdmin,
}: MediaControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onVideoToggle}
        className={`p-2 rounded-full ${
          isVideoOn ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
        } hover:bg-opacity-75`}
        title={isVideoOn ? 'Turn off video' : 'Turn on video'}
      >
        {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
      </button>
      <button
        onClick={onAudioToggle}
        className={`p-2 rounded-full ${
          isAudioOn ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
        } hover:bg-opacity-75`}
        title={isAudioOn ? 'Mute audio' : 'Unmute audio'}
      >
        {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </button>
      {isAdmin && (
        <button
          onClick={onScreenShare}
          className={`p-2 rounded-full ${
            isScreenSharing ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
          } hover:bg-opacity-75`}
          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
        >
          {isScreenSharing ? (
            <StopCircle className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}

export default MediaControls;