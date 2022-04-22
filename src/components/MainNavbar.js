import React from 'react';
import NavbarList from './NavbarList';
import userImage from '../assets/images/user_image.jfif'
import { AuthProvider } from '../hoc/AuthProvider'; 
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import defaultUserIcon from '../assets/images/icons/profile/user.svg';

export default function MainNavbar() {

    const { user } = useAuth() || {};

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
                        <span>ПР-18,</span>
                        <span>4 курс</span>
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