import { useEffect, useRef, useState } from 'react';

import TimetableDatesList from '../components/TimetableDatesList';

// images
import TimetableComponent from '../components/TimetableComponent';
import TimetableSort from '../components/TimetableSort';
import updateTitle from '../assets/js/updateTitle';
import { TimetableProvider } from '../hoc/TimetableProvider';
import { useWindowResolution } from '../hooks/useWindowResolution';
import Footbar from '../components/Footbar';
import { useFootbar } from '../hooks/useFootbar';

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

    const datesListRef = useRef();
    const sortRef = useRef();
    const footerbarRef = useRef();

    const timetableRefHandler = (type) => {
        let elem = null;
        if(type === 'date') {
            elem = datesListRef.current;
        }
        if(type === 'user') {
            elem = sortRef.current;
        }
        if(elem === null) {
            return;
        }

        const classNames = elem.className;
        elem.className = `${classNames} ${classNames}_highlight`;

        // reset
        setTimeout(() => {
            elem.className = classNames;
        }, 3000);
    }

    const footbarRef = useRef();
    const { footbarHandler } = useFootbar(footbarRef);
    const { width } = useWindowResolution();

    return (
        <TimetableProvider>
            <article className='timetable-dates'>
                <TimetableDatesList ref={datesListRef} datesList={ datesList } />
            </article>
            <div className='timetable-wrapper'>
                <TimetableComponent refHandler={timetableRefHandler} footbarRefHandler={footbarHandler} />
                {width <= 376 ? (
                    <Footbar ref={footbarRef}>
                        <TimetableSort ref={sortRef} />
                    </Footbar>
                ) : (
                    <TimetableSort ref={sortRef} />
                )}
                
            </div>
        </TimetableProvider>
    );
}

export default Timetable;