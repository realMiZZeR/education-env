import { useEffect, useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

// images
import calendarIcon from '../assets/images/icons/calendar.svg';
import calendarActiveIcon from '../assets/images/icons/calendar_active.svg';
import DevidedByTwo from '../layouts/DevidedByTwo';
import TimetableComponent from '../components/TimetableComponent';
import TimetableSort from '../components/TimetableSort';
import updateTitle from '../assets/js/updateTitle';

const daysOfWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

const TimetableContext = createContext(null);

function getDayOfWeek(date) {
    const [day, month, year] = date.split('.');
    const dateParse = new Date(year, Number(month)-1, day);

    return daysOfWeek[dateParse.getDay()];
}

function TimetableDatesList({ datesList }) {
    
    const [ dateItemIndex, setDateItemIndex ] = useState(0);
    let isCurrent = false;

    const datesItems = datesList.map((item, index) => {
        isCurrent = (item === new Date().toLocaleDateString('ru-RU'))
        return (
            <li 
            key={index}
            className={`timetable-dates-list__item ${isCurrent ? 'timetable-dates-list__item_current' : ''}`}>
                <div className='timetable-dates-list__image'>
                    <img src={isCurrent ? calendarActiveIcon : calendarIcon} alt='Дата' />
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

export default function Timetable(props) {

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const [ datesList, updateDateList ] = useState([]);
    const [ value, setValue ] = useState(null);

    // getting all dates in custom range
    function getDays(currentDate, interval) {
        let [ day, month, year ] = currentDate.split('.');
        day = Number(day);

        if(interval >= 0) {
            for(let i = 0; i <= interval; i++) {
                updateDateList( arr => [
                    ...arr,
                    `${(day + i)}.${month}.${year}`
                ]);
            } 
        }
        else {
            for(let i = interval; i < 0; i++) {
                updateDateList( arr => [
                    ...arr,
                    `${(day + i)}.${month}.${year}`
                ]);
            }
        }

        updateDateList( arr => arr.sort() );
    }

    // load title from Route in MainContent
    

    useEffect(() => {
        // clear dates list after updating
        updateDateList([]);

        // getting date like 01.01.1970 as string
        const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
        const currentDate = new Date().toLocaleDateString('ru-RU', options);

        // getting three days ago and next three days
        getDays(currentDate, -3);
        getDays(currentDate, 3);

    }, []);

    return (
        <>
            <article className='timetable-dates'>
                <TimetableDatesList datesList={ datesList } />
            </article>
            <TimetableContext.Provider value={value}>
                <DevidedByTwo>
                    <TimetableComponent />
                    <TimetableSort />
                </DevidedByTwo>
            </TimetableContext.Provider>
        </>
    );
}