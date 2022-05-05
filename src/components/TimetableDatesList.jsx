import React from 'react';

import calendarIcon from '../assets/images/icons/calendar.svg';
import calendarActiveIcon from '../assets/images/icons/calendar_active.svg';

// functions
import getDayOfWeek from '../assets/js/getDayOfWeek';

// hooks
import { useTimetable } from '../hooks/useTimetable';

const TimetableDatesList = ({ datesList }) => {

    const { selectedDate, setSelectedDate } = useTimetable(); 

    const itemClickHandler = (date) => {
        setSelectedDate(date);
    }
    // item = date (01.01.1970)
    const datesItems = datesList.map((item, index) => {
        return (
            <li 
            key={index}
            className={`timetable-dates-list__item ${(item === selectedDate) ? 'timetable-dates-list__item_current' : ''}`}
            onClick={() => { itemClickHandler(item) } }>
                <div className='timetable-dates-list__image'>
                    <img src={(item === selectedDate) ? calendarActiveIcon : calendarIcon} alt='Дата' />
                </div>
                <p className='timetable-dates-list__date'>{ item }</p>
                <small className='timetable-dates-list__dayofweek'>{ getDayOfWeek(item) }</small>
            </li>
        );
    });

    return (
        <ul className='timetable-dates-list'>{ datesItems }</ul>
    );
}

export default TimetableDatesList;