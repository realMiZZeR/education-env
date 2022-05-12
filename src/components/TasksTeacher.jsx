import axios from "axios";
import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import { useTasks } from "../hooks/useTasks";
import InputEffect from "./InputEffect";

import getColorMark from "../assets/js/getColorMark";
import getTypeTask from "../assets/js/getTypeTask";
import isEmptyUserImage from "../assets/js/isEmptyUserImage";

import groupIcon from '../assets/images/icons/group.svg';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const TasksTeacher = ({user}) => {

    const { selectedDiscipline } = useTasks();

    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://server.selestia.ru/api/teacher/getTask`,
                {
                    params: {
                        token       : user.token,
                        idDiscipline: selectedDiscipline
                    }
                }
            );

            console.log(result)
            setTasks(result.data);
        }

        if(user && selectedDiscipline) fetchData();
    }, [user, selectedDiscipline]);

    const nextScroll = () => {
        
    }

    const sortFields = {
        title: '',
        group: '',
        deadline: '',
        published: ''
    }

    const [ sortValues, setSortValues ] = useState(sortFields);

    const sortInputHandler = (e) => {
        console.log(e);
    }

    return (
        <>
            <header className='tasks-header'>
                    <InputEffect
                        name='title'
                        value={sortValues.title}
                        handler={sortInputHandler}
                        type='text'
                        placeholder='Задание'
                    />
                    <InputEffect
                        name='group'
                        value={sortValues.group}
                        handler={sortInputHandler}
                        type='text'
                        placeholder='Группа'
                    />
                    <InputEffect
                        name='deadline'
                        value={sortValues.deadline}
                        handler={sortInputHandler}
                        type='date'
                        placeholder='Срок сдачи'
                    />
                    <InputEffect
                        name='published'
                        value={sortValues.published}
                        handler={sortInputHandler}
                        type='date'
                        placeholder='Опубликовано'
                    />
            </header>

            <InfiniteScroll
                dataLength={tasks.length}
                next={nextScroll}
                hasMore={true}
                loader={<span>Подождите...</span>}
                className='tasks-list tasks-list_teacher'
            >
            {tasks.map(task => {
                return (
                    <section key={task.id} className='tasks-section'>
                        <Link to={`/tasks/${task.id}/answers`} className='tasks-section__link_h' />
                        <div className='tasks-section__image'>
                            <img src={getTypeTask({type: task.typeTask.id})} alt='Тип' />
                        </div>
                        <div className='tasks-info'>
                            <small className='tasks-info__date'>Срок сдачи до { new Date(task.dateTo).toLocaleDateString('ru-RU') }</small>
                            <h3 className='tasks-info__title'>{ task.title }</h3>
                            <p className='tasks-info__descr'>{ task.description }</p>
                            <p className='tasks-info__answer'>Количество ответов: { task.countAnswer }</p>
                            <div className='tasks-info__author'>
                                <div className='tasks-info-group'>
                                    <div className={`tasks-info-group__image`}>
                                        <img src={groupIcon} alt='Группа' />
                                    </div>
                                    <h4 className='tasks-info-group__heading'>Группа: </h4>
                                    <p className='tasks-info-group__name' title={task.groupName}>{ task.groupName }</p>
                                </div>
                                <small className='tasks-info__published'>Опубликовано: { new Date(task.published).toLocaleDateString('ru-RU') }</small>
                            </div>
                        </div>
                    </section>
                )
            })}
            </InfiniteScroll>
        </>  
    );
}

export default TasksTeacher;