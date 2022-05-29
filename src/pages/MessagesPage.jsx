import React, { useEffect } from 'react';

import { MessagesProvider } from '../hoc/MessagesProvider';

// functions
import updateTitle from '../assets/js/updateTitle';

import MessagesDialogue from '../components/MessagesDialogue';
import Messages from '../components/Messages';

const MessagesPage = (props) => {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <MessagesProvider>
            <div className="messages-wrapper">
                <MessagesDialogue />
                <Messages />
            </div>
        </MessagesProvider>
    )
}

export default MessagesPage;