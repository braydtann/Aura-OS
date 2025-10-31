
import React, { useCallback, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useClickSound = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("useClickSound must be used within a ThemeProvider");
    }

    const { currentTheme } = themeContext;
    
    const playClickSound = useCallback(() => {
        if (currentTheme?.clickSound) {
            const audio = new Audio(currentTheme.clickSound);
            audio.volume = 0.5;
            audio.play().catch(e => console.error("Error playing sound:", e));
        }
    }, [currentTheme]);

    return playClickSound;
};
   