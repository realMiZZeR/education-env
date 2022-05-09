import axios from 'axios';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import getColorMark from '../assets/js/getColorMark';
import getTypeTask from '../assets/js/getTypeTask';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';

import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import SwitchButton from './SwitchButton';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const TasksList = () => {

    const { user } = useAuth();

    const { selectedDiscipline } = useTasks();

    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        console.log(selectedDiscipline)
        const fetchData = async () => {
            const result = await axios.get(
                `http://server.selestia.ru/api/student/getTaskStudent`,
                {
                    params: {
                        token       : user.token,
                        idDiscipline: selectedDiscipline
                    }
                }
            );

            setTasks(result.data);
        }

        if(user && selectedDiscipline) fetchData();
    }, [user, selectedDiscipline]);

    const [ showUncompleted, setShowUncompleted ] = useState(false);

    const switchHandler = () => {
        setShowUncompleted(!showUncompleted);
    }

    const nextScroll = () => {
        
    }
    
    return (
        <article className='tasks'>
            <header className='tasks-header'>
            {user.role === 0 &&
                <>
                    <SwitchButton handler={switchHandler} value={showUncompleted}>
                        <span className='switch__title'>Показать невыполненные</span>
                    </SwitchButton>
                    <Link to='' className='tasks-header__link link'>
                        Список лидеров
                    </Link>
                </>
            }
            </header>

            <InfiniteScroll
                dataLength={tasks.length}
                next={nextScroll}
                hasMore={true}
                loader={<span>Подождите...</span>}
                className='tasks-list'
            >
            {tasks.map(task => {
                return (
                    <section key={task.id} className='tasks-section'>
                        <Link to={`/tasks/${task.id}`} className='tasks-section__link_h' />
                        <div className='tasks-section__image'>
                            <img src={getTypeTask(task.type)} alt='Тип' />
                        </div>
                        <div className='tasks-info'>
                            <small className='tasks-info__date'>Срок сдачи до { new Date(task.dateTo).toLocaleDateString('ru-RU') }</small>
                            <h3 className='tasks-info__title'>{ task.title }</h3>
                            <p className='tasks-info__descr'>{ task.description }</p>
                            <p className='tasks-info__answer'>Ваш ответ: { (task.answer) ? task.answer : 'отсутствует' }</p>
                            <div className='tasks-info__author'>
                                <Link to={`/profile/${task.author.id}`} className='tasks-info-user link'>
                                    <div className={`tasks-info-user__image ${isEmptyUserImage(task.author.image, 'tasks-info-user__image')}`}>
                                        <img src={(task.author.image) ? task.author.image : defaultIcon} alt='Аватарка' />
                                    </div>
                                    <div className='tasks-info-user__info'>
                                        <h4 className='tasks-info-user__heading'>Создатель:</h4>
                                        <p className='tasks-info-user__fullname' title={task.author.fullname}>{ task.author.fullname }</p>
                                    </div>
                                </Link>
                                <small className='tasks-info__published'>Опубликовано: { new Date(task.published).toLocaleDateString('ru-RU') }</small>
                            </div>
                        </div>
                        <span className={`tasks-section__mark ${getColorMark({className: 'mark', mark: task.mark})}`}>
                            { (task.mark) ? task.mark : '?' }
                        </span>
                    </section>
                )
            })}
            </InfiniteScroll>

        </article>
    );
}

export default TasksList;