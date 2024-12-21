import React from 'react';
import { MicOff } from 'lucide-react';
import { useVideoRef } from '../../hooks/useVideoRef';
import { useSignLanguageDetection } from '../../hooks/useSignLanguageDetection';
import { getInitials } from '../../utils/video';

interface ParticipantVideoProps {
  stream: MediaStream | null;
  name: string;
  isMuted?: boolean;
  isLocal?: boolean;
}

export const ParticipantVideo: React.FC<ParticipantVideoProps> = ({ 
  stream, 
  name, 
  isMuted = false,
  isLocal = false 
}) => {
  const videoRef = useVideoRef(stream);
  const canvasRef = useSignLanguageDetection(videoRef);
  const initials = React.useMemo(() => getInitials(name), [name]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video">
      {stream ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            className="w-full h-full object-cover"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-4xl text-white font-semibold">{initials}</span>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">{name}</span>
          {isMuted && (
            <div className="bg-red-500 p-1.5 rounded-full">
              <MicOff className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};