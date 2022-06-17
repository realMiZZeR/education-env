import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import calendarIcon from '../assets/images/icons/calendar.svg';
import calendarActiveIcon from '../assets/images/icons/calendar_active.svg';

// functions
import getDayOfWeek from '../assets/js/getDayOfWeek';

// hooks
import { useTimetable } from '../hooks/useTimetable';
import { useWindowResolution } from '../hooks/useWindowResolution';

const TimetableDatesList = React.forwardRef(({ datesList }, ref) => {

    const { width } = useWindowResolution();
    const { selectedDate, setSelectedDate } = useTimetable(); 

    const itemClickHandler = (date) => {
        setSelectedDate(date);
    }

    // item = date (01.01.1970)

    return (
        <>
            {width <= 376 ? (
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                >
                    {datesList.map((date, index) => {
                        return (
                            <SwiperSlide key={index} className={`timetable-dates-list__item ${(date === selectedDate) ? 'timetable-dates-list__item_current' : ''}`}>
                                <div className='timetable-dates-list__image'>
                                    <img src={(date === selectedDate) ? calendarActiveIcon : calendarIcon} alt='Дата' />
                                </div>
                                <p className='timetable-dates-list__date'>{ date }</p>
                                <small className='timetable-dates-list__dayofweek'>{ getDayOfWeek(date) }</small>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                <ul ref={ref} className='timetable-dates-list'>
                { datesList.map((date, index) => {
                    return (
                        <li 
                            key={index}
                            className={`timetable-dates-list__item ${(date === selectedDate) ? 'timetable-dates-list__item_current' : ''}`}
                            onClick={() => { itemClickHandler(date) } }
                        >
                            <div className='timetable-dates-list__image'>
                                <img src={(date === selectedDate) ? calendarActiveIcon : calendarIcon} alt='Дата' />
                            </div>
                            <p className='timetable-dates-list__date'>{ date }</p>
                            <small className='timetable-dates-list__dayofweek'>{ getDayOfWeek(date) }</small>
                        </li>
                    )
                }) }
                </ul>
            )}
        </>
    );
})

export default TimetableDatesList;