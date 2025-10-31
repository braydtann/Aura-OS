import React, { useState, useRef, useEffect } from 'react';
import { MinimizeIcon } from '../constants';

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  minimized: boolean;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


const Window: React.FC<WindowProps> = ({ title, onClose, onMinimize, onFocus, minimized, children, initialPosition, initialSize }) => {
  const [position, setPosition] = useState(initialPosition || { x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 });
  const [size, setSize] = useState(initialSize || { width: 800, height: 600 });
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartInfo = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  
  const MIN_WIDTH = 400;
  const MIN_HEIGHT = 300;
  
  // Dragging Logic
  const onDragMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onFocus(); // Bring to front when dragging starts
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !windowRef.current) return;
    
    let newX = e.clientX - dragStartPos.current.x;
    let newY = e.clientY - dragStartPos.current.y;
    
    const { offsetWidth, offsetHeight } = windowRef.current;
    newX = Math.max(0, Math.min(newX, window.innerWidth - offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - offsetHeight));
    
    setPosition({ x: newX, y: newY });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  // Resizing Logic
  const onResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsResizing(true);
      resizeStartInfo.current = {
          width: size.width,
          height: size.height,
          mouseX: e.clientX,
          mouseY: e.clientY
      };
      onFocus(); // Bring to front when resizing starts
  };

  const onResizeMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const dx = e.clientX - resizeStartInfo.current.mouseX;
      const dy = e.clientY - resizeStartInfo.current.mouseY;

      const newWidth = Math.max(MIN_WIDTH, resizeStartInfo.current.width + dx);
      const newHeight = Math.max(MIN_HEIGHT, resizeStartInfo.current.height + dy);
      
      setSize({ width: newWidth, height: newHeight });
  };

  const onResizeMouseUp = () => {
      setIsResizing(false);
  };
  
  useEffect(() => {
    if (isResizing) {
        document.addEventListener('mousemove', onResizeMouseMove);
        document.addEventListener('mouseup', onResizeMouseUp);
    }
    return () => {
        document.removeEventListener('mousemove', onResizeMouseMove);
        document.removeEventListener('mouseup', onResizeMouseUp);
    };
  }, [isResizing]);


  if (minimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="fixed z-30 bg-black/50 backdrop-blur-xl text-white rounded-lg border border-blue-500/30 shadow-2xl flex flex-col"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        maxWidth: '95vw',
        maxHeight: '90vh'
      }}
      onClick={onFocus}
    >
      <div
        className="h-10 bg-white/5 px-4 flex items-center justify-between cursor-grab active:cursor-grabbing rounded-t-lg border-b border-blue-500/30"
        onMouseDown={onDragMouseDown}
      >
        <h3 className="font-bold text-sm select-none">{title}</h3>
        <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="p-1 rounded-full hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Minimize Window"
            >
              <MinimizeIcon />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 rounded-full hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Close Window"
            >
              <CloseIcon />
            </button>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-auto custom-scrollbar relative">
        {children}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={onResizeMouseDown}
          style={{ 
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.2) 50%)'
          }}
        />
      </div>
    </div>
  );
};

export default Window;