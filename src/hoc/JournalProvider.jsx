import React, { createContext, useState } from 'react';

export const JournalContext = createContext(null);

export const JournalProvider = ({children}) => {

    const [ selectedDiscipline, setSelectedDiscipline ] = useState(null);

    const value = {
        setSelectedDiscipline
    }

    return (
        <JournalContext.Provider value={value}>
            {children}
        </JournalContext.Provider>
    )
}