import React, { useEffect, useRef, useState } from 'react';

import GroupInfo from './GroupInfo';
import Search from './Search';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

import defaultGroupIcon from '../assets/images/icons/default_group.png';
import { useSavedUsers } from '../hooks/useSavedUsers';
import { useAxios } from '../hooks/useAxios';
import switchItemActive from '../assets/js/switchItemActive';

const GroupsList = () => {

    const { formValues, setFormValues } = useSavedUsers();

    const [ data, setData ] = useState([]);

    const [groups, isError, isLoading] = useAxios({
        url: '/api/admin/getGroup',
        method: 'get'
    });

    useEffect(() => {
        if(groups && groups.data) setData(groups.data.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1: 0)));
    }, [groups]);

    function groupClickHandler(id) {
        switchItemActive(
            {
                initialObject: formValues, 
                setHandler: setFormValues,
                modifyProperty: 'group', 
                initialValue: id,
            }
        );
    }

    return (
        <ul className='groups-selection-list'>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <>
                    {!isError ? (
                        data.map(item => {
                            return <li 
                            key={item.id} 
                            className={`groups-selection-list__item ${(item.id === formValues.group) ? 'groups-selection-list__item_current' : ''}`}
                            onClick={() => groupClickHandler(item.id)}>
                                <div className='groups-selection-list__image'>
                                    <img src={(!item.img) ? defaultGroupIcon : item.img} alt='Аватар группы' />
                                </div>
                                <h4 className='groups-selection-list__title'>{ item.title }</h4>
                            </li>
                        })
                    ) : (
                        <ErrorPage error='CONNECTION_REFUSED' />
                    )}
                </>
            )}
        </ul>
    );
}

const GroupWithInfoSelection = () => {

    const { formValues } = useSavedUsers();

    const groupSelectionBlock = useRef(null);

    function groupHighlightHandler() {
        const elem = groupSelectionBlock.current;
        const classNames = elem.className;
        elem.className = `${classNames} ${elem.className}_highlight`;
    
        setTimeout(() => {
            elem.className = classNames;
        }, 3000);
    } 

    return (
        <>
            <h2 className='create-form__heading create-form__heading_group'>
                <span>Группа</span>
                <span>
                    Выбрано: { (formValues.group) ? formValues.group : 'нет' }
                </span>
            </h2>
            <div className='groups_a'>
                <div ref={groupSelectionBlock} className='groups-selection'>
                    <Search className={`groups-selection__search search`} />
                    <GroupsList />
                </div>
                <GroupInfo refHandler={groupHighlightHandler} />
            </div>
        </>
    );
}

export default GroupWithInfoSelection;