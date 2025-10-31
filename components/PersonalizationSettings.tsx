import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useClickSound } from '../hooks/useClickSound';
import { Shelf as ShelfType, App } from '../types';
import { TrashIcon } from '../constants';

interface PersonalizationSettingsProps {
  shelves: ShelfType[];
  setShelves: React.Dispatch<React.SetStateAction<ShelfType[]>>;
  shelfStyle: 'linear' | 'carousel';
  setShelfStyle: (style: 'linear' | 'carousel') => void;
}

const PersonalizationSettings: React.FC<PersonalizationSettingsProps> = ({ shelves, setShelves, shelfStyle, setShelfStyle }) => {
  const themeContext = useContext(ThemeContext);
  const playClickSound = useClickSound();
  
  const [draggedShelfIndex, setDraggedShelfIndex] = useState<number | null>(null);
  const [draggedAppInfo, setDraggedAppInfo] = useState<{ shelfIndex: number; appIndex: number } | null>(null);
  const [newShelfName, setNewShelfName] = useState('');

  if (!themeContext) return null;

  const { currentTheme, setTheme, availableThemes } = themeContext;

  const handleThemeChange = (themeId: string) => {
    playClickSound();
    setTheme(themeId);
  };
  
  const handleShelfDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedShelfIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleShelfDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    if (draggedShelfIndex === null) return;
    const newShelves = [...shelves];
    const draggedShelf = newShelves.splice(draggedShelfIndex, 1)[0];
    newShelves.splice(dropIndex, 0, draggedShelf);
    setShelves(newShelves);
    setDraggedShelfIndex(null);
  };
  
  const handleAppDragStart = (e: React.DragEvent<HTMLDivElement>, shelfIndex: number, appIndex: number) => {
    setDraggedAppInfo({ shelfIndex, appIndex });
    e.dataTransfer.effectAllowed = 'move';
    e.stopPropagation();
  };

  const handleAppDropOnShelf = (e: React.DragEvent<HTMLDivElement>, targetShelfIndex: number) => {
    if (!draggedAppInfo) return;
    const { shelfIndex: fromShelfIndex, appIndex: fromAppIndex } = draggedAppInfo;
    if (fromShelfIndex === targetShelfIndex) return; // Dropping on same shelf handled by app drop

    const newShelves = JSON.parse(JSON.stringify(shelves));
    const draggedApp = newShelves[fromShelfIndex].apps.splice(fromAppIndex, 1)[0];
    newShelves[targetShelfIndex].apps.push(draggedApp);

    setShelves(newShelves);
    setDraggedAppInfo(null);
    e.stopPropagation();
  };
  
  const handleAppDropOnApp = (e: React.DragEvent<HTMLDivElement>, targetShelfIndex: number, targetAppIndex: number) => {
    if (!draggedAppInfo) return;
    const { shelfIndex: fromShelfIndex, appIndex: fromAppIndex } = draggedAppInfo;

    const newShelves = JSON.parse(JSON.stringify(shelves));
    const draggedApp = newShelves[fromShelfIndex].apps.splice(fromAppIndex, 1)[0];
    newShelves[targetShelfIndex].apps.splice(targetAppIndex, 0, draggedApp);

    setShelves(newShelves);
    setDraggedAppInfo(null);
    e.stopPropagation();
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  
  const handleAddShelf = (e: React.FormEvent) => {
      e.preventDefault();
      if (newShelfName.trim() === '') return;
      const newShelf: ShelfType = {
          id: newShelfName.trim().toLowerCase().replace(/\s+/g, '-') + Date.now(),
          name: newShelfName.trim(),
          apps: []
      };
      setShelves(prev => [...prev, newShelf]);
      setNewShelfName('');
      playClickSound();
  };

  const handleDeleteShelf = (shelfId: string) => {
      setShelves(prev => prev.filter(shelf => shelf.id !== shelfId));
      playClickSound();
  }

  const AppPill: React.FC<{ app: App; onDragStart: (e: React.DragEvent<HTMLDivElement>) => void; onDrop: (e: React.DragEvent<HTMLDivElement>) => void; isDragging: boolean }> = ({ app, onDragStart, onDrop, isDragging }) => {
    const IconComponent = app.icon;
    return (
      <div
        draggable
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={handleDragOver}
        className={`flex items-center space-x-2 bg-white/10 p-2 rounded-lg cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-30' : ''}`}
      >
        <IconComponent className="w-5 h-5 text-blue-300" />
        <span className="text-sm">{app.name}</span>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-8">
      {/* Theme Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <div className="space-y-2">
          {availableThemes.map((theme) => (
            <button key={theme.id} onClick={() => handleThemeChange(theme.id)} className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${currentTheme.id === theme.id ? 'bg-blue-600 font-bold' : 'bg-white/10 hover:bg-white/20'}`}>
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Customization */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Desktop Customization</h3>
        <div className='mb-6'>
          <h4 className='text-md font-bold mb-2 text-gray-300'>Shelf Display Style</h4>
          <div className='flex space-x-2'>
              <button onClick={() => setShelfStyle('linear')} className={`px-4 py-2 rounded-lg ${shelfStyle === 'linear' ? 'bg-blue-600 font-bold' : 'bg-white/10 hover:bg-white/20'}`}>Linear</button>
              <button onClick={() => setShelfStyle('carousel')} className={`px-4 py-2 rounded-lg ${shelfStyle === 'carousel' ? 'bg-blue-600 font-bold' : 'bg-white/10 hover:bg-white/20'}`}>Carousel</button>
          </div>
        </div>
        <div>
          <h4 className='text-md font-bold mb-2 text-gray-300'>Organize Shelves & Apps</h4>
          <p className="text-sm text-gray-400 mb-4">Drag and drop shelves to reorder them, or drag apps to move them within or between shelves.</p>

          <form onSubmit={handleAddShelf} className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newShelfName}
                onChange={(e) => setNewShelfName(e.target.value)}
                placeholder="New shelf name..."
                className="flex-grow bg-white/10 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold">Add</button>
          </form>

          <div className="space-y-4">
            {shelves.map((shelf, shelfIndex) => (
              <div
                key={shelf.id}
                draggable
                onDragStart={(e) => handleShelfDragStart(e, shelfIndex)}
                onDrop={(e) => handleShelfDrop(e, shelfIndex)}
                onDragOver={handleDragOver}
                onDragEnd={() => setDraggedShelfIndex(null)}
                className={`p-4 bg-black/30 rounded-lg border border-white/10 cursor-grab active:cursor-grabbing ${draggedShelfIndex === shelfIndex ? 'opacity-30' : ''}`}
              >
                <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold text-md">{shelf.name}</h5>
                    <button onClick={() => handleDeleteShelf(shelf.id)} className="p-1 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-full">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2" onDrop={(e) => handleAppDropOnShelf(e, shelfIndex)} onDragOver={handleDragOver}>
                  {shelf.apps.map((app, appIndex) => (
                    <AppPill 
                      key={app.id}
                      app={app}
                      isDragging={draggedAppInfo?.shelfIndex === shelfIndex && draggedAppInfo?.appIndex === appIndex}
                      onDragStart={(e) => handleAppDragStart(e, shelfIndex, appIndex)}
                      onDrop={(e) => handleAppDropOnApp(e, shelfIndex, appIndex)}
                    />
                  ))}
                   {shelf.apps.length === 0 && (
                      <div className="col-span-full text-center text-sm text-gray-500 py-4">
                        Drag apps here to add them to this shelf.
                      </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationSettings;