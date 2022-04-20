import React from 'react';
import getTypeOfContact from '../assets/js/checkContacts';

function ContactsList({ contactsList }) {

    const contactsItems = contactsList.map(item => {
        return (
            <li key={item.id} className='contacts-list__item'>
                <div className='contacts-list__image'>
                    <img src={item.img} alt='' />
                </div>
                <p className='contacts-list__contact'>{ getTypeOfContact(item.link, item.type)  }</p>
            </li>
        );
    });

    return(
        <ul className='contacts-list'>{ contactsItems }</ul>
    );
}

function UserInfo({ userInfo }) {
    const { userImage, initials, course, group, phrase, contacts } = userInfo;

    return (
        <article className='user-info'>
            <h2 className='user-info__heading'>Информация</h2>
            <div className='user-content'>
                <div className='user-content-main'>
                    <div className='user-content-main__image'>
                        <img src={userImage} alt='Аватарка' />
                    </div>
                    <div className='user-content-main__block'>
                        <h4 className='user-content-main__name'>{ initials }</h4>
                        <p className='user-content-main__student'>студент группы {group}, {course} курс</p>
                        <blockquote className='user-content-main__phrase'>
                            <span>{ phrase }</span>
                        </blockquote>
                    </div>
                </div>
                <div className='user-content-contacts'>
                    <h3 className='user-content-contacts__heading'>Контактные данные</h3>
                    <ContactsList contactsList={contacts} />
                </div>
            </div>
        </article>
    );
}

export default UserInfo;