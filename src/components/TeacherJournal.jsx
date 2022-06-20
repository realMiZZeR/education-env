import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { JournalProvider } from '../hoc/JournalProvider';
import { useJournal } from '../hooks/useJournal';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';

import userIcon from '../assets/images/icons/tasks/user.png';
import groupIcon from '../assets/images/icons/default_group.png';
import sumIcon from '../assets/images/icons/sum.png';
import taskIcon from '../assets/images/icons/completed_tasks.png';
import starIcon from '../assets/images/icons/tasks/score.png';

import JournalStats from './JournalStats';
import FormSelect from './FormSelect';
import DisciplinesList from './DisciplinesList';
import correctDateFormat from '../assets/js/correctDateFormat';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const TeacherJournal = () => {

    const { selectedDiscipline, setSelectedGroup, setSelectedMonth, setSelectedDiscipline } = useJournal();
    const [ groups, setGroups ] = useState([]);
    const months = [
        {id: 1, title:  'Январь'},
        {id: 2, title:  'Февраль'},
        {id: 3, title:  'Март'},
        {id: 4, title:  'Апрель'},
        {id: 5, title:  'Май'},
        {id: 6, title:  'Июнь'},
        {id: 7, title:  'Июль'},
        {id: 8, title:  'Август'},
        {id: 9, title:  'Сентябрь'},
        {id: 10, title: 'Октябрь'},
        {id: 11, title: 'Ноябрь'},
        {id: 12, title: 'Декабрь'},
    ];

    useEffect(() => {
        const fetchGroups = async () => {
            await axios.get(
                `http://server.selestia.ru/api/teacher/getGroupDiscipline?id=${selectedDiscipline}`
            ).then(response => setGroups(response.data)
            ).catch(error => console.dir(error));
        }

        if(selectedDiscipline) fetchGroups();
    }, [selectedDiscipline]);

    const showDetails = (e) => {

    }

    const users = [
        {
            id: 18290412012, 
            image: null,
            fullname: 'я блять заебался',
            tasks: [
                {id: 1, title: 'задание', mark: 5, marked: new Date()},
                {id: 2, title: 'задание', mark: 5, marked: new Date()},
                {id: 3, title: 'задание', mark: 5, marked: new Date()},
                {id: 4, title: 'задание', mark: 5, marked: new Date()},
                {id: 5, title: 'задание', mark: 5, marked: new Date()},
                {id: 6, title: 'задание', mark: 5, marked: new Date()},
            ],
            avg: 5 
        },
        {
            id: 18290412012, 
            image: null,
            fullname: 'я блять заебался',
            tasks: [
                {id: 1, title: 'задание', mark: 5, marked: new Date()},
                {id: 2, title: 'задание', mark: 5, marked: new Date()},
                {id: 3, title: 'задание', mark: 5, marked: new Date()},
            ],
            avg: 5 
        }
    ]

    return (
        <JournalProvider>
            <main className='journal-main'>
                <table className='journal-tasks-wrapper'>
                    <thead className='journal-tasks-head'>
                        <tr className='journal-tasks-head__item'>
                            <th className='journal-tasks__user'>
                                <img src={userIcon} alt='Студент' />
                            </th>
                            {/* <th className='journal-tasks__grouping journal-tasks__grouping_tasks'>
                                
                                <Swiper
                                    // install Swiper modules
                                    modules={[Navigation, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={5}
                                    navigation
                                >
                                    {users.tasks.map((task) => {
                                        return (
                                            <SwiperSlide key={task.id} style={{width: '35px'}}>
                                                <img src={taskIcon} alt='Задание' title={task.title} />
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </th> */}

                            <th className='journal-tasks__grouping journal-tasks__grouping_tasks'>
                                <span>
                                    <img src={taskIcon} alt='Задание' />
                                </span>
                                <span>
                                    <img src={taskIcon} alt='Задание' />
                                </span>
                                <span>
                                    <img src={taskIcon} alt='Задание' />
                                </span>
                                <span>
                                    <img src={taskIcon} alt='Задание' />
                                </span>
                                <span>
                                    <img src={taskIcon} alt='Задание' />
                                </span>
                            </th>
                            <th className='journal-tasks__avg'>
                                <img src={starIcon} alt='Средняя оценка' />
                            </th>
                        </tr>
                    </thead>
                    <tbody className='journal-tasks'>
                        {users.map(user => {
                            return (
                                <tr className='journal-tasks__item'>
                                    <td className='journal-tasks__user'>
                                        <div className={`journal-tasks__image ${isEmptyUserImage(user.image, 'journal-tasks__image')}`}>
                                            <img src={user.image ? user.image : defaultIcon} alt='' />
                                        </div>
                                        <h3 className='journal-tasks__title'>{user.fullname}</h3>
                                    </td>
                                    <td className='journal-tasks__grouping journal-tasks__grouping_tasks'>
                                    {user.tasks.map(task => {
                                        return (
                                            <span 
                                                key={task.id}
                                                onMouseOver={showDetails}
                                                onMouseLeave={() => {}}
                                            >
                                                {/* todo: show details */}
                                                {task.mark}
                                                <details className='journal-tasks-details'>
                                                    <summary className='journal-tasks-details__title'>Выставлено:</summary>
                                                    <p className='journal-tasks-details__descr'>{correctDateFormat(new Date())}</p>
                                                </details>
                                            </span>
                                        );
                                    })}
                                    </td>
                                    <td className='journal-tasks__avg'>
                                        <span>{user.avg}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <aside className='journal-sort'>
                    <h2 className='journal-sort__heading'>&nbsp;</h2>
                    <div className='journal-sort__controls'>
                        <FormSelect 
                            name='group'
                            title='Выбор группы' 
                            handler={setSelectedGroup} 
                            options={groups} 
                        />
                        <FormSelect 
                            name='taskType'
                            title='Выбор месяца' 
                            handler={setSelectedMonth} 
                            options={months} 
                        />
                        <DisciplinesList 
                            visibleHeader={true}
                            handler={setSelectedDiscipline} 
                            value={selectedDiscipline} 
                        />
                    </div>
                </aside>
            </main>
            <footer className='journal-footer'>
                <JournalStats
                    image={groupIcon}
                    title='Количество студентов в группе'
                    value={20}
                />
                <JournalStats
                    image={taskIcon}
                    title='Количество заданий'
                    value={20}
                />
                <JournalStats
                    image={sumIcon}
                    title='Средняя оценка группы'
                    value={'4,63'}
                />
            </footer>
        </JournalProvider>
    );
}

export default TeacherJournal;