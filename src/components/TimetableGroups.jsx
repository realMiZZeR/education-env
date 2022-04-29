import React from 'react';

import { Error } from './Error';

// hooks
import { useFetchAPI } from '../hooks/useFetchAPI';
import { useTimetable } from '../hooks/useTimetable';

const GroupsList = ({ groupsList }) => {

    const { selectedGroup, setSelectedGroup } = useTimetable();

    const groupClickHandler = (id) => {
        setSelectedGroup(id);
    }

    // all avaiable groups
    const getGroupsName = (groups) => {
        return groups.map(group => {
            return (
                <li 
                className={`groups-sublist__item ${(group.id === selectedGroup) ? 'groups-sublist__item_current' : ''}`} 
                key={group.id}
                onClick={() => { groupClickHandler(group.id) } }>
                    <h4 className='groups-sublist__name'>{ group.name }</h4>
                </li>
            );
        });
    }

    // heading
    const groupsItems = groupsList.map(item => {
        return (
            <li className='groups-list__item' key={ item.id }>
                <h3 className='groups-list__title'>«{ item.title }»</h3>
                <ul className='groups-sublist'>{ getGroupsName(item.groups) }</ul>
            </li>
        );
    });
    
    return (
        <ul className='groups-list'> { groupsItems } </ul>
    );
}

export default function TimetableGroups() {

    const [{ data, isError }, doFetch] = useFetchAPI(
        'http://server.selestia.ru/api/getAll',
        [],
    );

    return(
        <div className='groups'>
            { !isError && <GroupsList groupsList={data} />}
            { isError && <Error />}
        </div>
    );
}