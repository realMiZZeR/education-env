import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useMessages } from '../hooks/useMessages';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';
import LoadingPage from '../components/LoadingPage';
import Search from './Search';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const Messages = () => {
    const location = useLocation();
    let isHome = (location.pathname === '/home');

    const [ dialogueMessages, setDialogueMessages ] = useState([]);
    const [ dialogueIsLoading, setDialogueIsLoading ] = useState(null);

    const { user } = useAuth();
    const { websocket } = useAuth();
    const { currentDialogue, setCurrentDialogue } = useMessages() || {};

    useEffect(() => {
        const fetchDialogueList = async () => {
            setDialogueIsLoading(true);
            await axios.get(
                `http://server.selestia.ru/api/user/getAllDialog`,
                {
                    headers: {token: user.token}
                }
            ).then(response => setDialogueMessages(response.data)
            ).catch(error => console.dir(error)
            ).finally(() => setDialogueIsLoading(false));
        }
        
        if(true) fetchDialogueList();
    }, [websocket.messages, websocket.hasConnect, user.token]);

    const selectDialogue = (id) => {
        if(isHome) {
            return;
        }

        setCurrentDialogue(id); 
    }

    // dialogueMessages is array which contains object like
    // idDialog             : int
    // image                : string | null
    // isPersonal           : int
    // isYou                : int
    // messageAuthorImage   : string | null
    // messageAuthorName     : string | null
    // nameDialog           : string | null
    // textMessage          : string | null
    // dateMessage          : date

    return (
        <article className='messages'>
            {isHome &&
            <div className='messages__heading'>
                <h2 className='messages__title'>Сообщения</h2>
            </div>  
            }
            {dialogueIsLoading ? (
                <LoadingPage />
            ) : (
                <div className='messages-info'>
                    <Search className='search' />
                    <ul className="messages-list">
                        {dialogueMessages.map(dialogue => {
                            return (
                                <li 
                                    className={`messages-list__item ${(dialogue?.notification > 0 || currentDialogue === dialogue.idDialog) ? 'messages-list__item_active' : ''}`} 
                                    key={dialogue.idDialog}
                                    onClick={() => selectDialogue(dialogue.idDialog)}
                                >
                                    <div className={`messages-list__image ${isEmptyUserImage(dialogue.image, 'messages-list__image')}`}>
                                        <img src={dialogue.image ? dialogue.image : defaultIcon} alt='Аватарка' />
                                        {dialogue?.isOnline &&
                                        <span className='online' />
                                        }
                                    </div>
                                    <div className='messages-list__user'>
                                        <h3 className='messages-list__name'>{ dialogue.nameDialog }</h3>
                                        <p className='messages-list__lastmsg'>{ dialogue.textMessage }</p>
                                    </div>
                                    {dialogue?.notification > 0 &&
                                        <div className='messages-list__notification'>
                                            <span>{ dialogue?.notification }</span>
                                        </div>
                                    }
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </article>
    );
}

export default Messages;