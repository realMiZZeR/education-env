import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

const NavList = () => {

    const { user, signOut, isAdmin } = useAuth() || {};
    const navigate = useNavigate();
    const location = useLocation();

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
                link: '/messager',
                alt: 'Сообщения'
            },
            {
                key: 6,
                img: profileIcon,
                imgActive: profileIconActive,
                name: 'Личный кабинет',
                link: `/profile/${user?.login}`,
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
                key: 5,
                img: messsagesIcon,
                imgActive: messsagesIconActive,
                name: 'Сообщения',
                link: '/messager',
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
        ]
    }

    const [ currentNavbar, setCurrentNavbar ] = useState(navListItems.guest);

    useEffect(() => {
        if(!user) {
            setCurrentNavbar(navListItems.guest);
        }
        if(user) {
            setCurrentNavbar(navListItems.auth)
        }
        if(isAdmin) {
            setCurrentNavbar(navListItems.admin);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.login]);

    const hoverItem = (e, img, isCurrent) => {
        if(isCurrent) return;
        e.currentTarget.children[0].children[0].children[0].src = img;
    }

    const listItems = currentNavbar.map(item => {
        let isCurrent = (location.pathname === item.link)
        return (
        <li 
        className={`nav-list__item ${isCurrent ? 'nav-list__item_active' : ''} ${item.name === 'Выход' ? 'nav-list__item_exit' : ''}`} 
        key={item.key}
        onClick={item.name === 'Выход' ? () => signOut(() => navigate(item.link, {replace: true})) : null}
        onMouseEnter={ e => { hoverItem(e, item.imgActive, isCurrent) } }
        onMouseLeave={ e => { hoverItem(e, item.img, isCurrent)} }>

            <Link to={item.link} className='nav-list__link link'>
                <div className='nav-list__image'>
                    <img src={`${isCurrent ? item.imgActive : item.img}`} alt={item?.alt} />
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

const NavbarList = () => {
    return (
        <nav className='navbar-nav nav'>
            <NavList />
        </nav>
    );
}

export default NavbarList;