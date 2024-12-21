import React from 'react';
import { ParticipantVideo } from './ParticipantVideo';
import { type Participant } from '../../types/video';

interface ParticipantGridProps {
  participants: Participant[];
  localParticipant: Participant;
}

export const ParticipantGrid: React.FC<ParticipantGridProps> = ({ 
  participants, 
  localParticipant 
}) => {
  const allParticipants = [localParticipant, ...participants];
  
  const gridClassName = React.useMemo(() => {
    const count = allParticipants.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3 || count === 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
  }, [allParticipants.length]);

  return (
    <div className={`grid ${gridClassName} gap-4 p-4 h-full`}>
      {allParticipants.map(participant => (
        <ParticipantVideo
          key={participant.id}
          stream={participant.stream}
          name={participant.name}
          isMuted={participant.isMuted}
          isLocal={participant.id === localParticipant.id}
        />
      ))}
    </div>
  );
};