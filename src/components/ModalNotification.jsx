import React, { useEffect, useState } from 'react';

// const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png'

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
                {id: 1, status: 422, title: 'Не удалось создать', message: 'Один или несколько полей введены неверно.'},
                {id: 2, status: 200, title: 'Создано', message: 'Процесс создания прошёл успешно.'},
                {id: 3, status: 403, title: 'Не удалось создать', message: 'Одно или более полей не введено.'},
                {id: 4, status: 502, title: 'Не удалось создать', message: 'Произошла какая-то ошибка...'},
                {id: 4, status: 504, title: 'Не удалось создать', message: 'Время отправления запроса истекло.'},
            ]);
            break;
        case 'REFRESH':
            handler([
                {id: 1, status: 422, title: 'Обновление', message: 'Не удалось обновить.'},
                {id: 2, status: 200, title: 'Обновление', message: 'Успешно обновлено.'}
            ]);
            break;
        default:
            return;
    }
}

function modalStyle(type) {
    switch(type) {
        case 403:
            return 'modal_error';
        case 422:
            return 'modal_error';
        case 500:
            return 'modal_error';
        case 502:
            return 'modal_error';
        case 504:
            return 'modal_error';
        case 200:
            return 'modal_success';
        default:
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
                    <div key={index} className={`modal ${modalStyle(item.status)}`}>
                        <h3 className='modal__heading'>{ item.title }</h3>
                        <p className='modal__message'>{ item.message }</p>
                    </div>
                );
            }
            return '';
        })}
        </>
    );
}

export default ModalNotification;