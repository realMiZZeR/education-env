import React, { createContext, useState } from 'react';

export const JournalContext = createContext(null);

export const JournalProvider = ({children}) => {

    const [ selectedDiscipline, setSelectedDiscipline ]     = useState(null);
    const [ selectedGroup,  setSelectedGroup ]              = useState(null);
    const [ selectedMonth, setSelectedMonth ]               = useState(null);
    const [ selectedYear, setSelectedYear ]                 = useState(null);

    const value = {
        selectedDiscipline,
        selectedGroup,
        selectedMonth,
        selectedYear,
        setSelectedDiscipline,
        setSelectedGroup,
        setSelectedMonth,
        setSelectedYear,
    }

    return (
        <JournalContext.Provider value={value}>
            {children}
        </JournalContext.Provider>
    )
}