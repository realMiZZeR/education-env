import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSavedUsers } from '../hooks/useSavedUsers';

// images
import emptyGroupIcon from '../assets/images/icons/empty_group.svg';
import defaultUserIcon from '../assets/images/icons/profile/user.svg';
import facultyIcon from '../assets/images/icons/faculty.png';
import calendarIcon from '../assets/images/icons/calendar.svg';
import usersIcon from '../assets/images/icons/users_black.png';

const GroupInfo = ({ refHandler }) => {

    const { formValues } = useSavedUsers();

    const [ isGroupSelected, setIsGroupSelected ] = useState(false);

    const [ groupInfo, setGroupInfo ] = useState(null);
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {
        setIsGroupSelected(Boolean(formValues.group))
    }, [formValues.group]);

    useEffect(() => {
        setIsError(false);

        const fetchData = async () => {
            try {
                const result = await axios(
                    `http://server.selestia.ru/api/admin/getGroupInfo?groupID=${formValues.group}`
                );
                setGroupInfo(result.data);
            } catch (error) {
                setIsError(true);
            }
        }

        fetchData();

    }, [formValues.group]);

    return (
        <div className={`groups-info ${(!isGroupSelected) ? 'groups-info-empty' : ''}`}>
            {!isGroupSelected &&
                <>
                    <div className='groups-info-empty__image'>
                        <img src={emptyGroupIcon} alt='Пустой' />
                    </div>
                    <p className='groups-info-empty__descr'>
                        Выберите <span onClick={refHandler}>группу</span>, чтобы увидеть её данные
                    </p>
                </>
            }
            {isGroupSelected &&
                <>
                    <div className='groups-info__item'>
                        <h3 className='groups-info__heading'>Факультет:</h3>
                        <div className='groups-info__content'>
                            <div className='groups-info__image'>
                                <img src={facultyIcon} alt='Факультет' />
                            </div>
                            <p className='groups-info__text'>{ groupInfo?.facultFullName }</p>
                        </div>
                    </div>
                    <div className='groups-info__item'>
                        <h3 className='groups-info__heading'>Классный руководитель:</h3>
                        <div className='groups-info__content'>
                            <div className='groups-info__image'>
                                <img src={defaultUserIcon} alt='Руководитель' />
                            </div>
                            <p className='groups-info__text'>{ groupInfo?.CuratorFIO }</p>
                        </div>
                    </div>
                    <div className='groups-info__grouping'>
                        <div className='groups-info__item'>
                            <h3 className='groups-info__heading'>Дата поступления:</h3>
                            <div className='groups-info__content'>
                                <div className='groups-info__image'>
                                    <img src={calendarIcon} alt='Дата' />
                                </div>
                                <p className='groups-info__text'>{ groupInfo?.groupYearStart }</p>
                            </div>
                        </div>
                        <div className='groups-info__item'>
                            <h3 className='groups-info__heading'>Дата окончания:</h3>
                            <div className='groups-info__content'>
                                <div className='groups-info__image'>
                                    <img src={calendarIcon} alt='Дата' />
                                </div>
                                <p className='groups-info__text'>{ groupInfo?.groupYearEnd }</p>
                            </div>
                        </div>
                    </div>
                    <div className='groups-info-count'>
                        <div className='groups-info-count__image'>
                            <img src={usersIcon} alt='Студенты' />
                        </div>
                        <p className='groups-info-count__text'>
                            Количество студентов: { groupInfo?.countStudent }
                        </p>
                    </div>
                </>
            }
            
        </div>
    )
}

export default GroupInfo;