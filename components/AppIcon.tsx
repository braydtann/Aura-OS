import React, { useState } from 'react';
import { App } from '../types';
import { useClickSound } from '../hooks/useClickSound';

interface AppIconProps {
  app: App;
  onClick: () => void;
  onContextMenu: (event: React.MouseEvent) => void;
}

const AppIcon: React.FC<AppIconProps> = ({ app, onClick, onContextMenu }) => {
  const playClickSound = useClickSound();
  const IconComponent = app.icon;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    playClickSound();
    setIsClicked(true); // Start the zoom-in animation
    onClick();

    // Simulate the app "window" closing, which triggers the zoom-out.
    // This provides a "pop" effect even without a real window system.
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={onContextMenu}
      className={`flex flex-col items-center justify-center text-center text-white w-40 h-40 p-4 rounded-lg bg-white/5 hover:bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
        isClicked ? 'scale-125' : ''
      }`}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="text-blue-300">
        <IconComponent className="w-12 h-12" />
      </div>
      <span className="mt-2 text-sm font-medium truncate">{app.name}</span>
    </div>
  );
};

export default AppIcon;