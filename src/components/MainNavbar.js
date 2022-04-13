import React from 'react';
import NavbarList from './NavbarList';
import userImage from '../assets/images/user_image.jfif'
// import { Router, Routes, Route } from 'react-router-dom';

export default function MainNavbar() {
    return (
        <div className='navbar'>
            <div className='navbar-user'>
                <div className='navbar-user__image'>
                    <img src={userImage} alt='' />
                </div>
                <div className='navbar-user__info'>
                    <p className='navbar-user__name'>Кто Т. Т.</p>
                    <small className='navbar-user__attr'>
                        <span>ПР-18,</span>
                        <span>4 курс</span>
                    </small>
                </div>
            </div>
            <NavbarList />
        </div>
    );
}