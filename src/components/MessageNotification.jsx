import React from 'react';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png'

const MessageNotification = ({ userImage, title, message }) => {

    return (
        <div className='modal modal_messages'>
            <div className='modal__image'>
                <img src={userImage ? userImage : defaultIcon} alt='' />
            </div>
            <h3 className='modal__heading'>{ title }</h3>
            <p className='modal__message'>{ message }</p>
        </div>
    );
}

export default MessageNotification;