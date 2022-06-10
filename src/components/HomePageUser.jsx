import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { TimetableProvider } from '../hoc/TimetableProvider';
import { useAuth } from '../hooks/useAuth';

import getTypeTask from '../assets/js/getTypeTask';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import TimetableComponent from './TimetableComponent';
import Messages from './Messages';
import correctDateFormat from '../assets/js/correctDateFormat';


const HomePageUser = () => {

    const { user } = useAuth();

    const TasksSlider = () => {

        const [ tasks, setTasks ] = useState([]);

        useEffect(() => {
            const fetchHomeTasks = async () => {
                await axios.get(
                    `http://server.selestia.ru/api/student/getStudentHomeTasks`,
                    {headers: {token: user.token}}
                ).then(response => setTasks(response.data)
                ).catch(error => console.dir(error)
                )
            }
    
            if(user.token) fetchHomeTasks();
        }, [user.token]);

        return (
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                loop={tasks.length > 3}
                navigation
                className='swiper-tasks'
            >
                {tasks.map(task => {
                    return (
                        <SwiperSlide key={task.id}>
                            <Link to={`/tasks/${task.id}`} className='home-tasks-list__item link'>
                                <div className='home-tasks-list__image'>
                                    <img src={getTypeTask({type: task.tasksType})} alt={task.typeTaskName} />
                                </div>
                                <div className='home-tasks-list__info'>
                                    <p className='home-tasks-list__discipline' title={task.discipline}>{task.discipline}</p>
                                    <h3 className='home-tasks-list__title' title={task.title}>{task.title}</h3>
                                    <small className='home-tasks-list__deadline'>Выполнить до: {correctDateFormat(task.deadline)}</small>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        );
    }


    return (
        <>
            <article className='home-tasks'>
                <div className='home-tasks__heading'>
                    <h2 className='home-tasks__title'>Задания</h2>
                    <Link to="/tasks" className='home-tasks__link'>
                        Все задания
                    </Link>
                </div>
                <TasksSlider />
            </article>
            <div className='content-main__grid_two'>
                <TimetableProvider>
                    <TimetableComponent />
                </TimetableProvider>
                <Messages />
            </div>
        </>
    );
}

export default HomePageUser;