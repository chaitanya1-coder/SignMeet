import { useState } from 'react';

export const useScreenShare = () => {
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStream?.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
      setError(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: {
            suppressLocalAudioPlayback: true
          }
        });
        
        setScreenStream(stream);
        setIsScreenSharing(true);
        setError(null);

        stream.getVideoTracks()[0].onended = () => {
          setScreenStream(null);
          setIsScreenSharing(false);
        };
      } catch (error) {
        // Handle specific error cases
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            setError('Screen sharing was denied. Please allow access to share your screen.');
          } else {
            setError('An error occurred while trying to share the screen.');
          }
        }
        setIsScreenSharing(false);
        setScreenStream(null);
      }
    }
  };

  return {
    screenStream,
    isScreenSharing,
    error,
    toggleScreenShare
  };
};