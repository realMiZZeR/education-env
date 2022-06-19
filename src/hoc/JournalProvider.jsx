import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const JournalContext = createContext(null);

export const JournalProvider = ({children}) => {

    const [ selectedDiscipline, setSelectedDiscipline ] = useState(null);
    const [ selectedGroup, setSelectedGroup ] = useState(null);
    const [ selectedMonth, setSelectedMonth ] = useState(null);

    useEffect(() => {

    });

    const value = {
        selectedDiscipline,
        setSelectedDiscipline,
        setSelectedGroup,
        setSelectedMonth,
    }

    return (
        <JournalContext.Provider value={value}>
            {children}
        </JournalContext.Provider>
    )
}