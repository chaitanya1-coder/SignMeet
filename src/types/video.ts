export interface Participant {
  id: string;
  name: string;
  stream: MediaStream | null;
  isMuted: boolean;
}

export interface VideoCallState {
  participants: Participant[];
  localParticipant: Participant;
}

export interface MediaStreamState {
  stream: MediaStream | null;
  isMuted: boolean;
  isVideoOff: boolean;
}

export interface ScreenShareState {
  stream: MediaStream | null;
  isSharing: boolean;
}