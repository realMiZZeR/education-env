import React, { useState, useEffect } from 'react';

import { useAxios } from '../hooks/useAxios';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const Teachers = ({formValues, setFormValues}) => {

    const [ data, setData ] = useState([]);

    // get teachers replace
    const [teachers, isError, isLoading] = useAxios({
        url: '/api/admin/createGroup/getTeacher',
        method: 'get'
    });

    useEffect(() => {
        if(teachers && teachers.data) setData(teachers.data);
    }, [teachers]);

    function teacherClickHandler(id) {
        if(Array.isArray(formValues.group)) {
            setFormValues({
                ...formValues,
                ['teacher']: [
                    ...formValues.group,
                    id
                ]
            });
        } else {
            setFormValues({
                ...formValues,
                ['teacher']: id
            });
        }
    }

    return (
        <ul className='selection-list'>

            { isLoading ? (
                <LoadingPage />
            ) : (
                <>
                {/* no error -> load items */}
                    { !isError ? (
                        data.map(item => (
                            <li 
                            key={item.id} 
                            className={`selection-list__item ${(item.id === formValues.teacher) ? 'selection-list__item_current' : ''}`}
                            onClick={() => teacherClickHandler(item.id)}>
                                <div className='selection-list__image'>
                                    <img src={(!item.image) ? defaultIcon : item.image} alt='Аватар группы' />
                                </div>
                                <h4 className='selection-list__title'>{ item.fullname }</h4>
                            </li>
                        ))
                        // if error -> show error
                    ) : (
                        <ErrorPage error='CONNECTION_REFUSED' />
                    ) }
                </>
            )}
        </ul>
    );
}

export default Teachers;