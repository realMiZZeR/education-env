import React, { useState, useEffect, createContext } from 'react';
import ModalNotification from '../components/ModalNotification';

export const ModalMessages = createContext(null);

export const ModalProvider = ({ children }) => {

    const [ notifications, setNotifications ] = useState([]);
    const [ modal, setModal ] = useState(null);

    useEffect(() => {
        if(modal) setNotifications([...notifications, modal]);
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

    const value = {
        modal,
        setModal,
        notifications,
    }

    return (
        <ModalMessages.Provider value={value}>
            { children }

            {/* modal window in a right bottom side  */}
            <div className='modal-wrapper'>
            {notifications.length > 0 && notifications.map((modal, index) => {
                return (
                    <ModalNotification
                        key={index}
                        status={modal.status}
                        type={modal.type}
                     />
                );
            })}
            </div>
        </ModalMessages.Provider>
    )
}