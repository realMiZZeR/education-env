import React, { useEffect, useState } from 'react';

import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

// hooks
import { useTimetable } from '../hooks/useTimetable';
import { useAxios } from '../hooks/useAxios';

const GroupsList = ({ groupsList }) => {

    const { selectedGroup, setSelectedGroup } = useTimetable();

    const groupClickHandler = (id) => {
        setSelectedGroup(id);
    }
    
    return (
        <ul className='groups-list'>
            { groupsList.map(item => {
                return (
                    <li className='groups-list__item' key={ item.id }>
                        <h3 className='groups-list__title'>«{ item.title }»</h3>
                        <ul className='groups-sublist'>
                        {/* groups list */}
                            {item.groups.map(group => {
                                return (
                                    <li 
                                    className={`groups-sublist__item ${(group.id === selectedGroup) ? 'groups-sublist__item_current' : ''}`} 
                                    key={group.id}
                                    onClick={() => { groupClickHandler(group.id) } }>
                                        <h4 className='groups-sublist__name'>{ group.name }</h4>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                )
            }) } 
        </ul>
    );
}

const TimetableGroups = () => {

    const [ data, setData ] = useState([]);

    const [ groups, isError, isLoading ] = useAxios({
        url: `/api/getAll`,
        method: 'get'
    });

    useEffect(() => {
        console.log(groups)
        if(groups && groups.data) setData(groups.data);
    }, [groups]);

    return (
        <div className='groups'>
        {isLoading ? (
            <LoadingPage />   
        ) : (
            <>
                {!isError ? (
                    <GroupsList groupsList={data} />
                ) : (
                    <ErrorPage error="CONNECTION_REFUSED" />
                ) }
            </>
        )}
        </div>
    );
}

export default TimetableGroups;