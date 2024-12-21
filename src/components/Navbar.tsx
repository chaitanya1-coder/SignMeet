import React from 'react';
import { Video } from 'lucide-react';

const Navbar = () => {
  return (
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
  );
};

export default Navbar;