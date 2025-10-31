import React, { useState } from 'react';
import { Shelf as ShelfType } from '../types';
import { DisplayIcon, SoundIcon, WifiIcon, PersonalizationIcon, BluetoothIcon, AccessibilityIcon, UpdateIcon, SearchIcon } from '../constants';
import MultiMonitorSettings from './MultiMonitorSettings';
import VolumeSettings from './VolumeSettings';
import WifiSettings from './WifiSettings';
import PersonalizationSettings from './PersonalizationSettings';
import BluetoothSettings from './BluetoothSettings';
import AccessibilitySettings from './AccessibilitySettings';
import UpdateSettings from './UpdateSettings';
import SearchSettings from './SearchSettings';

type SettingsCategory = 'display' | 'sound' | 'network' | 'personalization' | 'bluetooth' | 'accessibility' | 'updates' | 'search';

interface SettingsWindowProps {
  // Personalization props
  shelves: ShelfType[];
  setShelves: React.Dispatch<React.SetStateAction<ShelfType[]>>;
  shelfStyle: 'linear' | 'carousel';
  setShelfStyle: (style: 'linear' | 'carousel') => void;
  // Accessibility props
  textSize: number;
  setTextSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  // Search props
  searchFiles: boolean;
  setSearchFiles: (enabled: boolean) => void;
  searchApps: boolean;
  setSearchApps: (enabled: boolean) => void;
  searchInternet: boolean;
  setSearchInternet: (enabled: boolean) => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = (props) => {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('display');

  const categories = [
    { id: 'display', label: 'Display', icon: DisplayIcon },
    { id: 'sound', label: 'Sound', icon: SoundIcon },
    { id: 'network', label: 'Network & Internet', icon: WifiIcon },
    { id: 'bluetooth', label: 'Bluetooth & Devices', icon: BluetoothIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'accessibility', label: 'Accessibility', icon: AccessibilityIcon },
    { id: 'personalization', label: 'Personalization', icon: PersonalizationIcon },
    { id: 'updates', label: 'System Updates', icon: UpdateIcon },
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'display':
        return <MultiMonitorSettings />;
      case 'sound':
        return <VolumeSettings />;
      case 'network':
        return <WifiSettings />;
       case 'bluetooth':
        return <BluetoothSettings />;
      case 'search':
        return <SearchSettings 
            searchFiles={props.searchFiles}
            setSearchFiles={props.setSearchFiles}
            searchApps={props.searchApps}
            setSearchApps={props.setSearchApps}
            searchInternet={props.searchInternet}
            setSearchInternet={props.setSearchInternet}
        />;
      case 'accessibility':
        return <AccessibilitySettings 
            textSize={props.textSize} 
            setTextSize={props.setTextSize}
            highContrast={props.highContrast}
            setHighContrast={props.setHighContrast}
        />;
      case 'personalization':
        return <PersonalizationSettings 
            shelves={props.shelves} 
            setShelves={props.setShelves} 
            shelfStyle={props.shelfStyle} 
            setShelfStyle={props.setShelfStyle} 
        />;
      case 'updates':
        return <UpdateSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex text-white bg-black/20">
      {/* Sidebar */}
      <nav className="w-1/3 max-w-[280px] bg-black/30 p-4 border-r border-white/10 flex flex-col space-y-2 overflow-y-auto custom-scrollbar">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id as SettingsCategory)}
            className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors ${
              activeCategory === id ? 'bg-blue-600 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            <Icon className="w-6 h-6 flex-shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">{categories.find(c => c.id === activeCategory)?.label}</h2>
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default SettingsWindow;
