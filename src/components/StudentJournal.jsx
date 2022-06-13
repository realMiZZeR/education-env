import React from 'react';
import { JournalProvider } from '../hoc/JournalProvider';
import { useJournal } from '../hooks/useJournal';

import placeIcon from '../assets/images/icons/profile/place.svg';
import sumIcon from '../assets/images/icons/sum.png';
import avgIcon from '../assets/images/icons/profile/avg_mark.svg';
import taskIcon from '../assets/images/icons/completed_tasks.png';
import publishedIcon from '../assets/images/icons/tasks/published.png';
import deadlineIcon from '../assets/images/icons/tasks/deadline.png';
import starIcon from '../assets/images/icons/tasks/score.png';

import FullDisciplinesList from './FullDisciplinesList';
import getTypeTask from '../assets/js/getTypeTask';

const StudentJournal = () => {

    const tasks = [
        {id: 1, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 2, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 3, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 4, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 5, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 6, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 7, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 8, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
        {id: 9, title: 'задание', published: '23.02.2022', deadline: '24.02.2022', avg: '5', type: 1},
    ]

    const JournalStats = ({ image, title, value }) => {
        return (
            <div className='journal-stats'>
                <div className="journal-stats__image">
                    <img src={image} alt={title} />
                </div>
                <p className='journal-stats__title'>{title}</p>
                <h2 className='journal-stats__value'>
                    <span>{value}</span>
                </h2>
            </div>
        );
    }

    return (
        <JournalProvider>
            <main className='journal-main'>
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
                        {tasks.map(task => {
                            return (
                                <tr className='journal-tasks__item'>
                                    <td className='journal-tasks__task'>
                                        <div className='journal-tasks__image'>
                                            <img src={getTypeTask({type: task.type})} alt='Аватарка' />
                                        </div>
                                        <h3 className='journal-tasks__title'>{task.title}</h3>
                                    </td>
                                    <td className='journal-tasks__published'>
                                        <span>{task.published}</span>
                                    </td>
                                    <td className='journal-tasks__deadline'>
                                        <span>{task.deadline}</span>
                                    </td>
                                    <td className='journal-tasks__avg'>
                                        <span>{task.avg}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <FullDisciplinesList hook={useJournal} />
            </main>
            <footer className='journal-footer'>
                <JournalStats
                    image={placeIcon}
                    title='Текущее место дисциплины'
                    value={6}
                />
                <JournalStats
                    image={sumIcon}
                    title='Средняя оценка дисциплины'
                    value={'5,00'}
                />
                <JournalStats
                    image={avgIcon}
                    title='Средняя оценка за весь семестр'
                    value={'4,63'}
                />
            </footer>
        </JournalProvider>
    );
}

export default StudentJournal;