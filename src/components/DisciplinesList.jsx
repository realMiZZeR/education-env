import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useAxios } from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';
import { useTask } from '../hooks/useTask';

import Search from './Search';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

const DisciplinesList = () => {

    const { user } = useAuth();

    const { formValues, setFormValues } = useTask();

    const [ disciplines, setDisciplines ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://server.selestia.ru/api/teacher/getDisciplineTask?token=${user.token}`
            );

            setDisciplines(result.data);
        }

        if(user) fetchData();
    }, [user]);
    
    const itemClickHandler = (id) => {
        setFormValues({
            ...formValues,
            ['discipline']: id
        })
    }

    return (
        <>
            <Search className='search' />
            <ul className='disciplines-list'>
            {disciplines.map(item => {
                return (
                    <li 
                    className={`disciplines-list__item ${(item.id === formValues.discipline) ? 'disciplines-list__item_active' : ''}`} 
                    onClick={() => { itemClickHandler(item.id) }} 
                    key={item.id}>
                        <h4 className='disciplines-list__title'>{ item.title }</h4>
                    </li>
                );
            })}
            </ul>
            
        </>
    )
}

export default DisciplinesList;