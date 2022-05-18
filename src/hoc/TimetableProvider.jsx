import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const TimetableContext = createContext(null);

export const TimetableProvider = ({ children }) => {

    const { user } = useAuth();

    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ selectedGroup, setSelectedGroup ] = useState(null);
    const [ selectedTeacher, setSelectedTeacher ] = useState(null);
    const [ isTeacher, setIsTeacher ] = useState(false);

    const timetableTeacherToken = async () => {
        await axios.get(
            'http://server.selestia.ru/api/schedule/getScheduleTeacherToken',
            {params: { token: user.token } }
        ).then(response => {
            const { idTeacher } = response.data;
            setSelectedTeacher(idTeacher);
        }).catch(error => console.warn(error))
    }

    const timetableStudentToken = async () => {
        await axios.post(
            'http://server.selestia.ru/api/getScheduleToken',
            {token: user.token}
        ).then(response => {
            setSelectedGroup(response.data.groupId);
        }).catch(error => console.log(error.toJSON()));
    }

    useEffect(() => {
        setSelectedGroup(null);
        setSelectedTeacher(null);
        if(user?.role === 0) timetableStudentToken();
        if(user?.role === 1) timetableTeacherToken();
    }, [isTeacher]);

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
        isTeacher,
        setIsTeacher
    }

    return (
        <TimetableContext.Provider value={value}>
            { children }
        </TimetableContext.Provider>
    )
}