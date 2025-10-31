import React from 'react';
import { App, OpenApp } from '../types';
import { APPS, NotificationIcon, BluetoothIcon, SearchIcon, PINNED_APPS } from '../constants';
import { useClickSound } from '../hooks/useClickSound';

interface TaskbarProps {
  isOpen: boolean;
  openApps: OpenApp[];
  activeAppId: string | null;
  onOpenAppClick: (appId: string) => void;
  onLaunchAppClick: (app: App) => void;
  onPowerClick: () => void;
  onNotificationsClick: () => void;
  onBluetoothClick: () => void;
  onSearchClick: () => void;
  notificationRef: React.RefObject<HTMLButtonElement>;
  bluetoothRef: React.RefObject<HTMLButtonElement>;
}

const TaskbarAppIcon: React.FC<{
  app: App;
  isRunning: boolean;
  isActive: boolean;
  onClick: () => void;
}> = ({ app, isRunning, isActive, onClick }) => {
    const IconComponent = app.icon;
    
    return (
        <button 
          onClick={onClick} 
          className="relative p-3 rounded-full bg-white/10 hover:bg-blue-500 text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
          title={app.name}
        >
            <IconComponent className="w-8 h-8" />
            {isRunning && (
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full ${isActive ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
            )}
        </button>
    );
};

const PowerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
    </svg>
);

const Taskbar: React.FC<TaskbarProps> = ({ 
    isOpen, 
    openApps,
    activeAppId,
    onOpenAppClick,
    onLaunchAppClick,
    onPowerClick,
    onNotificationsClick,
    onBluetoothClick,
    onSearchClick,
    notificationRef,
    bluetoothRef
}) => {
  const playClickSound = useClickSound();

  const handlePowerClick = () => {
    playClickSound();
    onPowerClick();
  }
  
  const handleSearchClick = () => {
    playClickSound();
    onSearchClick();
  }
  
  // Create a combined list of apps to display on the taskbar.
  // Start with pinned apps, then add any open apps that aren't already pinned.
  const openAppMap = new Map(openApps.map(app => [app.id, app]));
  const pinnedAppIds = new Set(PINNED_APPS.map(app => app.id));
  const taskbarItems: App[] = [...PINNED_APPS];

  openApps.forEach(openApp => {
    if (!pinnedAppIds.has(openApp.id)) {
        const appData = Object.values(APPS).find(a => a.id === openApp.id);
        if (appData) {
            taskbarItems.push(appData);
        }
    }
  });


  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="w-full h-24 bg-black/50 backdrop-blur-xl border-t border-white/10 flex justify-between items-center px-6">
        {/* Left Spacer */}
        <div className="w-1/4"></div>

        {/* Center Icons */}
        <div className="flex-1 flex justify-center items-center space-x-6">
            {taskbarItems.map(appData => {
                const openApp = openAppMap.get(appData.id);
                const isRunning = !!openApp;

                return (
                    <TaskbarAppIcon
                        key={appData.id}
                        app={appData}
                        isRunning={isRunning}
                        isActive={isRunning && appData.id === activeAppId}
                        onClick={() => {
                            playClickSound();
                            if (isRunning) {
                                onOpenAppClick(appData.id);
                            } else {
                                onLaunchAppClick(appData);
                            }
                        }}
                    />
                );
            })}
            
            <div className="w-px h-10 bg-white/20"></div>

            <button onClick={handleSearchClick} className="p-3 rounded-full bg-white/10 hover:bg-blue-500 text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <SearchIcon className="w-8 h-8" />
            </button>
            <button onClick={handlePowerClick} className="p-3 rounded-full bg-white/10 hover:bg-red-500 text-red-400 hover:text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-300">
              <PowerIcon className="w-8 h-8" />
            </button>
        </div>

        {/* Right Status Icons */}
        <div className="w-1/4 flex justify-end items-center space-x-4">
            <button ref={notificationRef} onClick={onNotificationsClick} className="p-3 rounded-full bg-white/10 hover:bg-blue-500 text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <NotificationIcon className="w-7 h-7" />
            </button>
            <button ref={bluetoothRef} onClick={onBluetoothClick} className="p-3 rounded-full bg-white/10 hover:bg-blue-500 text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <BluetoothIcon className="w-7 h-7" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
