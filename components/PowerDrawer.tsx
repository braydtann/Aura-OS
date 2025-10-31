import React, { useEffect } from 'react';
import { useClickSound } from '../hooks/useClickSound';
import { LogoutIcon } from '../constants';

interface PowerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const PowerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
    </svg>
);

const RebootIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.691V5.25a2.25 2.25 0 0 0-2.25-2.25h-4.5a2.25 2.25 0 0 0-2.25 2.25v6.75" />
    </svg>
);


const PowerDrawer: React.FC<PowerDrawerProps> = ({ isOpen, onClose, onLogout }) => {
  const playClickSound = useClickSound();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleReboot = () => {
    playClickSound();
    console.log("System rebooting...");
    onClose();
  };

  const handleShutdown = () => {
    playClickSound();
    console.log("System shutting down...");
    onClose();
  };

  const handleLogout = () => {
      playClickSound();
      onLogout();
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 backdrop-blur-sm"
        onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black/50 backdrop-blur-xl border-t border-white/10 rounded-t-2xl p-6 transition-transform duration-300 ease-in-out w-full max-w-md ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-around items-center text-white">
            <button onClick={handleLogout} className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/10 transition-colors">
                <LogoutIcon className="w-10 h-10 text-yellow-400" />
                <span className="font-semibold">Log Out</span>
            </button>
            <button onClick={handleReboot} className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/10 transition-colors">
                <RebootIcon className="w-10 h-10 text-blue-400" />
                <span className="font-semibold">Reboot</span>
            </button>
            <button onClick={handleShutdown} className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/10 transition-colors">
                <PowerIcon className="w-10 h-10 text-red-500" />
                <span className="font-semibold">Shut Down</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PowerDrawer;