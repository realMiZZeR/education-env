import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import NavbarList from './NavbarList';
import getInitials from '../assets/js/getInitials';

import defaultUserIcon from '../assets/images/icons/profile/user.svg';

const MainNavbar = () => {

    const { user } = useAuth();

    const [ navbarInfo, setNavbarInfo ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(
                'http://server.selestia.ru/api/user/miniInfo',
                {params: {token: user?.token}}
            ).then(response => {
                setNavbarInfo(response.data)
            }).catch(error => console.warn(`miniinfo ${error}`));
        }

        if(user?.token) fetchData();
    }, [user?.token]);

    return (
        <div className='navbar'>
            <div className='navbar-user'>
                <div className={`navbar-user__image ${(!navbarInfo?.image) ? 'navbar-user__image_default' : ''}`}>
                    <img src={(navbarInfo?.image) ? navbarInfo.image : defaultUserIcon} alt='Аватарка' />
                </div>
                <div className='navbar-user__info'>
                    <p className='navbar-user__name'>{ (user?.token) ? getInitials(navbarInfo?.fullname) : 'Гость' }</p>
                    {user?.token && 
                    <small className='navbar-user__attr'>
                        {user.role === 0 && <span>{navbarInfo?.group}, {navbarInfo?.course} курс</span>}
                        {user.role === 1 && <span>Преподаватель</span>}
                        {user.role === 2 && <span>Администратор</span>}
                    </small>
                    }
                    {!user?.token &&
                    <small className='navbar-user__attr'>
                        <Link to='/' className='navbar-user__link link'>Авторизоваться</Link>
                    </small>
                    }
                </div>
            </div>
            <NavbarList />
        </div>
    );
}

export default MainNavbar;