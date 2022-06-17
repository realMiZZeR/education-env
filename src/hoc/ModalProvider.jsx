import React, { useState, useEffect, createContext } from 'react';

import { useAuth } from '../hooks/useAuth';

import InteractiveModal from '../components/InteractiveModal';
import ModalNotification from '../components/ModalNotification';
import MessageNotification from '../components/MessageNotification';

export const ModalMessages = createContext(null);

export const ModalProvider = ({ children }) => {

    const websocket = useAuth();

    const [ notifications, setNotifications ] = useState([]);
    const [ modal, setModal ] = useState(null);

    useEffect(() => {
        if(modal) setNotifications([...notifications, modal]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal]);

    // clear every 5 seconds modals if they are exist
    useEffect(() => {
        if(notifications.length > 0) {
            var modals = setTimeout(() => {
                setNotifications(notifications.slice(1));
            }, 5000);
        }

        return () => {
            clearInterval(modals);
        }
    }, [notifications]);

    // show message modal from websocket
    useEffect(() => {
        if(websocket.messages.isYou) return;

        setNotifications([...notifications, {
            type: 'MESSAGE',
            userImage: websocket.messages.image,
            title: websocket.messages.title,
            messasge: websocket.messages.message
        }]);
    }, [websocket.messages]);
    // ------------------------

    // interactive modal
    const [ interactiveModal, setInteractiveModal ] = useState({
        title: '',
        buttonImage: null,
        component: null,
        callback: null,
        visible: false
    });

    const [ interactiveModalValues, setInteractiveModalValues ] = useState(null);
    // ------------------------

    const value = {
        modal,
        setModal,
        notifications,
        interactiveModal,
        setInteractiveModal,
        interactiveModalValues,
        setInteractiveModalValues
    }

    return (
        <ModalMessages.Provider value={value}>
            { children }

            {/* modal window in a right bottom side  */}
            <div className='modal-wrapper'>
            {notifications.length > 0 && notifications.map((modal, index) => {
                if(modal.type === 'MESSAGE') {
                    return (
                        <MessageNotification
                            key={index}
                            userImage={modal.userImage}
                            title={modal.title}
                            message={modal.message}
                        />
                    )
                }
                return (
                    <ModalNotification
                        key={index}
                        status={modal.status}
                        type={modal.type}
                     />
                );
            })}
            </div>
            {interactiveModal.visible && 
            <InteractiveModal 
                title={interactiveModal.title} 
                buttonImage={interactiveModal.buttonImage}
                callback={interactiveModal.callback}
                visible={interactiveModal.visible}
            >
                { interactiveModal.component }
            </InteractiveModal>
            }
        </ModalMessages.Provider>
    )
}