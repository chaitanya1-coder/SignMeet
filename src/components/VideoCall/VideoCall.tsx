import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Controls } from './Controls';
import { ParticipantGrid } from './ParticipantGrid';
import { NamePrompt } from './NamePrompt';
import { useMediaStream } from '../../hooks/useMediaStream';
import { useScreenShare } from '../../hooks/useScreenShare';
import { type Participant } from '../../types/video';

export const VideoCall: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { stream: localStream, isMuted, isVideoOff, toggleMute, toggleVideo } = useMediaStream();
  const { screenStream, isScreenSharing, error: screenShareError, toggleScreenShare } = useScreenShare();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [userName, setUserName] = useState('');

  // Show screen sharing error if any
  useEffect(() => {
    if (screenShareError) {
      // You can implement a proper toast/notification system here
      console.warn(screenShareError);
    }
  }, [screenShareError]);

  const localParticipant: Participant = {
    id: 'local',
    name: userName || 'You',
    stream: isScreenSharing ? screenStream : localStream,
    isMuted: isMuted
  };

  const endCall = () => {
    navigate('/');
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setShowNamePrompt(false);
  };

  if (showNamePrompt) {
    return <NamePrompt onSubmit={handleNameSubmit} onCancel={() => navigate('/')} />;
  }

  return (
    <div className="h-screen bg-gray-900">
      <ParticipantGrid
        participants={participants}
        localParticipant={localParticipant}
      />
      <Controls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onEndCall={endCall}
      />
    </div>
  );
};