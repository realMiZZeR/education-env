import axios from 'axios';
import React, { useState, useEffect } from 'react';
import getDisciplineImage from '../assets/js/getDisciplineImage';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import Search from './Search';

import createTaskIcon from '../assets/images/icons/create_task.png';
import { Link } from 'react-router-dom';

const FullDisciplinesList = () => {

    const { user } = useAuth();

    const { selectedDiscipline, setSelectedDiscipline } = useTasks();

    const [ disciplines, setDisciplines ] = useState([]);
    const [ isActive, setIsActive ] = useState(null);
    
    useEffect(() => {
        // get disciplines for common user
        const fetchUser = async () => {
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
        // get disciplines for teacher
        const fetchTeacher = async () => {
            const result = await axios.get(
                `http://server.selestia.ru/api/teacher/getDisciplineTask`,
                {
                    params: {
                        token: user.token
                    }
                }
            );

            setDisciplines(result.data);
        }

        if(user.role === 0) fetchUser();
        if(user.role === 1) fetchTeacher();
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
            {user.role === 1 && <Link to='/create-task' className='tasks-aside__link link'>
                <div className='tasks-aside__image'>
                    <img src={createTaskIcon} alt='Логотоип создания' />
                </div>
                <h2 className='tasks-aside__heading'>Создать новое задание</h2>
            </Link>
            }
            <div className='tasks-aside__disciplines'>
                <Search className='tasks-aside__search search' />
                <ul className='disciplines-list'>
                {disciplines.map(item => {
                    return (
                        <li 
                        className={`disciplines-list__item disciplines-list__item_full ${(isActive === item.id) ? 'disciplines-list__item_active' : ''}`} 
                        onClick={() => { itemClickHandler(item.id) }} 
                        key={item.id}>
                            <div className='disciplines-list__image' title={item.typeTitle}>
                                <img src={getDisciplineImage({type: item.idType, isActive: (isActive === item.id)})} alt='Дисциплина' />
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