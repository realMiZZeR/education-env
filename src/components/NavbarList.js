import React from 'react';
import { Link } from 'react-router-dom';

import homeIcon from '../assets/images/icons/home.svg';
import timetableIcon from '../assets/images/icons/timetable.svg';
import tasksIcon from '../assets/images/icons/tasks.svg';
import journalIcon from '../assets/images/icons/journal.svg';
import messsagesIcon from '../assets/images/icons/messages.svg';
import profileIcon from '../assets/images/icons/profile.svg';
import usersIcon from '../assets/images/icons/users.svg';
import logoutIcon from '../assets/images/icons/logout.svg';

const navListItems = [
    {
        key: 1,
        img: homeIcon,
        name: 'Главная',
        link: '/',
        alt: 'Главная'
    },
    {
        key: 2,
        img: timetableIcon,
        name: 'Расписание',
        link: '/timetable',
        alt: 'Расписание'
    },
    {
        key: 3,
        img: tasksIcon,
        name: 'Задания',
        link: '/tasks',
        alt: 'Задания'
    },
    {
        key: 4,
        img: journalIcon,
        name: 'Журнал оценок',
        link: '/journal',
        alt: 'Журнал'
    },
    {
        key: 5,
        img: messsagesIcon,
        name: 'Сообщения',
        link: '/messanges',
        alt: 'Сообщения'
    },
    {
        key: 6,
        img: profileIcon,
        name: 'Личный кабинет',
        link: '/profile',
        alt: 'Профиль'
    },
    {
        key: 7,
        img: usersIcon,
        name: 'Все пользователи',
        link: '/users',
        alt: 'Пользователи'
    },
    {
        key: 8,
        img: logoutIcon,
        name: 'Выход',
        link: '/logout',
        alt: 'Выход'
    },
];

function NavList({ navListItems }) {
    const listItems = navListItems.map(item => {
        return (
        <li className='nav-list__item' key={item.key}>
            <Link to={item.link} className='nav-list__link link'>
                <div className='nav-list__image'>
                    <img src={item.img} alt={item.alt} />
                </div>
                <p className='nav-list__title'>{item.name}</p>
            </Link>
        </li>
        );
    });

    return (
        <ul className='nav-list'>{listItems}</ul>
    );
}

export default function NavbarList(props) {
    return (
        <nav className='navbar-nav nav'>
            <NavList navListItems={navListItems} />
        </nav>
    );
}