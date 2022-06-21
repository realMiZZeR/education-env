import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// hooks
import { useAuth } from '../hooks/useAuth';
import { useWindowResolution } from '../hooks/useWindowResolution';
import { useTimetable } from '../hooks/useTimetable';

import timetableSettings from '../assets/images/icons/timetable_settings.png';

// functions
import getDateYearMonthDay from '../assets/js/getDateYearMonthDay';
import getDayOfWeek from '../assets/js/getDayOfWeek';

import TimetableLessons from './TimetableLessons';
import LoadingPage from './LoadingPage';

const TimetableComponent = ({refHandler, footbarRefHandler}) => {

    const { user } = useAuth();
    const { width } = useWindowResolution();
    const location = useLocation();
    let isHome = (location.pathname === '/home');

    const timetableJSON = {
        schedule: [],
        weekEven: '',
        lastUpdate: ''
    }

    const [ timetable, setTimetable ] = useState(timetableJSON);

    const { selectedDate, selectedGroup, setSelectedGroup, selectedTeacher, isTeacher } = useTimetable();

    // set group or teacher id by token
    useEffect(() => {
        const getUserTimetable = async () => {
            await axios.post(
                'http://server.selestia.ru/api/getScheduleToken',
                {token: user.token}
            ).then(response => {
                setSelectedGroup(response.data.groupId);
            }).catch(error => console.dir(error));
        }

        const getTeacherTimetable = async () => {
            await axios.post(
                'http://server.selestia.ru/api/getScheduleToken',
                {token: user.token}
            ).then(response => {
                setSelectedGroup(response.data.groupId);
            }).catch(error => console.dir(error));
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
                },
                headers: {
                    token: user.token
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
                    <>
                    {timetable.schedule.length > 0 ? (
                        <TimetableLessons lessons={timetable.schedule}  />
                    ) : (
                        <div className='lessons-list lessons-list_empty'>
                            <div className='lessons-list__image'>
                                <img src={timetableSettings} alt='' />
                            </div>
                            <p className='lessons-list__text'>
                                Выберите необходимую <br/> 
                                <span onClick={() => {refHandler('date')}}>дату</span> и <span onClick={() => {refHandler('user')}}>{(isTeacher) ? 'преподавателя' : 'группу'}</span>
                            </p>
                        </div>
                    )}
                    </>
                )}
            </div>
            {isHome &&
            <footer className='timetable__footer'>
                <p className='timetable__update'>Обновлено: в </p>
            </footer>
            }
            {width <= 376 && 
            <button type='button' onClick={footbarRefHandler} className='timetable__button button'>
                <span>Выбрать расписание</span>
            </button>
            }
        </article>
    );
}

export default TimetableComponent;