import React from 'react';
import { Mic, MicOff, Video, VideoOff, MonitorUp } from 'lucide-react';

interface ControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onEndCall: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isMuted,
  isVideoOff,
  isScreenSharing,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-gray-900/90 p-4 rounded-full backdrop-blur-sm">
      <button
        onClick={onToggleMute}
        className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80`}
      >
        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </button>
      <button
        onClick={onToggleVideo}
        className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80`}
      >
        {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
      </button>
      <button
        onClick={onToggleScreenShare}
        className={`p-4 rounded-full ${isScreenSharing ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-opacity-80`}
      >
        <MonitorUp className="w-6 h-6" />
      </button>
      <button
        onClick={onEndCall}
        className="p-4 rounded-full bg-red-500 hover:bg-red-600"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M21 10.975V12c0 .69-.31 1-.999 1H3.999C3.31 13 3 12.69 3 12v-1.025c0-.69.31-1 .999-1h16.002c.69 0 .999.31.999 1z"/>
          <path d="M6.5 9C5.67 9 5 9.67 5 10.5v3c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-11z"/>
        </svg>
      </button>
    </div>
  );
};