import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import TimetableLessons from './TimetableLessons';

// functions
import getDateYearMonthDay from '../assets/js/getDateYearMonthDay';
import getDayOfWeek from '../assets/js/getDayOfWeek';

// hooks
import { useTimetable } from '../hooks/useTimetable';
import LoadingPage from './LoadingPage';
import { useAuth } from '../hooks/useAuth';

const TimetableComponent = () => {

    const location = useLocation();
    let isHome = (location.pathname === '/home');

    const timetableJSON = {
        schedule: [],
        weekEven: '',
        lastUpdate: ''
    }

    const [ timetable, setTimetable ] = useState(timetableJSON);

    const { selectedDate, selectedGroup, setSelectedGroup, selectedTeacher, isTeacher } = useTimetable();

    const { user } = useAuth();

    useEffect(() => {
        const getUserTimetable = async () => {
            await axios.post(
                'http://server.selestia.ru/api/getScheduleToken',
                {token: user.token}
            ).then(response => {
                setSelectedGroup(response.data.groupId);
            }).catch(error => console.log(error.toJSON()));
        }

        const getTeacherTimetable = async () => {
            await axios.post(
                'http://server.selestia.ru/api/getScheduleToken',
                {token: user.token}
            ).then(response => {
                setSelectedGroup(response.data.groupId);
            }).catch(error => console.log(error.toJSON()));
        }


        if(user?.token && user?.role === 0) getUserTimetable();
        if(user?.token && user?.role === 1) getTeacherTimetable();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // for timetable page
    const [ isScheduleLoading, setIsScheduleLoading ] = useState(null);
    // fetch timetable by group id and selected date
    useEffect(() => {
        const getGroupSchedule = async () => {
            setIsScheduleLoading(true)
            await axios.request({
                url: 'http://server.selestia.ru/api/groupSchedule',
                method: 'get',
                params: {
                    idGroup: selectedGroup,
                    date: getDateYearMonthDay(selectedDate)
                }
            }).then(response => {
                const { schedule, lastUpdate } = response.data;
                setTimetable({
                    schedule: schedule.schedule,
                    weekEven: schedule.weekEven,
                    lastUpdate: lastUpdate
                });
            }).finally(() => setIsScheduleLoading(false));
        }

        const getTeacherSchedule = async () => {
            setIsScheduleLoading(true);
            await axios.request({
                url: 'http://server.selestia.ru/api/schedule/getTeacherSchedule',
                method: 'get',
                params: {
                    idTeacher: selectedTeacher,
                    date: getDateYearMonthDay(selectedDate)
                }
            }).then(response => {
                const { schedule, lastUpdate } = response.data;
                setTimetable({
                    schedule: schedule.schedule,
                    weekEven: schedule.weekEven,
                    lastUpdate: lastUpdate
                });
            }).finally(() => setIsScheduleLoading(false));
        }
        
        if(selectedDate && selectedGroup && !isTeacher) getGroupSchedule();
        if(selectedDate && selectedTeacher && isTeacher) getTeacherSchedule();
    }, [selectedDate, selectedGroup, selectedTeacher, isTeacher]);
    
    return (
        <article className='timetable'>
            {isHome &&
            <header className='timetable__heading'>
                <h2 className='timetable__title'>Расписание на { selectedDate }</h2>
            </header>
            }
            
            <div className='timetable-info'>
                {isHome &&
                <div className='timetable-info__heading'>
                    <h3 className='timetable-info__dayweek'>
                    {(selectedDate) ? getDayOfWeek(selectedDate) : ''} / {timetable.weekEven.toLowerCase()}
                    </h3>
                </div>
                }
                {isScheduleLoading ? (
                    <LoadingPage />
                ) : (
                    <TimetableLessons lessons={timetable.schedule}  />
                )}
            </div>
            {isHome &&
            <footer className='timetable__footer'>
                <p className='timetable__update'>Обновлено: в </p>
            </footer>
            }
        </article>
    );
}

export default TimetableComponent;