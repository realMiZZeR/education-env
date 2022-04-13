import { Link } from 'react-router-dom';
import DevidedByTwo from '../layouts/DevidedByTwo';

// images
import calendarIcon from '../assets/images/icons/calendar.svg';
import calendarActiveIcon from '../assets/images/icons/calendar_active.svg';
import { useEffect } from 'react';

let datesList = [
    {
        id: 114,
        date: '11.04.2022'
    },
    {
        id: 115,
        date: '12.04.2022'
    },
    {
        id: 116,
        date: '13.04.2022'
    },
    {
        id: 117,
        date: '14.04.2022'
    },
    {
        id: 118,
        date: '15.04.2022'
    },
    {
        id: 119,
        date: '16.04.2022'
    },
    {
        id: 120,
        date: '17.04.2022'
    },
];

let daysOfWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

function getDayOfWeek(date) {
    const [day, month, year] = date.split('.');
    const dateParse = new Date(year, Number(month)-1, day);

    return daysOfWeek[dateParse.getDay()];
}



function TimetableDatesList({ datesList }) {
    const timetableDatesItems = datesList.map(item => {
        return (
            <li className='timetable-dates-list__item'>
                <div className='timetable-dates-list__image'>
                    <img src={calendarIcon} alt='Дата' />
                </div>
                <date className='timetable-dates-list__date'>{ item.date }</date>
                <small className='timetable-dates-list__dayofweek'>{ getDayOfWeek(item.date) }</small>
            </li>
        );
    });

    return (
        <ul className='timetable-dates-list'>{ datesList }</ul>
    );
}

export default function Timetable() {
    

    return (
        <>
            <article className='timetable-dates'>
                <TimetableDatesList datesList={ datesList } />
            </article>
            <DevidedByTwo>
                
            </DevidedByTwo>
        </>
    );
}