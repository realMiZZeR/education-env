import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useModal } from '../hooks/useModal';

import refreshIcon from '../assets/images/icons/refresh.png';
import viewIcon from '../assets/images/icons/view.png';
import correctDateFormat from '../assets/js/correctDateFormat';

import LoadingPage from './LoadingPage';

const baseUrl = 'http://server.selestia.ru';

const ControlSystem = () => {

    const { user } = useAuth();
    const { setModal } = useModal();

    const [ controlsValues, setControlsValues ] = useState({
        lastUpdate: null,
        users: null,
        tasks: null
    });
    const [ controlsValuesIsLoading, setControlsValuesIsLoading ] = useState(null);

    function lastUpdateFormat(initialDate) {
        const date = new Date(initialDate);
        return `${date.toLocaleDateString()} в ${date.getHours()}:${date.getMinutes()}`;
    }

    useEffect(() => {
        const fetchControlsValues = async () => {
            setControlsValuesIsLoading(true);
            await axios.request({
                url: `${baseUrl}/api/admin/getControlsValues`,
                method: 'get',
            }).then(response => {
                const { countTasks, countUsers, dateUpdate } = response.data;
                setControlsValues({
                    lastUpdate: lastUpdateFormat(dateUpdate),
                    users: countUsers,
                    tasks: countTasks,
                });
            }).catch(error => console.warn(error)
            ).finally(() => setControlsValuesIsLoading(false));
        }

        fetchControlsValues();
    }, []);

    const getControlLinkImage = (type) => {
        switch(type) {
            case 'refresh':
                return refreshIcon;
            case 'view':
                return viewIcon;
            default:
                return;
        }
    }

    const refreshTimetable = async () => {
        await axios.post(
            `${baseUrl}/api/admin/updateSchedule`,
            {token: user.token}
        ).then(response => setModal({status: response.status, type: 'REFRESH'})
        ).catch(error => setModal({status: error.response.status, type: 'REFRESH'}));
    } 

    const Control = ({ title, description, value, type }) => {
        return (
            <li className='control-system-list__item'>
                <div className='control-system-list__content'>
                    <h3 className='control-system-list__title'>{ title }</h3>
                    <p className='control-system-list__description'>{ description } <strong>{ value }</strong></p>
                </div>
                {(type === 'view') && <Link to={``} className='control-system-list__button link'>
                    <img src={getControlLinkImage(type)} alt='Кнопка' />
                </Link>}
                {(type === 'refresh') && <button type='button' onClick={refreshTimetable} className='control-system-list__button button'>
                    <img src={getControlLinkImage(type)} alt='Кнопка' />    
                </button>}
            </li>
        )
    }

    return (
        <>
            {controlsValuesIsLoading ? (
                <LoadingPage />
            ) : (
                <article className='control-system'>
                    <h2 className='control-system__heading'>Система контроля</h2>
                    <ul className='control-system-list'>
                        <Control
                            title='Расписание'
                            description='Последний раз обновлено'
                            value={controlsValues.lastUpdate}
                            type='refresh'
                        />
                        <Control
                            title='Пользователи'
                            description='Количество зарегистрированных пользователей:'
                            value={controlsValues.users}
                            type='view'
                        />
                        <Control
                            title='Задания'
                            description='Всего создано заданий для студентов:'
                            value={controlsValues.tasks}
                            type='view'
                        />
                    </ul>
                </article>
            )}
        </>
    );
}

export default ControlSystem;