import React from 'react';

let groupList = [
    {
        id: 1,
        title: 'ПР',
        groups: [
            {id: 118, title: 'ПР-18'},
            {id: 119, title: 'ПР-19'},
            {id: 120, title: 'ПР-20'},
            {id: 154, title: 'ПР-21'},
            {id: 142, title: 'ПР-22'},
        ]
    },
    {
        id: 2,
        title: 'ПР',
        groups: [
            {id: 121, title: 'ПР-18'},
            {id: 122, title: 'ПР-19'},
            {id: 123, title: 'ПР-20'},
        ]
    },
    {
        id: 3,
        title: 'ПР',
        groups: [
            {id: 124, title: 'ПР-18'},
            {id: 125, title: 'ПР-19'},
            {id: 126, title: 'ПР-20'},
        ]
    },
    {
        id: 4,
        title: 'ПР',
        groups: [
            {id: 127, title: 'ПР-18'},
            {id: 128, title: 'ПР-19'},
            {id: 129, title: 'ПР-20'},
        ]
    },
    {
        id: 5,
        title: 'ПР',
        groups: [
            {id: 130, title: 'ПР-18'},
            {id: 131, title: 'ПР-19'},
            {id: 132, title: 'ПР-20'},
        ]
    },
    {
        id: 6,
        title: 'ПР',
        groups: [
            {id: 133, title: 'ПР-18'},
            {id: 134, title: 'ПР-19'},
            {id: 135, title: 'ПР-20'},
        ]
    },
];

function GroupsList({ groupList }) {

    function getGroupsName(groups) {
        return groups.map(group => {
            return (
                <li className='groups-sublist__item' key={group.id}>
                    <h4 className='groups-sublist__name'>{ group.title }</h4>
                </li>
            );
        });
    }

    const groupsItems = groupList.map(item => {
        return (
            <li className='groups-list__item' key={item.id}>
                <h3 className='groups-list__title'>«{ item.title }»</h3>
                <ul className='groups-sublist'>{ getGroupsName(item.groups) }</ul>
            </li>
        );
    });
    
    return (
        <ul className='groups-list'> { groupsItems } </ul>
    );
}

export default function Groups() {
    return(
        <div className='groups'>
            <GroupsList groupList={groupList} />
        </div>
    );
}