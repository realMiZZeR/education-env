import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import homeIcon from '../assets/images/icons/home.svg';
import timetableIcon from '../assets/images/icons/timetable.svg';
import tasksIcon from '../assets/images/icons/tasks.svg';
import journalIcon from '../assets/images/icons/journal.svg';
import messsagesIcon from '../assets/images/icons/messages.svg';
import profileIcon from '../assets/images/icons/profile.svg';
import usersIcon from '../assets/images/icons/users.svg';
import logoutIcon from '../assets/images/icons/logout.svg';

import homeIconActive from '../assets/images/icons/home_active.svg';
import timetableIconActive from '../assets/images/icons/timetable_active.svg';
import tasksIconActive from '../assets/images/icons/tasks_active.svg';
import journalIconActive from '../assets/images/icons/journal_active.svg';
import messsagesIconActive from '../assets/images/icons/messages_active.svg';
import profileIconActive from '../assets/images/icons/profile_active.svg';
import usersIconActive from '../assets/images/icons/users_active.svg';
import logoutIconActive from '../assets/images/icons/logout_active.svg';

const navListItems = {
    guest: [
        {
            key: 1,
            img: homeIcon,
            imgActive: homeIconActive,
            name: 'Главная',
            link: '/',
            alt: 'Главная'
        },
        {
            key: 2,
            img: timetableIcon,
            imgActive: timetableIconActive,
            name: 'Расписание',
            link: '/timetable',
            alt: 'Расписание'
        },
    ],
    auth: [
        {
            key: 1,
            img: homeIcon,
            imgActive: homeIconActive,
            name: 'Главная',
            link: '/home',
            alt: 'Главная'
        },
        {
            key: 2,
            img: timetableIcon,
            imgActive: timetableIconActive,
            name: 'Расписание',
            link: '/timetable',
            alt: 'Расписание'
        },
        {
            key: 3,
            img: tasksIcon,
            imgActive: tasksIconActive,
            name: 'Задания',
            link: '/tasks',
            alt: 'Задания'
        },
        {
            key: 4,
            img: journalIcon,
            imgActive: journalIconActive,
            name: 'Журнал оценок',
            link: '/journal',
            alt: 'Журнал'
        },
        {
            key: 5,
            img: messsagesIcon,
            imgActive: messsagesIconActive,
            name: 'Сообщения',
            link: '/messanges',
            alt: 'Сообщения'
        },
        {
            key: 6,
            img: profileIcon,
            imgActive: profileIconActive,
            name: 'Личный кабинет',
            link: '/profile',
            alt: 'Профиль'
        },
        {
            key: 7,
            img: usersIcon,
            imgActive: usersIconActive,
            name: 'Все пользователи',
            link: '/users',
            alt: 'Пользователи'
        },
        {
            key: 8,
            img: logoutIcon,
            imgActive: logoutIconActive,
            name: 'Выход',
            link: '/',
            alt: 'Выход'
        },
    ],
    admin: [
        
    ]
}

function NavList({ navListItems }) {

    const { user, signOut } = useAuth() || {};
    const navigate = useNavigate();

    let currentNavbar = navListItems.guest;
    if(user) currentNavbar = navListItems.auth;
    if(user?.login === 'admin') currentNavbar = navListItems.admin;

    const listItems = currentNavbar.map(item => {
        return (
        <li 
        className='nav-list__item' 
        key={item.key}
        onClick={item.name === 'Выход' ? () => signOut(() => navigate(item.link, {replace: true})) : undefined}
        onMouseEnter={ e => { e.currentTarget.children[0].children[0].children[0].src = item.imgActive } }
        onMouseLeave={  e => { e.currentTarget.children[0].children[0].children[0].src = item.img } }>
            <Link to={item.link} className='nav-list__link link'>
                <div className='nav-list__image'>
                    <img src={item.img} alt={item?.alt} />
                </div>
                <p className='nav-list__title'>{item?.name}</p>
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