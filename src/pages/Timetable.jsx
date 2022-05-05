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

    const [ datesList, setDateList ] = useState([]);

    // today = new Date(), next = new Date(), days = number
    function addDays(today, next, days) {
        next.setDate(today.getDate() + days)
        return next.toLocaleDateString();
    }

    function getIntervalDays(interval) {

        const currentDate = new Date();
        const nextDate = new Date();

        if(interval >= 0) {
            for(let i = 0; i <= interval; i++) {
                setDateList( arr => [
                    ...arr,
                    addDays(currentDate, nextDate, i)
                ]);
            } 
        }
        else {
            for(let i = interval; i < 0; i++) {
                setDateList( arr => [
                    ...arr,
                    addDays(currentDate, nextDate, i)
                ]);
            }
        }

        setDateList( arr => arr.sort() );
    }

    useEffect(() => {
        // clear dates list after updating
        setDateList([]);

        // getting three days ago and next three days
        getIntervalDays(-3);
        getIntervalDays(3);

    }, []);

    return (
        <>
            <article className='timetable-dates'>
                <TimetableDatesList datesList={ datesList } />
            </article>
            <DevidedByTwo>
                <TimetableProvider>
                    <TimetableComponent />
                    <TimetableSort />
                </TimetableProvider>
            </DevidedByTwo>
        </>
    );
}

export default Timetable;