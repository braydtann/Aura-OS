import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Shelf as ShelfType, App } from '../types';
import AppIcon from './AppIcon';

interface ShelfProps {
  shelf: ShelfType;
  onAppClick: (appName: string) => void;
  onAppContextMenu: (event: React.MouseEvent, app: App) => void;
  shelfStyle: 'linear' | 'carousel';
}

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);


// Calculates the 3D transform style for a carousel item based on its position relative to the center
const getStyleForPosition = (position: number) => {
    const absPosition = Math.abs(position);

    // Hide apps that are too far away for performance and aesthetics
    if (absPosition > 3) {
        return { opacity: 0, transform: `scale(0.5)`, zIndex: 0, pointerEvents: 'none' as const };
    }

    const scale = 1.2 - absPosition * 0.25;
    const rotation = position * -35;
    const zIndex = 100 - absPosition * 10;
    const translateZ = -absPosition * 150;
    const translateX = position * 180;
    const opacity = absPosition > 2 ? 0 : 1 - absPosition * 0.4;

    return {
        transform: `translateX(${translateX}px) rotateY(${rotation}deg) scale(${scale}) translateZ(${translateZ}px)`,
        zIndex,
        opacity,
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-out',
        pointerEvents: position === 0 ? 'auto' as const : 'none' as const,
    };
};


const Shelf: React.FC<ShelfProps> = ({ shelf, onAppClick, onAppContextMenu, shelfStyle }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const wheelContainerRef = useRef<HTMLDivElement>(null);
    const isWheeling = useRef(false);

    const handleNext = useCallback(() => {
        if (shelf.apps.length === 0) return;
        setSelectedIndex(prev => (prev + 1) % shelf.apps.length);
    }, [shelf.apps.length]);

    const handlePrev = useCallback(() => {
        if (shelf.apps.length === 0) return;
        setSelectedIndex(prev => (prev - 1 + shelf.apps.length) % shelf.apps.length);
    }, [shelf.apps.length]);

    useEffect(() => {
        const container = wheelContainerRef.current;
        if (!container || shelfStyle !== 'carousel') return;
    
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            // Simple throttle to prevent overly fast scrolling
            if (isWheeling.current) return;
            isWheeling.current = true;
            setTimeout(() => { isWheeling.current = false; }, 100);
    
            if (e.deltaY > 0 || e.deltaX > 0) {
                handleNext();
            } else if (e.deltaY < 0 || e.deltaX < 0) {
                handlePrev();
            }
        };
    
        container.addEventListener('wheel', handleWheel, { passive: false });
    
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [handleNext, handlePrev, shelfStyle]);

    if (shelfStyle === 'linear') {
        return (
            <div className="w-full pb-12 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4 px-8">{shelf.name}</h2>
                <div
                    className="flex items-center space-x-6 overflow-x-auto p-4 px-8 custom-scrollbar"
                >
                    {shelf.apps.map((app) => (
                        <div key={app.id} className="flex-shrink-0">
                            <AppIcon 
                              app={app} 
                              onClick={() => onAppClick(app.name)}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                onAppContextMenu(e, app);
                              }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Carousel Style
    return (
        <div className="w-full pb-12 border-b border-white/10 overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-4 px-8">{shelf.name}</h2>
            <div
                ref={wheelContainerRef}
                className="relative flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{ perspective: '1000px', minHeight: '220px' }}
            >
                {shelf.apps.length > 1 && (
                    <>
                        <button onClick={handlePrev} aria-label="Previous App" className="absolute left-4 md:left-16 top-5/6 -translate-y-1/2 z-[101] bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-blue-300">
                            <ChevronLeftIcon />
                        </button>
                        <button onClick={handleNext} aria-label="Next App" className="absolute right-4 md:right-16 top-5/6 -translate-y-1/2 z-[101] bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-blue-300">
                            <ChevronRightIcon />
                        </button>
                    </>
                )}
                <div 
                    className="relative w-full h-full flex items-center justify-center" 
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {shelf.apps.map((app, index) => {
                        let position = index - selectedIndex;
                        const numApps = shelf.apps.length;
                        
                        // This is the core logic for infinite looping.
                        // If an app is more than halfway around the carousel in one direction,
                        // it's shorter to treat it as coming from the other direction.
                        if (numApps > 1) {
                            const half = numApps / 2;
                            if (position > half) {
                                position -= numApps;
                            } else if (position < -half) {
                                position += numApps;
                            }
                        }

                        return (
                            <div
                                key={app.id}
                                className="absolute"
                                style={getStyleForPosition(position)}
                            >
                                <AppIcon 
                                  app={app} 
                                  onClick={() => onAppClick(app.name)} 
                                  onContextMenu={(e) => {
                                    e.preventDefault();
                                    onAppContextMenu(e, app);
                                  }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Shelf;