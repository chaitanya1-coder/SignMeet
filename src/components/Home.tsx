import React from 'react';
import { Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateRoomId } from '../utils/roomUtils';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = React.useState('');

  const startNewMeeting = () => {
    const roomId = generateRoomId();
    navigate(`/room/${roomId}`);
  };

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim()) {
      navigate(`/room/${joinCode.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold">Sign Meet</span>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sign in
          </button>
        </div>
      </nav>

      <main>
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-12 gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Video calls and meetings for everyone
            </h1>
            <p className="text-xl text-gray-600">
              Connect, collaborate, and celebrate from anywhere with Sign Meet
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={startNewMeeting}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Video className="w-5 h-5" />
                New meeting
              </button>
              <form onSubmit={joinMeeting} className="flex">
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="Enter a code or link"
                  className="px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[250px]"
                />
                <button 
                  type="submit"
                  className="bg-gray-50 px-6 py-3 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Video conference"
              className="rounded-2xl w-full object-cover aspect-4/3"
            />
          </div>
        </div>
      </main>
    </div>
  );
};