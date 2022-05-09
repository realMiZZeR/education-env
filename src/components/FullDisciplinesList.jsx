import axios from 'axios';
import React, { useState, useEffect } from 'react';
import getDisciplineImage from '../assets/js/getDisciplineImage';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import Search from './Search';

const FullDisciplinesList = () => {

    const { user } = useAuth();

    const { selectedDiscipline, setSelectedDiscipline } = useTasks();

    const [ disciplines, setDisciplines ] = useState([]);
    const [ isActive, setIsActive ] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://server.selestia.ru/api/student/getDisciplineTask`,
                {
                    params: {
                        token: user.token
                    }
                }
            );

            setDisciplines(result.data);
        }

        if(user) fetchData();
    }, []);

    useEffect(() => {
        if(disciplines.length > 0) {
            setIsActive(disciplines[0].id);
            setSelectedDiscipline(disciplines[0].id);
        } 
    }, [disciplines]);

    const itemClickHandler = (id) => {
        setIsActive(id);
        setSelectedDiscipline(id);
    }

    
    return (
        <aside className='tasks-aside'>
            <div className='tasks-aside__disciplines'>
                <Search className='tasks-aside__search search' />
                <ul className='disciplines-list'>
                {disciplines.map(item => {
                    return (
                        <li 
                        className={`disciplines-list__item disciplines-list__item_full ${(isActive === item.id) ? 'disciplines-list__item_active' : ''}`} 
                        onClick={() => { itemClickHandler(item.id) }} 
                        key={item.id}>
                            <div className='disciplines-list__image'>
                                <img src={getDisciplineImage({type: item.type, isActive: (isActive === item.id)})} alt='Дисциплина' />
                            </div>
                            <h4 className='disciplines-list__title'>{ item.title }</h4>
                        </li>
                    );
                })}
                </ul>
            </div>
        </aside>
    );
}

export default FullDisciplinesList;