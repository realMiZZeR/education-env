import React, { createContext } from 'react';

export const MessagesContext = createContext(null);

export const MessagesProvider = ({ children }) => {

    


    const value = {

    }

    return <MessagesContext.Provider value={value}>
        { children }
    </MessagesContext.Provider>
}