import React, { useEffect, useRef } from 'react';
import { ContextMenuItem } from '../types';

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // A timeout is used to prevent the menu from closing on the same click that opens it.
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('contextmenu', handleClickOutside);
    }, 0);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [onClose]);

  const style: React.CSSProperties = {
    top: `${y}px`,
    left: `${x}px`,
  };

  return (
    <div
      ref={menuRef}
      style={style}
      className="fixed z-[100] w-56 bg-black/60 backdrop-blur-xl border border-white/10 rounded-md shadow-2xl p-1"
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing it
    >
      <ul className="text-white text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.separator && <li className="h-px bg-white/10 my-1" />}
            <li
              onClick={() => {
                if(item.disabled) return;
                item.onClick();
                onClose();
              }}
              className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${item.disabled ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-blue-500 cursor-pointer'}`}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;