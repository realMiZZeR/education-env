import { useEffect, useState } from 'react';

import TimetableDatesList from '../components/TimetableDatesList';

// images
import DevidedByTwo from '../layouts/DevidedByTwo';
import TimetableComponent from '../components/TimetableComponent';
import TimetableSort from '../components/TimetableSort';
import updateTitle from '../assets/js/updateTitle';
import { TimetableProvider } from '../hoc/TimetableProvider';

// main component
const Timetable = (props) => {

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const [ datesList, updateDateList ] = useState([]);

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
            <DevidedByTwo>
                <TimetableProvider>
                    <TimetableComponent />
                </TimetableProvider>
                <TimetableSort />
            </DevidedByTwo>
        </>
    );
}

export default Timetable;