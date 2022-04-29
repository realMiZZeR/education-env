import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import TimetableLessons from './TimetableLessons';

// functions
import getDateYearMonthDay from '../assets/js/getDateYearMonthDay';

// hooks
import { useTimetable } from '../hooks/useTimetable';
import { useAuth } from '../hooks/useAuth';


export default function TimetableComponent() {

    const location = useLocation();
    let isHome = (location.pathname === '/home');

    const [ lessons, setLessons ] = useState([]);
    const [ lastUpdate, setLastUpdate ] = useState(null);

    const { selectedDate, setSelectedDate, selectedGroup } = useTimetable();

    console.log(selectedDate)
    const { user } = useAuth();

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
                setLessons(schedule);
                setLastUpdate(lastUpdate);
            });
        }

        if(selectedDate && selectedGroup) fetchData();
    }, [selectedDate, selectedGroup]);
    
    return (
        <article className='timetable'>
            {isHome &&
            <header className='timetable__heading'>
                <h2 className='timetable__title'>Расписание на { lastUpdate }</h2>
            </header>
            }
            
            <div className='timetable-info'>
                {isHome &&
                <div className='timetable-info__heading'>
                    <h3 className='timetable-info__dayweek'>Понедельник / нечётная</h3>
                </div>
                }
                <TimetableLessons lessons={lessons} />
            </div>
            {isHome &&
            <footer className='timetable__footer'>
                <p className='timetable__update'>Обновлено: в </p>
            </footer>
            }
        </article>
    );
}