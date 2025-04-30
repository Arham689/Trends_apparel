
import React from 'react';
import { User, Settings } from 'lucide-react';

const Header= () => {
  return (
    <div className="h-16 flex items-center justify-end ">
      <div className="relative">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Settings size={20} />
          </button>
          <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center relative mr-5">
            <User size={20} className="text-primary" />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
