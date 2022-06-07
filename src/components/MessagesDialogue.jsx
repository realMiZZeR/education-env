import React, { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { useWebSocket } from '../hooks/useWebSocket';

import attachIcon from '../assets/images/icons/attach_file.svg';
import sendIcon from '../assets/images/icons/send.svg';
import bellIcon from '../assets/images/icons/bell.png';
import filesIcon from '../assets/images/icons/files.png';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const MessagesDialogue = () => {

    const { messages, sendMessage } = useWebSocket();

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    const messageFields = {
        text: '',
        files: []
    }

    const [ message, setMessage ] = useState(messageFields);

    const dialogueChangeHandler = (e) => {
        const { name, value } = e.target;

        setMessage({
            ...message,
            [name]: value
        });
    }

    const dialogueFilesHandler = (e) => {
        setMessage({
            ...message,
            files: [
                ...e.target.files
            ]
        });
    }

    const dialogueSubmitHandler = (e) => {
        e.preventDefault();

        sendMessage('отправил сообщение');
    }

    return (
        <article className='dialogue'>
            <header className="dialogue-header">
                <div className="dialogue-header__grouping">
                    <div className={`dialogue-header__image ${isEmptyUserImage(null, 'dialogue-header__image_empty')}`}>
                        <img src={null ? '' : defaultIcon} alt='Аватарка' />
                    </div>
                    <h3 className="dialogue-header__fullname" title=''>Егор Мамонов</h3>
                </div>
                <div className="dialogue-header__grouping">
                    <button title='Прикреплённые файлы' type='button' className='dialogue-header__button button'>
                        <img src={filesIcon} alt='Файлы' />
                    </button>
                    <button title='Отключить оповещения' type='button' className='dialogue-header__button button'>
                        <img src={bellIcon} alt='Оповещения' />
                    </button>
                </div>
            </header>
            <main className="dialogue-main">
                <div className="message">
                    <div className="message-info">
                        <div className={`message-info__image ${isEmptyUserImage(null, 'message-info__image_empty')}`}>
                            <img src={null ? '' : defaultIcon} alt='' />
                        </div>
                        <small className="message-info__time">15:49</small>
                    </div>
                    <div className="message-content">
                        <h3 className="message-content__user">Егор Мамонов</h3>
                        <p className="message-content__text">ывафывыфвыф</p>
                    </div>
                </div>
                <div className="message message_you">
                    <div className="message-info">
                        <div className={`message-info__image ${isEmptyUserImage(null, 'message-info__image_empty')}`}>
                            <img src={null ? '' : defaultIcon} alt='' />
                        </div>
                        <small className="message-info__time">15:49</small>
                    </div>
                    <div className="message-content">
                        <h3 className="message-content__user">Егор Мамонов</h3>
                        <p className="message-content__text">ывафывыфвыф</p>
                    </div>
                </div>
            </main>
            <form onSubmit={dialogueSubmitHandler} encType='multipart/form-data' className="dialogue-form">
                <label htmlFor='files' className='dialogue-form__attach' style={{cursor: 'pointer'}}>
                    <img src={attachIcon} alt='Прикрепить файл' />
                    <input 
                        type='file' 
                        name='files' 
                        onChange={dialogueFilesHandler} 
                        multiple
                    />
                </label>
                    <input 
                        type='text' 
                        name='message'
                        onChange={dialogueChangeHandler}
                        className='dialogue-form__input input' 
                        placeholder='Напишите что-нибудь...'
                    />
                <button type='submit' className='dialogue-form__submit button'>
                    <img src={sendIcon} alt='Отправить '/>
                </button>
            </form>
        </article>
    );
}

export default MessagesDialogue;