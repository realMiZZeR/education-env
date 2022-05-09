import React, { createContext, useState } from 'react';

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {

    const [ selectedDiscipline, setSelectedDiscipline ] = useState(null);

    const value = {
        selectedDiscipline,
        setSelectedDiscipline
    }

    return (
        <TasksContext.Provider value={value}>
            { children }
        </TasksContext.Provider>
    );
}