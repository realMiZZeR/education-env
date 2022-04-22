import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Search from './Search';



let messagesList = [
    {
        id: 1,
        avatar: require('../assets/images/users/egor.jpg'),
        name: 'Егор Мамонов',
        lastMessage: 'надо делать сайт :|',
        notification: 1,
        isOnline: true
    },
    {
        id: 2,
        avatar: require('../assets/images/users/karina.jpg'),
        name: 'Щербакова Карина Алексеевна',
        lastMessage: 'преподаватель я',
        notification: 0,
        isOnline: false
    },
];

function MessagesList({ messagesList }) {
    const messagesItems = messagesList.map(item => {
        return(
            <li 
            className={`messages-list__item ${(item?.notification > 0) ? 'messages-list__item_active' : ''}`} 
            key={item.id}>
                <div className='messages-list__image'>
                    <img src={item.avatar} alt='Аватарка' />
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
    });

    return (
        <ul className='messages-list'>{ messagesItems }</ul>
    );
}

export default function Messages() {
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
                <MessagesList messagesList={messagesList} />
            </div>
        </article>
    );
}