import React from 'react';
import NavbarList from './NavbarList';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import defaultUserIcon from '../assets/images/icons/profile/user.svg';

export default function MainNavbar() {

    const { user } = useAuth();

    return (
        <div className='navbar'>
            <div className='navbar-user'>
                <div className={`navbar-user__image ${(!user?.image) ? 'navbar-user__image_default' : ''}`}>
                    <img src={(user?.image) ? user.image : defaultUserIcon} alt='Аватарка' />
                </div>
                <div className='navbar-user__info'>
                    <p className='navbar-user__name'>{ (user?.login) ? user.login : 'Гость' }</p>
                    {user?.login && 
                    <small className='navbar-user__attr'>
                        {user.role === 0 && <span>Студент</span>      }
                        {user.role === 1 && <span>Преподаватель</span>}
                        {user.role === 2 && <span>Администратор</span>}
                    </small>
                    }
                    {!user?.login &&
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