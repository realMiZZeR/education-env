import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { useMessages } from '../hooks/useMessages';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';

import attachIcon from '../assets/images/icons/attach_file.svg';
import sendIcon from '../assets/images/icons/send.svg';
import bellIcon from '../assets/images/icons/bell.png';
import filesIcon from '../assets/images/icons/files.png';
import emptyMessages from '../assets/images/icons/no_messages.png';
import chatSelect from '../assets/images/icons/chat_select.png';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const MessagesDialogue = () => {

    const { websocket } = useAuth();
    const { user } = useAuth();
    const { currentDialogue } = useMessages();

    const [ dialogue, setDialogue ] = useState([]);

    useEffect(() => {
        const fetchDialogue = async () => {
            await axios.get(
                `http://server.selestia.ru/api/users/dialogInfo`,
                {
                    headers: {token: user.token},
                    params: {idDialog: currentDialogue}
                }
            ).then(response => setDialogue(response.data)
            ).catch(error => console.dir(error)
            ).finally(() => {});
        }

        if(currentDialogue) fetchDialogue();
    }, [websocket.messages, currentDialogue, user.token]);

    const userMessageFields = {
        text: '',
        files: []
    }

    const [ userMessage, setUserMessage ] = useState(userMessageFields);

    const dialogueChangeHandler = (e) => {
        const { name, value } = e.target;

        setUserMessage({
            ...userMessage,
            [name]: value
        });
    }

    const dialogueFilesHandler = (e) => {
        setUserMessage({
            ...userMessage,
            files: [
                ...e.target.files
            ]
        });
    }

    // send message
    const dialogueSubmitHandler = async (e) => {
        e.preventDefault();
        if(!userMessage) return;

        await axios.post(
            'http://server.selestia.ru/api/sendMessage',
            {
                idDialog: currentDialogue,
                message: userMessage.text
            },
            {
                headers: {token: user.token}
            }
        ).then(response => console.log(response)
        ).catch(error => console.dir(error));
    }

    // show control buttons under a message
    const showMessageControls = (e) => {
        let elem = e.currentTarget;
        let classNames = elem.className;
        if(elem.classList.contains('message_controls')) {
            return elem.classList.remove('message_controls');
        }
        elem.className = `${classNames} message_controls`
    }

    // edit message
    const editMessageHandler = (mes) => {
        setUserMessage({
            ...userMessage,
            text: mes
        });
    }

    // delete message
    const deleteMessageHandler = async (id) => {

    }

    return (
        <article className='dialogue'>
        {currentDialogue ? (
            <>
                <header className="dialogue-header">
                    <div className="dialogue-header__grouping">
                        <div className={`dialogue-header__image ${isEmptyUserImage(null, 'dialogue-header__image_empty')}`}>
                            <img src={dialogue.imageDialog ? dialogue.imageDialog : defaultIcon} alt='Аватарка' />
                        </div>
                        <h3 className="dialogue-header__fullname" title={dialogue.nameDialog}>{dialogue.nameDialog}</h3>
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
                <main className='dialogue-main'>
                {(dialogue.messages && dialogue.messages.length > 0) ? (
                    <>
                    {dialogue.messages.map(mes => {
                        return (
                            <div 
                                key={mes.id}
                                className={`message ${mes.isYou ? 'message_you' : ''}`}
                                onClick={showMessageControls}
                            >
                                <div className='message-info'>
                                    <div className={`message-info__image ${isEmptyUserImage(mes.author.image, 'message-info__image_empty')}`}>
                                        <img src={mes.author.image ? mes.author.image : defaultIcon} alt='Аватарка' />
                                    </div>
                                    <small className='message-info__time'>{mes.time}</small>
                                </div>
                                <div className='message-content'>
                                    <h3 className="message-content__user">{mes.author.fio}</h3>
                                    <p className='message-content__text'>{mes.textMessage}</p>
                                </div>
                                <div className='message-controls'>
                                    <button 
                                        className='message-controls__button button'
                                        onClick={() => editMessageHandler(mes.textMessage)}
                                    >
                                        <span>Редактировать</span>
                                    </button>
                                    <button 
                                        className='message-controls__button button'
                                        onClick={() => deleteMessageHandler(mes.id)}
                                    >
                                        <span>Удалить</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })} 
                    </>
                ) : (
                    <div className='dialogue-main-empty'>
                        <div className='dialogue-main-empty__image'>
                            <img src={emptyMessages} alt=''/>
                        </div>
                        <p className='dialogue-main-empty__description'>
                            Здесь пока что пусто...<br />
                            Но вы можете <span>начать</span> диалог первым!
                        </p>
                    </div>
                )}
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
                        <textarea 
                            type='text' 
                            name='text'
                            onChange={dialogueChangeHandler}
                            className='dialogue-form__input input' 
                        />
                    <button type='submit' className='dialogue-form__submit button'>
                        <img src={sendIcon} alt='Отправить '/>
                    </button>
                </form>
            </>
        ) : (
            <div className='dialogue-empty'>
                <div className='dialogue-empty__image'>
                    <img src={chatSelect} alt=''/>
                </div>
                <p className='dialogue-empty__description'>
                    Выберите собеседника из списка<br/>
                    или найдите <span>нового</span>
                </p>
            </div>
        )}
            
        </article>
    );
}

export default MessagesDialogue;