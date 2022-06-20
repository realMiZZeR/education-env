import React from 'react';
import { useJournal } from '../hooks/useJournal';

import correctMarkFormat from '../assets/js/correctMarkFormat';

import placeIcon from '../assets/images/icons/profile/place.svg';
import sumIcon from '../assets/images/icons/sum.png';
import avgIcon from '../assets/images/icons/profile/avg_mark.svg';
import taskIcon from '../assets/images/icons/completed_tasks.png';
import publishedIcon from '../assets/images/icons/tasks/published.png';
import deadlineIcon from '../assets/images/icons/tasks/deadline.png';
import starIcon from '../assets/images/icons/tasks/score.png';

import FullDisciplinesList from './FullDisciplinesList';
import JournalStats from './JournalStats';
import getTypeTask from '../assets/js/getTypeTask';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useState } from 'react';
import LoadingPage from './LoadingPage';
import correctDateFormat from '../assets/js/correctDateFormat';

const StudentJournal = () => {

    const { user } = useAuth();
    const { selectedDiscipline } = useJournal();

    const [ journal, setJournal ] = useState([]);
    const [ journalIsLoading, setIsJournalLoading ] = useState(true);

    // const journal = {
    //     tasks: [
    //         {id: 1, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 2, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 3, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 4, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 5, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 6, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 7, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 8, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //         {id: 9, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    //     ],
    //     stats: {
    //         place: 6,
    //         avgDiscipline: 4.3,
    //         avgSemester: 4.1
    //     }
    // }

    useEffect(() => {
        const fetchJorunal = async () => {
            setIsJournalLoading(true);
            await axios.get(
                `http://server.selestia.ru/api/student/gradeBook`,
                {
                    params: {idDiscipline: selectedDiscipline},
                    headers: {token: user.token}
                }
            ).then(response => setJournal(response.data)
            ).catch(error => console.dir(error)
            ).finally(() => setIsJournalLoading(false));
        }

        if(selectedDiscipline) fetchJorunal();
    }, [user.token, selectedDiscipline]);

    console.log(journal)

    return (
        <>
            <main className='journal-main'>
                {journalIsLoading ? (
                    <LoadingPage />
                ) : (
                    <table className='journal-tasks-wrapper'>
                        <thead className='journal-tasks-head'>
                            <tr className='journal-tasks-head__item'>
                                <th className='journal-tasks__task'>
                                    <img src={taskIcon} alt='Задание' />
                                </th>
                                <th className='journal-tasks__published'>
                                    <img src={publishedIcon} alt='Опубликовано' />
                                </th>
                                <th className='journal-tasks__deadline'>
                                    <img src={deadlineIcon} alt='Срок сдачи' />
                                </th>
                                <th className='journal-tasks__avg'>
                                    <img src={starIcon} alt='Средняя оценка' />
                                </th>
                            </tr>
                        </thead>
                        <tbody className='journal-tasks'>
                            {journal.tasks.map(task => {
                                return (
                                    <tr className='journal-tasks__item'>
                                        {/* add link */}
                                        <td className='journal-tasks__task'>
                                            <div className='journal-tasks__image'>
                                                <img src={getTypeTask({type: task.type})} alt='Аватарка' />
                                            </div>
                                            <h3 className='journal-tasks__title'>{task.title}</h3>
                                        </td>
                                        <td className='journal-tasks__published'>
                                            <span>{correctDateFormat(task.published)}</span>
                                        </td>
                                        <td className='journal-tasks__deadline'>
                                            <span>{correctDateFormat(task.deadline)}</span>
                                        </td>
                                        <td className='journal-tasks__avg'>
                                            <span>{task.mark ? task.mark : '«нет»'}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <aside className='journal-sort'>
                    <h2 className='journal-sort__heading'>&nbsp;</h2>
                    <FullDisciplinesList hook={useJournal} />
                </aside>
            </main>
            <footer className='journal-footer'>
                {!journalIsLoading && (
                    <>
                        <JournalStats
                            image={placeIcon}
                            title='Текущее место дисциплины'
                            value={journal.stats.place}
                        />
                        <JournalStats
                            image={sumIcon}
                            title='Средняя оценка дисциплины'
                            value={correctMarkFormat(journal.stats.avgDiscipline)}
                        />
                        <JournalStats
                            image={avgIcon}
                            title='Средняя оценка за весь семестр'
                            value={correctMarkFormat(journal.stats.avgSemester)}
                        />
                    </>
                )}
            </footer>
        </>
    );
}

export default StudentJournal;