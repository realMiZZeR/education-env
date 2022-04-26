import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import GroupInfo from './GroupInfo';
import Search from './Search';

import defaultGroupIcon from '../assets/images/icons/default_group.png';
import { useSavedUsers } from '../hooks/useSavedUsers';

const GroupsList = () => {

    const { formValues, setFormValues } = useSavedUsers();

    const [ data, setData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://server.selestia.ru/api/admin/getGroup'
            );

            setData(result.data);
        }

        fetchData();
    }, []);

    function groupClickHandler(id) {
        setFormValues({
            ...formValues,
            ['group']: id
        });
    }

    return (
        <ul className='groups-selection-list'>
            { data.map(item => (
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
        </ul>
    );
}

const GroupSelection = () => {

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
        {!formValues.isTeacher && 
            <div className='create-section'>
                <h2 className='create-section__heading'>
                    <span>Группа</span>
                    <span>Выбрано: { formValues.group }</span>
                </h2>
                <div className='groups_a'>
                    <div ref={groupSelectionBlock} className='groups-selection'>
                        <Search className={`groups-selection__search search`} />
                        <GroupsList />
                    </div>
                    
                    <GroupInfo refHandler={groupHighlightHandler} />

                </div>
            </div>
        }
        </>
        
    );
}

export default GroupSelection;