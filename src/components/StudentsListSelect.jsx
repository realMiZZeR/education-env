import React, { useState, useEffect } from 'react';

import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

import { useAxios } from '../hooks/useAxios';

import switchItemActive from '../assets/js/switchItemActive';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const StudentsListSelect = ({ context }) => {

    const { formValues, setFormValues } = context;

    const [ students, setStudents ] = useState([]);

    const [ studentsAxios, isError, isLoading ] = useAxios({
        url: '/api/admin/createGroup/allStudent',
        method: 'get'
    });

    useEffect(() => {
        if(studentsAxios && studentsAxios.data) setStudents(studentsAxios.data);
    }, [studentsAxios]);

    const itemClickHandler = (id) => {
        switchItemActive(
            {
                initialObject: formValues, 
                setHandler: setFormValues,
                modifyProperty: 'students', 
                initialValue: id,
            }
        );
    }

    const doItemActive = (id) => {
        return (formValues.students.includes(id)) ? 'students-list__item_current' : '';
    }

    return (
        <ul className='students-list'>
        {isLoading ? (
            <LoadingPage />
        ) : (
            <>
                {!isError ? (
                    students.map(item => {
                        return (
                            <li 
                            key={item.id} 
                            className={`students-list__item ${doItemActive(item.id)}`}
                            onClick={() => {itemClickHandler(item.id)} }>
                                <div className={`students-list__image ${!item.image ? 'students-list__image_empty' : ''}`}>
                                    <img src={!item.image ? defaultIcon : item.image} alt='Аватарка' />
                                </div>
                                <p className='students-list__fullname'>{ item.fullname }</p>
                            </li>
                        );
                    })
                ) : (
                    <ErrorPage message='CONNECTION_REFUSED' />
                )}
            </>
        )}
        </ul>
    )
}

export default StudentsListSelect;