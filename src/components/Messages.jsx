import React from 'react';
import { useLocation } from 'react-router-dom';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';
import Search from './Search';

let messagesList = [
    {
        id: 1,
        img: require('../assets/images/users/egor.jpg'),
        name: 'Егор Мамонов',
        lastMessage: 'надо делать сайт :|',
        notification: 1,
        isOnline: true
    },
    {
        id: 2,
        img: require('../assets/images/users/karina.jpg'),
        name: 'Щербакова Карина Алексеевна',
        lastMessage: 'преподаватель я',
        notification: 0,
        isOnline: false
    },
];

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const Messages = () => {
    const location = useLocation();
    let isHome = (location.pathname === '/home');

    return (
        <article className='messages'>
            {isHome &&
            <div className='messages__heading'>
                <h2 className='messages__title'>Сообщения</h2>
            </div>  
            }
            <div className='messages-info'>
                <Search className='search' />
                <ul className="messages-list">
                    {messagesList.map(item => {
                        return (
                            <li 
                                className={`messages-list__item ${(item?.notification > 0) ? 'messages-list__item_active' : ''}`} 
                                key={item.id}
                            >
                                <div className={`messages-list__image ${isEmptyUserImage(item.img, 'messages-list__image')}`}>
                                    <img src={item.img ? item.img : defaultIcon} alt='Аватарка' />
                                    {item?.isOnline &&
                                    <span className='online' />
                                    }
                                </div>
                                <div className='messages-list__user'>
                                    <h3 className='messages-list__name'>{ item?.name }</h3>
                                    <p className='messages-list__lastmsg'>{ item?.lastMessage }</p>
                                </div>
                                {item?.notification > 0 &&
                                    <div className='messages-list__notification'>
                                        <span>{ item?.notification }</span>
                                    </div>
                                }
                            </li>
                        );
                    })}
                </ul>
            </div>
        </article>
    );
}

export default Messages;