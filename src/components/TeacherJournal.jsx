import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { JournalProvider } from '../hoc/JournalProvider';
import { useJournal } from '../hooks/useJournal';
import { useAuth } from '../hooks/useAuth';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';

import settingsIcon from '../assets/images/icons/journal_settings.png';
import userIcon from '../assets/images/icons/tasks/user.png';
import groupIcon from '../assets/images/icons/default_group.png';
import sumIcon from '../assets/images/icons/sum.png';
import taskIcon from '../assets/images/icons/completed_tasks.png';
import starIcon from '../assets/images/icons/tasks/score.png';

import JournalStats from './JournalStats';
import FormSelect from './FormSelect';
import DisciplinesList from './DisciplinesList';
import correctDateFormat from '../assets/js/correctDateFormat';
import LoadingPage from './LoadingPage';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const TeacherJournal = () => {

    const { user } = useAuth();

    const { 
        selectedGroup,
        selectedDiscipline,
        selectedMonth, 
        selectedYear,
        setSelectedGroup,
        setSelectedMonth,
        setSelectedDiscipline,
        setSelectedYear } = useJournal();

    const [ months, setMonths ] = useState([
        {id: 1,  title:  'Январь'},
        {id: 2,  title:  'Февраль'},
        {id: 3,  title:  'Март'},
        {id: 4,  title:  'Апрель'},
        {id: 5,  title:  'Май'},
        {id: 6,  title:  'Июнь'},
        {id: 7,  title:  'Июль'},
        {id: 8,  title:  'Август'},
        {id: 9,  title:  'Сентябрь'},
        {id: 10, title: 'Октябрь'},
        {id: 11, title: 'Ноябрь'},
        {id: 12, title: 'Декабрь'}
    ]);

    const [ years, setYears ] = useState([]);

    useEffect(() => {
        let y = [];
        const currentYear = new Date().getFullYear();
        // fill years start from 2022 to current year
        for(let year = 2021; year <= Number(currentYear); year++) {
            y.push({id: year, title: year});
        }

        setYears(y);
    }, []);

    const [ groups, setGroups ] = useState([]);
    const [ journal, setJournal ] = useState(null);
    const [ isJournalLoading, setIsJournalLoading ] = useState(null);

    // all avaiable groups for currect discipline
    useEffect(() => {
        const fetchGroups = async () => {
            await axios.get(
                `http://server.selestia.ru/api/teacher/getGroupDiscipline?id=${selectedDiscipline}`
            ).then(response => setGroups(response.data)
            ).catch(error => console.dir(error));
        }

        if(selectedDiscipline) fetchGroups();
    }, [selectedDiscipline]);

    useEffect(() => {
        const fetchJournal = async () => {
            setIsJournalLoading(true);
            await axios.get(
                'http://server.selestia.ru/api/teacher/gradeBook',
                {
                    params: {
                        idDiscipline: selectedDiscipline,
                        idGroup: selectedGroup,
                        month: selectedMonth,
                        year: selectedYear
                    },
                    headers: {
                        token: user.token
                    }
                }
            ).then(response => setJournal(response.data)
            ).catch(error => console.dir(error)
            ).finally(() => setIsJournalLoading(false))
        }

        if(selectedGroup && selectedDiscipline && selectedMonth && selectedYear) fetchJournal();
    }, [selectedGroup, selectedDiscipline, selectedMonth]);

    const showDetails = (e) => {

    }

    return (
        <JournalProvider>
            <main className='journal-main'>
            {isJournalLoading ? (
                <LoadingPage />
            ) : (
                <>
                {journal ? (
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
                            {journal.users.map(user => {
                                return (
                                    <tr key={user.id} className='journal-tasks__item'>
                                        <td className='journal-tasks__user'>
                                            <div className={`journal-tasks__image ${isEmptyUserImage(user.image, 'journal-tasks__image')}`}>
                                                <img src={user.image ? user.image : defaultIcon} alt='' />
                                            </div>
                                            <h3 className='journal-tasks__title'>{user.fullname}</h3>
                                        </td>
                                        <td className='journal-tasks__grouping journal-tasks__grouping_tasks'>
                                            <Swiper
                                                modules={[Navigation, A11y]}
                                                spaceBetween={50}
                                                slidesPerView={5}
                                                navigation
                                            >
                                            {console.log(journal)}
                                                {journal.users.tasks.map((task) => {
                                                    console.log(task)
                                                    return (
                                                        {/* <SwiperSlide key={task.id} style={{width: '35px'}}>
                                                            <span 
                                                                key={task.id}
                                                                onMouseOver={showDetails}
                                                                onMouseLeave={() => {}}
                                                            >
                                                                {task.mark}
                                                                <details className='journal-tasks-details'>
                                                                    <summary className='journal-tasks-details__title'>Выставлено:</summary>
                                                                    <p className='journal-tasks-details__descr'>{correctDateFormat(new Date())}</p>
                                                                </details>
                                                            </span>
                                                        </SwiperSlide> */}
                                                    );
                                                })}
                                            </Swiper>
                                        </td>
                                        <td className='journal-tasks__avg'>
                                            <span>{user.avg}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className='journal-tasks-empty'>
                    {/* if not enough options */}
                        <div className='journal-tasks-empty__image'>
                            <img src={settingsIcon} alt='' />
                        </div>
                        <p className='journal-tasks-empty__descr'>
                            Выберите необходимую <span>группу</span>, <br/> 
                            <span>месяц</span> и <span>дисциплину</span>
                        </p>
                    </div>
                )}
                </>
            )}
                <aside className='journal-sort'>
                    {journal ? (
                        <h2 className='journal-sort__heading'>&nbsp;</h2>
                    ) : (
                        <></>
                    )}
                    <div className='journal-sort__controls'>
                        <FormSelect 
                            name='group'
                            title='Выбор группы' 
                            handler={setSelectedGroup} 
                            options={groups} 
                        />
                        <FormSelect 
                            name='month'
                            title='Выбор месяца' 
                            handler={setSelectedMonth} 
                            options={months} 
                        />
                        <FormSelect
                            name='year'
                            title='Выбор года'
                            handler={setSelectedYear}
                            options={years}
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
                {journal ? (
                    <>
                        <JournalStats
                            image={groupIcon}
                            title='Количество студентов в группе'
                            value={journal.stats.usersQuantity ? journal.stats.usersQuantity : '«нет»'}
                        />
                        <JournalStats
                            image={taskIcon}
                            title='Количество заданий'
                            value={journal.stats.tasksQuantity ? journal.stats.tasksQuantity : '«нет»'}
                        />
                        <JournalStats
                            image={sumIcon}
                            title='Средняя оценка группы'
                            value={journal.stats.avg ? journal.stats.avg : '«нет»'}
                        />
                    </>
                ) : (
                    <>
                        <JournalStats
                            image={groupIcon}
                            title='Количество студентов в группе'
                            value={'?'}
                        />
                        <JournalStats
                            image={taskIcon}
                            title='Количество заданий'
                            value={'?'}
                        />
                        <JournalStats
                            image={sumIcon}
                            title='Средняя оценка группы'
                            value={'?'}
                        />
                    </>
                )}
            </footer>
        </JournalProvider>
    );
}

export default TeacherJournal;