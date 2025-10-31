import React, { useState, useEffect, useRef } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import { ThemeProvider } from './contexts/ThemeContext';
import { TrashProvider } from './contexts/TrashContext';
import { useClickSound } from './hooks/useClickSound';
import PowerDrawer from './components/PowerDrawer';
import { SHELVES } from './constants';
import { Shelf as ShelfType, App, OpenApp, TrashItem, ContextMenuItem } from './types';
import Window from './components/Window';
import FileManager from './components/FileManager';
import SettingsWindow from './components/SettingsWindow';
import SystemTray from './components/SystemTray';
import NotificationsPanel from './components/NotificationsPanel';
import BluetoothPanel from './components/BluetoothPanel';
import LoginScreen from './components/LoginScreen';
import SearchPanel from './components/SearchPanel';
import ContextMenu from './components/ContextMenu';
import RenameAppModal from './components/RenameAppModal';
import TrashWindow from './components/TrashWindow';

interface HomeButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick, isOpen }) => (
  <button
    onClick={onClick}
    className={`fixed bottom-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center ${
      isOpen ? 'left-6 translate-x-0' : 'left-1/2 -translate-x-1/2'
    }`}
    aria-label={isOpen ? 'Close Taskbar' : 'Open Taskbar'}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  </button>
);

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isTaskbarOpen, setTaskbarOpen] = useState(false);
  const [isPowerDrawerOpen, setPowerDrawerOpen] = useState(false);
  const [isNotificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [isBluetoothPanelOpen, setBluetoothPanelOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [shelves, setShelves] = useState<ShelfType[]>(SHELVES);
  const [shelfStyle, setShelfStyle] = useState<'linear' | 'carousel'>('carousel');
  const [openApps, setOpenApps] = useState<OpenApp[]>([]);
  
  // Accessibility State
  const [textSize, setTextSize] = useState(1); // multiplier
  const [highContrast, setHighContrast] = useState(false);
  
  // Search Settings State
  const [searchFiles, setSearchFiles] = useState(true);
  const [searchApps, setSearchApps] = useState(true);
  const [searchInternet, setSearchInternet] = useState(true);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, app: App } | null>(null);
  
  // Rename Modal State
  const [renameModal, setRenameModal] = useState<{ app: App } | null>(null);
  
  // Trash State
  const [trashedItems, setTrashedItems] = useState<TrashItem[]>([]);

  const playClickSound = useClickSound();
  
  // Correctly determine the active app ID as the last non-minimized app in the stack.
  const activeApp = [...openApps].reverse().find(app => !app.minimized);
  const activeAppId = activeApp ? activeApp.id : null;

  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const bluetoothButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Apply accessibility settings globally
    document.documentElement.style.fontSize = `${16 * textSize}px`;
    if (highContrast) {
        document.documentElement.classList.add('high-contrast');
    } else {
        document.documentElement.classList.remove('high-contrast');
    }
  }, [textSize, highContrast]);

  const closeAllPopups = () => {
    setContextMenu(null);
    setTaskbarOpen(false);
    setNotificationsPanelOpen(false);
    setBluetoothPanelOpen(false);
    setIsSearchOpen(false);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeAllPopups();
        }
    };
    
    // The global click handler was too aggressive. It closed popups on any click,
    // including clicks on buttons that open them, making them seem broken.
    // Individual components like ContextMenu and panels already handle outside clicks.
    // const handleClick = () => closeAllPopups();

    window.addEventListener('keydown', handleKeyDown);
    // window.addEventListener('click', handleClick);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        // window.removeEventListener('click', handleClick);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Close all apps and panels on logout
    setOpenApps([]);
    setTaskbarOpen(false);
    setNotificationsPanelOpen(false);
    setBluetoothPanelOpen(false);
    setIsSearchOpen(false);
  };

  const toggleTaskbar = () => {
      playClickSound();
      setTaskbarOpen(prev => !prev);
  };

  const handleToggleNotifications = () => {
    playClickSound();
    setBluetoothPanelOpen(false);
    setNotificationsPanelOpen(prev => !prev);
  };

  const handleToggleBluetooth = () => {
    playClickSound();
    setNotificationsPanelOpen(false);
    setBluetoothPanelOpen(prev => !prev);
  };

  const handleToggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  }

  const bringToFront = (appId: string) => {
    const appToMove = openApps.find(app => app.id === appId);
    if (!appToMove) return;
    const otherApps = openApps.filter(app => app.id !== appId);
    setOpenApps([...otherApps, appToMove]);
  };
  
  const handleAppClick = (app: App) => {
    const existingApp = openApps.find(openApp => openApp.id === app.id);
    if (existingApp) {
        if (existingApp.minimized) {
             setOpenApps(prev => prev.map(a => a.id === app.id ? {...a, minimized: false } : a));
        }
        bringToFront(app.id);
        return;
    }

    let appComponent: React.ReactNode = null;

    if (app.id === 'file-explorer') {
      appComponent = <FileManager />;
    } else if (app.id === 'settings') {
      appComponent = <SettingsWindow 
        shelves={shelves}
        setShelves={setShelves}
        shelfStyle={shelfStyle}
        setShelfStyle={setShelfStyle}
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        searchFiles={searchFiles}
        setSearchFiles={setSearchFiles}
        searchApps={searchApps}
        setSearchApps={setSearchApps}
        searchInternet={searchInternet}
        setSearchInternet={setSearchInternet}
      />;
    } else if (app.id === 'trash') {
        appComponent = <TrashWindow />;
    }

    if (appComponent) {
      setOpenApps(prev => [...prev, { id: app.id, title: app.name, component: appComponent, minimized: false }]);
    } else {
      console.log(`Launching ${app.name}... (No window component for this app)`);
    }
  };

  const closeApp = (appId: string) => {
      playClickSound();
      setOpenApps(prev => prev.filter(app => app.id !== appId));
  };

  const minimizeApp = (appId: string) => {
      playClickSound();
      setOpenApps(prev => prev.map(app => app.id === appId ? { ...app, minimized: true } : app));
  };

  const handleTaskbarAppClick = (appId: string) => {
    const app = openApps.find(a => a.id === appId);
    if (!app) return;

    // If the clicked app is already the active, non-minimized window, minimize it.
    if (app.id === activeAppId && !app.minimized) {
        minimizeApp(appId);
    } else {
        // Otherwise, restore the app (if minimized) and bring it to the front.
        // This handles both restoring minimized apps and focusing background apps.
        const appToUpdate = openApps.find(a => a.id === appId);
        if (!appToUpdate) return;
        
        const updatedApp = { ...appToUpdate, minimized: false };
        const otherApps = openApps.filter(a => a.id !== appId);
        
        setOpenApps([...otherApps, updatedApp]);
    }
  };

  const openPowerDrawer = () => {
    setPowerDrawerOpen(true);
    setTaskbarOpen(false);
  }

  const closePowerDrawer = () => {
    playClickSound();
    setPowerDrawerOpen(false);
  }

  // --- Trash Logic ---
  const addToTrash = (item: TrashItem) => {
    if (item.type === 'app') {
      setShelves(prevShelves => prevShelves.map(shelf => ({
        ...shelf,
        apps: shelf.apps.filter(app => app.id !== item.item.id)
      })).filter(shelf => shelf.apps.length > 0 || shelf.id !== 'new-shelf'));
    }
    setTrashedItems(prev => [...prev, item]);
  };

  const restoreItem = (itemToRestore: TrashItem) => {
    if (itemToRestore.type === 'app') {
      setShelves(prev => {
        const newShelves = [...prev];
        // For simplicity, add to the first shelf if it exists, otherwise create one.
        if (newShelves.length > 0) {
            // Check if app already exists to prevent duplicates
            if (!newShelves[0].apps.some(app => app.id === itemToRestore.item.id)) {
                 newShelves[0].apps.push(itemToRestore.item);
            }
        } else {
            newShelves.push({id: 'restored', name: 'Restored Apps', apps: [itemToRestore.item]})
        }
        return newShelves;
      });
    }
    // Remove from trash
    setTrashedItems(prev => prev.filter(i => i.item.id !== itemToRestore.item.id));
  };
  
  const permanentlyDeleteItem = (itemToDelete: TrashItem) => {
    setTrashedItems(prev => prev.filter(i => i.item.id !== itemToDelete.item.id));
  };
  
  const emptyTrash = () => {
    setTrashedItems([]);
  };

  // --- Context Menu Logic ---
  const handleAppContextMenu = (event: React.MouseEvent, app: App) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({ x: event.clientX, y: event.clientY, app });
  };

  const handleRenameApp = (appToRename: App, newName: string) => {
    setShelves(prevShelves => prevShelves.map(shelf => ({
        ...shelf,
        apps: shelf.apps.map(app => app.id === appToRename.id ? { ...app, name: newName } : app)
    })));
    setRenameModal(null);
  };
  
  const getContextMenuItems = (app: App): ContextMenuItem[] => [
    { label: 'Open', onClick: () => handleAppClick(app) },
    { label: 'Check for Updates', onClick: () => console.log(`Checking for updates for ${app.name}...`) },
    { label: 'Rename', onClick: () => setRenameModal({ app }), separator: true },
    { label: 'Move to Trash', onClick: () => addToTrash({ type: 'app', item: app }) },
    { label: 'Uninstall', onClick: () => addToTrash({ type: 'app', item: app }) },
  ];

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <TrashProvider value={{ trashedItems, addToTrash, restoreItem, permanentlyDeleteItem, emptyTrash }}>
      <div className={`w-screen h-screen overflow-hidden text-white relative ${highContrast ? 'filter invert(1) hue-rotate(180)' : ''}`}>
        <Desktop shelves={shelves} shelfStyle={shelfStyle} onAppClick={handleAppClick} onAppContextMenu={handleAppContextMenu} />

        <SystemTray />

        <div className="absolute inset-0 pointer-events-none">
            {openApps.map((app, index) => (
                <div key={app.id} style={{ zIndex: 10 + index }} className="pointer-events-auto">
                    <Window
                        title={app.title}
                        onClose={() => closeApp(app.id)}
                        onMinimize={() => minimizeApp(app.id)}
                        onFocus={() => bringToFront(app.id)}
                        minimized={app.minimized}
                    >
                        {app.component}
                    </Window>
                </div>
            ))}
        </div>


        <SearchPanel 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onAppClick={handleAppClick}
            searchFiles={searchFiles}
            searchApps={searchApps}
            searchInternet={searchInternet}
        />

        <Taskbar 
            isOpen={isTaskbarOpen} 
            openApps={openApps}
            activeAppId={activeAppId}
            onOpenAppClick={handleTaskbarAppClick}
            onLaunchAppClick={handleAppClick}
            onPowerClick={openPowerDrawer}
            onNotificationsClick={handleToggleNotifications}
            onBluetoothClick={handleToggleBluetooth}
            onSearchClick={handleToggleSearch}
            notificationRef={notificationButtonRef}
            bluetoothRef={bluetoothButtonRef}
        />
        <NotificationsPanel 
            isOpen={isNotificationsPanelOpen} 
            onClose={() => setNotificationsPanelOpen(false)}
            anchorRef={notificationButtonRef}
        />
        <BluetoothPanel 
            isOpen={isBluetoothPanelOpen}
            onClose={() => setBluetoothPanelOpen(false)}
            anchorRef={bluetoothButtonRef}
        />
        <PowerDrawer isOpen={isPowerDrawerOpen} onClose={closePowerDrawer} onLogout={handleLogout} />
        <HomeButton onClick={toggleTaskbar} isOpen={isTaskbarOpen} />

        {contextMenu && (
            <ContextMenu 
              x={contextMenu.x} 
              y={contextMenu.y} 
              items={getContextMenuItems(contextMenu.app)}
              onClose={() => setContextMenu(null)}
            />
        )}
        {renameModal && (
            <RenameAppModal
              app={renameModal.app}
              onRename={handleRenameApp}
              onClose={() => setRenameModal(null)}
            />
        )}
        </div>
    </TrashProvider>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
