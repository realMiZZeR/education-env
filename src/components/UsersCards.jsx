import React from 'react';
import { Link } from 'react-router-dom';

// functions
import getInitials from '../assets/js/getInitials';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

export const UsersCards = ({ users }) => {
    
    return (
        <ul className='users-cards'>
            {users.map( user => {
                return (
                    <li className={`users-cards__item ${(user.isTeacher) ? 'users-cards__item_teacher' : ''}`} key={user.id}>
                        <div className='users-cards-front'>
                            <div className={isEmptyUserImage(user.img, 'users-cards-front__image')}>
                                <img src={(!user.img) ? defaultIcon : `http://server.selestia.ru/${user.img}`} alt='Аватарка' />
                                {user.isOnline && 
                                <span className='online' />
                                }
                            </div>
                            <h3 className='users-cards-front__fullname'>{ getInitials(user.fullname) }</h3>
                        </div>
                        <div className='users-cards-back'>
                            <div className={isEmptyUserImage(user.img, 'users-cards-front__image')}>
                                <img src={(!user.img) ? defaultIcon : `http://server.selestia.ru/${user.img}`} alt='Аватарка' />
                            </div>
                            <h3 className='users-cards-back__fullname'>{ getInitials(user.fullname) }</h3>
                            {user.isTeacher && 
                                <p className='users-cards-back__attr'>Преподаватель</p>
                            }
                            {!user.isTeacher && 
                                <p className='users-cards-back__attr'>
                                    студент группы { user.group }, { user.course } курс
                                </p>
                            }
                            <blockquote className='users-cards-back__blockquote'>
                                <span>{ (user.quote) ? user.quote : '<Тишина...>' }</span>
                            </blockquote>
                            <Link to={`/profile/${user.idUser}`} className='users-cards-back__link link'>
                                Профиль
                            </Link>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}