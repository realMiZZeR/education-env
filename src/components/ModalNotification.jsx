import React, { useEffect, useState } from 'react';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png'

function getModalType({type, handler}) {
    switch(type) {
        case 'AUTH':
            handler([
                {id: 1, status: 422, title: 'Ошибка входа', message: 'Введены неверные логин или пароль.'},
                {id: 2, status: 500, title: 'Ошибка входа', message: 'Подключение прервано.'},
            ]);
            break;
        case 'CREATE':
            handler([
                {id: 1, status: 422, title: 'Не удалось создать', message: 'Один или несколько полей введены неверно.'}
            ]);
            break;
    }
}

function modalStyle(type) {
    switch(type) {
        case 422:
            return 'modal_error';
    }
}

const ModalNotification = ({ status, type }) => {

    const [ types, setTypes ] = useState(null);

    useEffect(() => {
        getModalType({type: type, handler: setTypes})
    }, [type]);

    return (
        <>
        {types && types.map((item, index) => {
            if(Object.values(item).indexOf(status) > -1) {
                return (
                    <div className={`modal ${modalStyle(item.status)}`}>
                        <h3 className='modal__heading'>{ item.title }</h3>
                        <p className='modal__message'>{ item.message }</p>
                    </div>
                );
            }
        })}
        </>
    );
}

export default ModalNotification;