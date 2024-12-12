import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [trigger, setTrigger] = useState(false);

    // Function to play the sound
    const playSound = () => {
        const audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/8/81/Alarm_or_siren.ogg');
        audio.play().catch((error) => console.error("Error playing sound:", error));
    };

    // Toggle the trigger (this will be used to broadcast the event)
    const triggerEvent = () => {
        setTrigger(true); // Set trigger to true
        setTimeout(() => setTrigger(false), 100); // Reset after a short duration
    };

    // Effect to play sound when trigger changes
    useEffect(() => {
        if (trigger) {
            playSound();
        }
    }, [trigger]);

    return (
        <GlobalContext.Provider value={{ trigger, triggerEvent }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for easier access to context
export const useGlobalContext = () => useContext(GlobalContext);
