import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import userIcon from '../assets/images/icons/tasks/user.png';
import markIcon from '../assets/images/icons/tasks/score.png';
import groupIcon from '../assets/images/icons/users_black.png';
import tasksIcon from '../assets/images/icons/completed_tasks.png';

import placeIcon from '../assets/images/icons/profile/place.svg';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';
import updateTitle from '../assets/js/updateTitle';
import getDisciplineImage from '../assets/js/getDisciplineImage';

import LoadingPage from '../components/LoadingPage';

import TaskAttribute from '../components/TaskAttribute';
import { useAuth } from '../hooks/useAuth';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const LeaderboardPage = (props) => {

    // params contain: id (discipline)
    const params = useParams();
    const { user } = useAuth();

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const [ leaderboard, setLeaderboard ] = useState([]);
    const [ leaderboardIsLoading, setLeaderboardIsLoading ] = useState(true);

    const [ idDiscipline, setIdDiscipline ] = useState(null);

    useEffect(() => {
        setIdDiscipline(params.id)
    }, [params.id]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLeaderboardIsLoading(true);
            await axios.get(
                `http://server.selestia.ru/api/student/getListRaitingDiscipline`,
                {
                    params: {idDiscipline: idDiscipline},
                    headers: {token: user.token}
                }
            ).then(response => setLeaderboard(response.data)
            ).catch(error => console.dir(error)
            ).finally(() => setLeaderboardIsLoading(false));
        }

        if(idDiscipline) fetchLeaderboard();
    }, [idDiscipline]);

    return (
        <>
            {leaderboardIsLoading ? (
                <LoadingPage />
            ) : (
                <article className='leaderboard'>
                    <table className="leaderboard-table-wrapper">
                        <tbody className='leaderboard-table'>
                            <tr className='leaderboard-table__heading'>
                                <th className='leaderboard-table__user'>
                                    <img src={userIcon} alt='Студент' />
                                </th>
                                <th className='leaderboard-table__group'>
                                    <img src={groupIcon} alt='Группа' />
                                </th>
                                <th className="leaderboard-table__mark">
                                    <img src={markIcon} alt='Оценка' />
                                </th>
                                <th className='leaderboard-table__tasks'>
                                    <img src={tasksIcon} alt='Выполненные задания' />
                                </th>
                            </tr>
                            {leaderboard.users && leaderboard.users.map((user) => {
                                return (
                                    <tr key={user.id} className="leaderboard-table__item">
                                        <td className='leaderboard-table__user'>
                                            <div className={isEmptyUserImage(user.img, 'leaderboard-table__image')}>
                                                <img src={user.img ? user.img : defaultIcon} alt='Аватарка' />
                                            </div>
                                            <p className='leaderboard-table__fullname' title={user.fullname}>{user.fullname}</p>
                                        </td>
                                        <td className='leaderboard-table__group'>
                                            <span>{user.group}</span>
                                        </td>
                                        <td className="leaderboard-table__mark">
                                            <span>{user.mark ? user.mark : '0'}</span>
                                        </td>
                                        <td className='leaderboard-table__tasks'>
                                            <span>{user.completedTasks ? user.completedTasks : '0'}</span>
                                        </td>    
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <aside className='leaderboard-aside'>
                        <TaskAttribute 
                            title='Дисциплина'
                            image={getDisciplineImage({type: 1})}
                            value={leaderboard.disciplineTitle}  
                        />
                        <TaskAttribute
                            title='Текущая позиция'
                            image={placeIcon}
                            value={`${leaderboard.place} место`}        
                        />
                    </aside>
                </article>
            )}
        </>
    );
}

export default LeaderboardPage;