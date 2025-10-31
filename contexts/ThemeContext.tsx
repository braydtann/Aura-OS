import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Theme } from '../types';
import { THEMES } from '../constants';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [themeId, setThemeId] = useState<string>(THEMES[0].id);

    const currentTheme = useMemo(() => THEMES.find(t => t.id === themeId) || THEMES[0], [themeId]);

    useEffect(() => {
        // Clear all previous classes to ensure a clean slate for the new theme.
        document.body.className = ''; 

        // The background string can contain multiple classes. We must split them
        // and add them individually.
        const backgroundClasses = currentTheme.background.split(' ');
        document.body.classList.add(...backgroundClasses, currentTheme.cursor);
    }, [currentTheme]);

    const setTheme = useCallback((newThemeId: string) => {
        const themeExists = THEMES.some(t => t.id === newThemeId);
        if (themeExists) {
            setThemeId(newThemeId);
        }
    }, []);

    const value = useMemo(() => ({
        currentTheme,
        setTheme,
        availableThemes: THEMES
    }), [currentTheme, setTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};