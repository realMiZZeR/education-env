import React, { useEffect, useRef, useState } from 'react';

import GroupInfo from './GroupInfo';
import Search from './Search';

import defaultGroupIcon from '../assets/images/icons/default_group.png';
import { useSavedUsers } from '../hooks/useSavedUsers';
import { useAxios } from '../hooks/useAxios';

const GroupsList = () => {

    const { formValues, setFormValues } = useSavedUsers();

    const [ data, setData ] = useState([]);

    const [groups, isError, isLoading] = useAxios({
        url: '/api/admin/getGroup',
        method: 'get'
    });

    useEffect(() => {
        if(groups && groups.data) setData(groups.data);
    }, [groups]);

    function groupClickHandler(id) {
        setFormValues({
            ...formValues,
            ['group']: id
        });
    }

    return (
        <ul className='groups-selection-list'>
            { !isError && data.map(item => (
                <li 
                key={item.id} 
                className={`groups-selection-list__item ${(item.id === formValues.group) ? 'groups-selection-list__item_current' : ''}`}
                onClick={() => groupClickHandler(item.id)}>
                    <div className='groups-selection-list__image'>
                        <img src={(!item.img) ? defaultGroupIcon : item.img} alt='Аватар группы' />
                    </div>
                    <h4 className='groups-selection-list__title'>{ item.title }</h4>
                </li>
            )) }
            { isError && 
                <div className=''>stop</div>
            }
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
        <div className='create-section'>
            <h2 className='create-section__heading'>
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
        </div>
    );
}

export default GroupWithInfoSelection;