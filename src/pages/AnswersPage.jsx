import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import updateTitle from '../assets/js/updateTitle';
import getTypeTask from '../assets/js/getTypeTask';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';
import getDisciplineImage from '../assets/js/getDisciplineImage';
import correctDateFormat from '../assets/js/correctDateFormat';

import publishedIcon from '../assets/images/icons/tasks/published.png';
import deadlineIcon from '../assets/images/icons/tasks/deadline.png';
import userIcon from '../assets/images/icons/tasks/user.png';
import timeIcon from '../assets/images/icons/tasks/time.png';
import scoreIcon from '../assets/images/icons/tasks/score.png';
import taskIcon from '../assets/images/icons/tasks/task.png';
import groupIcon from '../assets/images/icons/group.svg';
import replyIcon from '../assets/images/icons/reply.png'

import TaskAttribute from '../components/TaskAttribute';
import LoadingPage from '../components/LoadingPage';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const AnswersPage = (props) => {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const params = useParams();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ data, setData ] = useState([]);

    useEffect(() => {
        const getAnswers = async () => {
            await axios.get(
                'http://server.selestia.ru/api/teacher/getAnswersTask',
                { params: { idTask: params.id } }
            ).then(response => {
                setData(response.data);
            }
            ).catch(error => console.warn(error)
            ).finally(() => setIsLoading(false));
        }

        getAnswers();
    }, [params.id]);

    return (
        <div className='tasks-wrapper'>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <>
                    <table className='replies-list__wrapper'>
                        <tbody className='replies-list'>
                            <tr className='replies-list__heading'>
                                <th className='replies-list__author'>
                                    <img src={userIcon} alt='Студенты' />
                                </th>
                                <th className='replies-list__dating'>
                                    <img src={timeIcon} alt='Время сдачи задания' />

                                </th>
                                <th className='replies-list__mark'>
                                    <img src={scoreIcon} alt='Оценка' />
                                </th>
                            </tr>
                            {data.studentAnswer && data.studentAnswer.map(answer => {
                                return (
                                    <tr key={answer.id} className='replies-list__item'>
                                        <Link to={`/tasks/${params.id}/answers/${answer.id}`} className='replies-list__link link'>
                                            <td className='replies-list__author'>
                                                <div className={`replies-list__image ${isEmptyUserImage(answer.image, 'replies-list__image')}`}>
                                                    <img src={(answer.image) ? answer.image : defaultIcon} alt='Аватарка' />
                                                </div>
                                                <p className='replies-list__fullname' title={answer.fullname}>
                                                    { answer.fullname }
                                                </p>
                                            </td>
                                            <td className='replies-list__dating'>
                                                {answer.dateAnswer && 
                                                    <>
                                                        <p className='replies-list__date'>{ correctDateFormat(answer.dateAnswer) }</p>
                                                        <small className='replies-list__time'>{ (new Date(answer.dateAnswer).toLocaleTimeString()) }</small>
                                                    </>           
                                                }
                                                {!answer.dateAnswer &&
                                                    <p className='replies-list__date'>«нет»</p>
                                                }
                                            </td>
                                            <td className='replies-list__mark'>
                                                <p className='replies-list__mark'>{ (answer.mark) ? Number(answer.mark).toFixed(2) : '«нет»' }</p>
                                            </td>
                                        </Link>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <aside className='tasks-aside'>
                        <Link to={`/tasks/${params.id}/answers`} className='tasks-aside__link link'>
                            <div className='tasks-aside__image'>
                                <img src={taskIcon} alt='Задание' />
                            </div>
                            <h2 className='tasks-aside__heading'>{data.taskTitle}</h2>
                        </Link>
                        <div className='task-attributes'>
                            <TaskAttribute 
                                title='Дисциплина'
                                image={getDisciplineImage({type: 1})}
                                value={data.disciplineTitle}  
                            />
                            <TaskAttribute 
                                title='Тип задания'
                                image={getTypeTask({type: data.type.typeId})}
                                value={data.type.typeTitle}  
                            />
                            <TaskAttribute 
                                title='Опубликовано'
                                image={publishedIcon}
                                value={correctDateFormat(data.published)}  
                            />
                            <TaskAttribute 
                                title='Срок сдачи'
                                image={deadlineIcon}
                                value={correctDateFormat(data.dateTo)}  
                            />
                            <footer className='task-attributes__footer'>
                                <div to={`/messanges/${data.groupTitle}`} className='task-attributes-author'>
                                    <TaskAttribute 
                                        title='Группа'
                                        image={groupIcon}
                                        value={data.groupTitle}  
                                    />
                                    <TaskAttribute 
                                        title='Всего ответов'
                                        image={replyIcon}
                                        value={data.answerCount}  
                                    />
                                </div>
                            </footer>
                        </div>
                    </aside>
                </>
            )}
           
        </div>
    );
}

export default AnswersPage;