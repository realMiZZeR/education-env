import React from 'react';

import getTypeOfContact from '../assets/js/getTypeOfContact';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';

import telephoneIcon from '../assets/images/icons/telephone.svg';
import vkLogo from '../assets/images/logos/vk.svg';
import instagramLogo from '../assets/images/logos/instagram.svg';


const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const UserInfo = ({ info }) => {

    function getImageOfContact(type) {
        switch(type) {
            case 'tel':
                return telephoneIcon;
            case 'vk':
                return vkLogo;
            case 'inst':
                return instagramLogo
            default:
                return;
        }
    }

    return (
        <article className='user-info'>
            <h2 className='user-info__heading'>Информация</h2>
            <div className='user-content'>
                <div className='user-content-main'>
                    <div className={`user-content-main__image ${isEmptyUserImage(info.userImage, 'user-content-main__image')}`}>
                        <img src={info.userImage ? info.userImage : defaultIcon} alt='Аватарка' />
                    </div>
                    <div className='user-content-main__block'>
                        <h4 className='user-content-main__name'>{ info.initials }</h4>
                        <p className='user-content-main__student'>
                            {info.role === 0 && <span>студент группы {info.group}, {info.course} курс</span>}
                            {info.role === 1 && <span>преподаватель</span>}
                        </p>
                        <blockquote className='user-content-main__phrase'>
                            {info.phrase ? (
                                <span>{ info.phrase }</span>
                            ) : (
                                <span> &lt;Тишина...&gt; </span>
                            )}
                        </blockquote>
                    </div>
                </div>
                {info.contacts.length > 0 && (
                    <div className='user-content-contacts'>
                        <h3 className='user-content-contacts__heading'>Контактные данные</h3>
                        <ul className='contacts-list'>
                            {info.contacts.map(item => {
                                return (
                                    <li key={item.id} className='contacts-list__item'>
                                        <div className='contacts-list__image'>
                                            <img src={getImageOfContact(item.type)} alt='' />
                                        </div>
                                        <p className='contacts-list__contact'>{ getTypeOfContact(item.link, item.type)  }</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </article>
    );
}

export default UserInfo;