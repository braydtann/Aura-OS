import React from 'react';
import { Shelf as ShelfType, App } from '../types';
import Shelf from './Shelf';

interface DesktopProps {
  shelves: ShelfType[];
  shelfStyle: 'linear' | 'carousel';
  onAppClick: (app: App) => void;
  onAppContextMenu: (event: React.MouseEvent, app: App) => void;
}

const Desktop: React.FC<DesktopProps> = ({ shelves, shelfStyle, onAppClick, onAppContextMenu }) => {
  return (
    <main className="w-full h-full pt-16 overflow-y-auto custom-scrollbar">
      {shelves.map((shelf) => (
        <Shelf
          key={shelf.id}
          shelf={shelf}
          onAppClick={(appName) => {
            const app = shelf.apps.find(a => a.name === appName);
            if(app) onAppClick(app);
          }}
          onAppContextMenu={onAppContextMenu}
          shelfStyle={shelfStyle}
        />
      ))}
    </main>
  );
};

export default Desktop;