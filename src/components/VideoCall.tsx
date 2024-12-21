import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

const VideoCall = () => {
  const { roomId } = useParams();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const initCall = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize WebRTC
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      stream.getTracks().forEach(track => {
        if (peerConnection.current) {
          peerConnection.current.addTrack(track, stream);
        }
      });

      // Handle incoming stream
      peerConnection.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
    };

    initCall();
    return () => {
      localStream?.getTracks().forEach(track => track.stop());
    };
  }, [roomId]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    localStream?.getTracks().forEach(track => track.stop());
    window.location.href = '/';
  };

  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="relative h-full">
        {/* Remote Video (Full Screen) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80`}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80`}
          >
            {isVideoOff ? <VideoOff /> : <Video />}
          </button>
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 hover:bg-red-600"
          >
            <PhoneOff />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;