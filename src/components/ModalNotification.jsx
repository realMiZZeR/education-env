import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';
import { useModal } from '../hooks/useModal';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png'

const ModalNotification = ({context = {title: '', message: '', type: ''}}) => {

    const { notifications } = useModal();

    // all avaiable types of notifications
    const types = [
        {id: 200, name: 'success'},
        {id: 500, name: 'message'},
        {id: 502, name: 'error'},
    ];

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    return (
        <div className='modal-wrapper'>
        {/* content = {title, message, type} */}
            {notifications.map(content => {
                return (
                    <CSSTransition>
                    <div className={`modal modal_${content.type}`}>
                        {/* content.type === 'message' */}
                        {content.type === types[1].name &&
                        <div className={`modal__image ${isEmptyUserImage(content.image, 'modal__image')}`}>
                            <img src={(content.image) ? content.image : defaultIcon} alt='Аватарка' />
                        </div>
                        }
                        <h3 className='modal__heading'>{ content.title }</h3>
                        <p className='modal__message'>{ content.message }</p>
                    </div>
                    </CSSTransition>
                );
            })}
        </div>
    );
}

export default ModalNotification;