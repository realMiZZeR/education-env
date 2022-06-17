import React, { useState, createContext } from 'react';

export const MessagesContext = createContext(null);

export const MessagesProvider = ({ children }) => {

    const [ currentDialogue, setCurrentDialogue ] = useState(null);


    const value = {
        currentDialogue,
        setCurrentDialogue
    }

    return <MessagesContext.Provider value={value}>
        { children }
    </MessagesContext.Provider>
}