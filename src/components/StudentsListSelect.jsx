import React, { useState, useEffect } from 'react';

import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

import { useAxios } from '../hooks/useAxios';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const StudentsListSelect = ({ context }) => {

    const { formValues, setFormValues } = context;

    const [ students, setStudents ] = useState([]);

    const [ studentsAxios, isError, isLoading ] = useAxios({
        url: '/api/admin/allStudent',
        method: 'get'
    });

    useEffect(() => {
        if(studentsAxios && studentsAxios.data) setStudents(studentsAxios.data);
    }, [studentsAxios]);

    const getStudents = (id) => {
        let result = [];

        if(formValues.students.includes(id)) {
            result = formValues.students.filter(item => item !== id);
        } else {
            result = [
                ...formValues,
                id
            ];
        }

        return result;
    }

    const itemClickHandler = (id) => {
        setFormValues({
            ...formValues,
            ['students']: getStudents(id)
        });
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
                            className='students-list__item'
                            onClick={() => {itemClickHandler(item.id)} }>
                                <div className={`students-list__image ${!item.image ? 'students-list__image_empty' : ''}`}>
                                    <img src={!item.image ? defaultIcon : item.image} alt='Аватарка' />
                                </div>
                                <p className='students-list__fullname'>{ item.fio }</p>
                                <span className='students-list__checkbox checkbox' />
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