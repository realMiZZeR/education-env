import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import TimetableLessons from './TimetableLessons';

// functions
import getDateYearMonthDay from '../assets/js/getDateYearMonthDay';
import getDayOfWeek from '../assets/js/getDayOfWeek';

// hooks
import { useTimetable } from '../hooks/useTimetable';
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

    const { selectedDate, selectedGroup, setSelectedGroup } = useTimetable();

    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            await axios.post(
                'http://server.selestia.ru/api/getScheduleToken',
                {token: user.token}
            ).then(response => {
                setSelectedGroup(response.data.groupId);
            }).catch(error => console.log(error.toJSON()));
        }

        if(user?.token) fetchData();
    }, [])

    // for timetable page
    useEffect(() => {
        const fetchData = async () => {
            await axios.request({
                url: 'http://server.selestia.ru/api/groupSchedule',
                method: 'get',
                params: {
                    idGroup: selectedGroup,
                    date: getDateYearMonthDay(selectedDate)
                }
            }).then(response => {
                const { schedule, lastUpdate } = response.data;
                console.log(response)
                setTimetable({
                    schedule: schedule.schedule,
                    weekEven: schedule.weekEven,
                    lastUpdate: lastUpdate
                });
            });
        }
        
        if(selectedDate && selectedGroup) fetchData();
    }, [selectedDate, selectedGroup]);
    
    return (
        <article className='timetable'>
            {isHome &&
            <header className='timetable__heading'>
                <h2 className='timetable__title'>Расписание на { selectedDate }</h2>
            </header>
            }

            {console.log(selectedDate)}
            
            <div className='timetable-info'>
                {isHome &&
                <div className='timetable-info__heading'>
                    <h3 className='timetable-info__dayweek'>
                    {(selectedDate) ? getDayOfWeek(selectedDate) : ''} / {timetable.weekEven.toLowerCase()}
                    </h3>
                </div>
                }
                <TimetableLessons lessons={timetable.schedule}  />
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