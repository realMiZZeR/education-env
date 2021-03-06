import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

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

    const formTextareaRef = useRef(null);

    const [ dialogue, setDialogue ] = useState([]);

    const messageActFields = {
        id: null,
        type: null,
        value: null
    }
    const [ messageAct, setMessageAct ] = useState(messageActFields);

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

        console.log(websocket.messages);

        if(currentDialogue) fetchDialogue();
    }, [websocket.messages, currentDialogue, user.token]);

    const userMessageFields = {
        text: '',
        files: []
    }

    const [ userMessage, setUserMessage ] = useState(userMessageFields);

    const dialogueChangeHandler = (e) => {
        if(e.currentTarget.classList.contains('input_error')) {
            e.currentTarget.classList.remove('input_error');
        }

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
        if(!userMessage.text) {
            formTextareaRef.current.className = `${formTextareaRef.current.className} input_error`;
            return;
        }

        if(messageAct.value) {
            console.log(currentDialogue);
            console.log(messageAct.id);
            console.log(messageAct.value);
            await axios.post(
                `http://server.selestia.ru/api/user/updateMessage`,
                {
                    idDialog: currentDialogue,
                    idMessage: messageAct.id,
                    textMessage: userMessage.text
                },
                {
                    headers: {token: user.token}
                }
            ).then(response => console.log(response)
            ).catch(error => console.dir(error)
            ).finally(() => {
                setMessageAct(messageActFields);
                setUserMessage(userMessageFields);
            });

            return;
        }

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
    const editMessageHandler = (id, mes) => {
        setUserMessage({
            ...userMessage,
            text: mes
        });
        setMessageAct({
            id: id,
            type: 'edit',
            value: mes
        });
    }

    // cancel edit
    const cancelActHandler = () => {
        setUserMessage({
            text: '',
        })
        setMessageAct(messageActFields);
    }

    // delete message
    const deleteMessageHandler = async (id) => {
        // setMessageAct({
        //     type: 'delete',
        //     value: id
        // });
        await axios.post(
            'http://server.selestia.ru/api/users/deleteMessage',
            {
                idDialog: currentDialogue,
                idMessage: id
            },
            {
                headers: {token: user.token}
            }
        ).catch(error => console.dir(error)
        ).finally(() => setMessageAct(messageActFields));
    }

    const getActText = (type) => {
        switch(type) {
            case 'edit':
                return '????????????????????????????';
            case 'delete':
                return '???????????????';
            default:
                return;
        }
    }

    return (
        <article className='dialogue'>
        {currentDialogue ? (
            <>
                <header className="dialogue-header">
                    <div className="dialogue-header__grouping">
                        <div className={`dialogue-header__image ${isEmptyUserImage(null, 'dialogue-header__image_empty')}`}>
                            <img src={dialogue.imageDialog ? dialogue.imageDialog : defaultIcon} alt='????????????????' />
                        </div>
                        <h3 className="dialogue-header__fullname" title={dialogue.nameDialog}>{dialogue.nameDialog}</h3>
                    </div>
                    <div className="dialogue-header__grouping">
                        <button title='?????????????????????????? ??????????' type='button' className='dialogue-header__button button'>
                            <img src={filesIcon} alt='??????????' />
                        </button>
                        <button title='?????????????????? ????????????????????' type='button' className='dialogue-header__button button'>
                            <img src={bellIcon} alt='????????????????????' />
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
                                onClick={mes.isYou ? showMessageControls : null}
                            >
                                <div className='message-info'>
                                    <div className={`message-info__image ${isEmptyUserImage(mes.author.image, 'message-info__image_empty')}`}>
                                        <img src={mes.author.image ? mes.author.image : defaultIcon} alt='????????????????' />
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
                                        onClick={() => editMessageHandler(mes.id, mes.textMessage)}
                                    >
                                        <span>??????????????????????????</span>
                                    </button>
                                    <button 
                                        className='message-controls__button button'
                                        onClick={() => deleteMessageHandler(mes.id)}
                                    >
                                        <span>??????????????</span>
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
                            ?????????? ???????? ?????? ??????????...<br />
                            ???? ???? ???????????? <span>????????????</span> ???????????? ????????????!
                        </p>
                    </div>
                )}
                </main>
                <form onSubmit={dialogueSubmitHandler} encType='multipart/form-data' className="dialogue-form">
                    <label htmlFor='files' className='dialogue-form__attach' style={{cursor: 'pointer'}}>
                        <img src={attachIcon} alt='???????????????????? ????????' />
                        <input 
                            type='file' 
                            name='files' 
                            onChange={dialogueFilesHandler} 
                            multiple
                        />
                    </label>
                    {messageAct.value && (
                        <div className='dialogue-form-act'>
                            <p className='dialogue-form-act__text'>{getActText(messageAct.type)}</p>
                            <button 
                                className='dialogue-form-act__button button'
                                onClick={cancelActHandler}
                            >
                                X
                            </button>
                        </div>
                    )}
                    <textarea 
                        ref={formTextareaRef}
                        type='text' 
                        name='text'
                        value={userMessage.text}
                        onChange={dialogueChangeHandler}
                        className='dialogue-form__input input' 
                    />
                    <button type='submit' className='dialogue-form__submit button'>
                        <img src={sendIcon} alt='?????????????????? '/>
                    </button>
                </form>
            </>
        ) : (
            <div className='dialogue-empty'>
                <div className='dialogue-empty__image'>
                    <img src={chatSelect} alt=''/>
                </div>
                <p className='dialogue-empty__description'>
                    ???????????????? ?????????????????????? ???? ????????????<br/>
                    ?????? ?????????????? <span>????????????</span>
                </p>
            </div>
        )}
            
        </article>
    );
}

export default MessagesDialogue;