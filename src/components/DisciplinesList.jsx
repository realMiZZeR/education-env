import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

import Search from './Search';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

const DisciplinesList = ({ visibleHeader, handler, value }) => {

    const { user } = useAuth();

    const [ disciplines, setDisciplines ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(
                `http://server.selestia.ru/api/teacher/getDisciplineTask?token=${user.token}`
            ).then(response => setDisciplines(response.data)
            ).catch(error => console.dir(error));
        }

        if(user) fetchData();
    }, [user]);
    


    return (
        <>
            {visibleHeader && (
                <h3 className='disciplines-list__heading'>Дисциплина</h3>
            )}
            <Search className='search' />
            <ul className='disciplines-list'>
            {disciplines.map(item => {
                return (
                    <li 
                    className={`disciplines-list__item ${(item.id === value) ? 'disciplines-list__item_active' : ''}`} 
                    onClick={() => { handler(item.id) }} 
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