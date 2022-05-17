import React, { useEffect, useState } from 'react';

import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

// hooks
import { useTimetable } from '../hooks/useTimetable';
import { useAxios } from '../hooks/useAxios';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const TeachersList = ({ teachersList }) => {

    const { selectedTeacher, setSelectedTeacher } = useTimetable();

    const teacherClickHandler = (id) => {
        setSelectedTeacher(id);
    }
    
    return (
        <ul className='selection-list'>
            { teachersList.map(item => {
                return (
                    <li 
                        onClick={() => {teacherClickHandler(item.id)}}
                        className={`selection-list__item ${(item.id === selectedTeacher) ? 'selection-list__item_active' : ''}`} 
                        key={ item.id }
                    >
                        <div className='selection-list__image'>
                            <img src={(item?.image) ? item?.image : defaultIcon} alt='Аватарка' />
                        </div>
                        <h3 className='selection-list__title'>{ item.fullname }</h3>
                    </li>
                )
            }) } 
        </ul>
    );
}

const TimetableTeachers = () => {

    const [ data, setData ] = useState([]);

    const [ teachers, isError, isLoading ] = useAxios({
        url: `/api/schedule/getTeacher`,
        method: 'get'
    });

    useEffect(() => {
        if(teachers && teachers.data) setData(teachers.data);
    }, [teachers]);

    return (
        <div className='groups'>
        {isLoading ? (
            <LoadingPage />   
        ) : (
            <>
                {!isError ? (
                    <TeachersList teachersList={data} />
                ) : (
                    <ErrorPage error="CONNECTION_REFUSED" />
                ) }
            </>
        )}
        </div>
    );
}

export default TimetableTeachers;