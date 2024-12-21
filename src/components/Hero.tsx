import React from 'react';
import { Video } from 'lucide-react';

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-12 gap-12">
      <div className="flex-1 space-y-8">
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Video calls and meetings for everyone
        </h1>
        <p className="text-xl text-gray-600">
          Connect, collaborate, and celebrate from anywhere with Sign Meet
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Video className="w-5 h-5" />
            New meeting
          </button>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter a code or link"
              className="px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[250px]"
            />
            <button className="bg-gray-50 px-6 py-3 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors">
              Join
            </button>
          </div>
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
  );
};

export default Hero;