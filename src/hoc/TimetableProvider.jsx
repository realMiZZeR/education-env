import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const TimetableContext = createContext(null);

export const TimetableProvider = ({ children }) => {

    const { user } = useAuth();

    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ selectedGroup, setSelectedGroup ] = useState(null);
    const [ selectedTeacher, setSelectedTeacher ] = useState(null);

    useEffect(() => {
        setSelectedDate(new Date().toLocaleDateString('ru-RU'));
    }, []);

    const value = {
        selectedDate,
        selectedGroup,
        selectedTeacher,
        setSelectedDate,
        setSelectedGroup,
        setSelectedTeacher,
    }

    return (
        <TimetableContext.Provider value={value}>
            { children }
        </TimetableContext.Provider>
    )
}