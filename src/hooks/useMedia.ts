import { useState, useRef, useCallback } from 'react';

export function useMedia() {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const stopMediaTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }
  }, []);

  const toggleVideo = useCallback(async () => {
    try {
      if (isVideoOn) {
        stopMediaTracks();
        setIsVideoOn(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsVideoOn(true);
      }
    } catch (err) {
      setError('Failed to access camera');
      console.error('Error accessing camera:', err);
    }
  }, [isVideoOn, stopMediaTracks]);

  const toggleAudio = useCallback(async () => {
    try {
      if (isAudioOn) {
        if (streamRef.current) {
          const audioTracks = streamRef.current.getAudioTracks();
          audioTracks.forEach(track => track.stop());
        }
        setIsAudioOn(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsAudioOn(true);
    } catch (err) {
      setError('Failed to access microphone');
      console.error('Error accessing microphone:', err);
    }
  }, [isAudioOn]);

  const toggleScreenShare = useCallback(async () => {
    try {
      if (isScreenSharing) {
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsScreenSharing(false);
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (screenRef.current) {
        screenRef.current.srcObject = stream;
        screenStreamRef.current = stream;
        setIsScreenSharing(true);

        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
      }
    } catch (err) {
      setError('Failed to share screen');
      console.error('Error sharing screen:', err);
    }
  }, [isScreenSharing]);

  return {
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
  };
}

export default useMedia;