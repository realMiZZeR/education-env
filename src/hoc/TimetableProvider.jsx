import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const TimetableContext = createContext(null);

export const TimetableProvider = ({ children }) => {

    const { user } = useAuth();

    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ selectedGroup, setSelectedGroup ] = useState(null);
    const [ selectedTeacher, setSelectedTeacher ] = useState(null);

    console.log(user)

    useEffect(() => {
        setSelectedDate(new Date().toLocaleDateString('ru-RU'));
        if(user?.role === 1) {
            const timetableTeacherToken = async () => {
                await axios.get(
                    'http://server.selestia.ru/api/schedule/getScheduleTeacherToken',
                    {params: { token: user.token } }
                ).then(response => {
                    const { idTeacher } = response.data;
                    setSelectedTeacher(idTeacher);
                }).catch(error => console.warn(error))
            }
        }
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