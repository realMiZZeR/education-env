import React, { useState } from 'react';
import SwitchButton from './SwitchButton';
import EditIcon from '../assets/images/icons/edit.svg';

function UserSettings(props) {

    const [ isVisible, setIsVisible ] = useState(props.visible);
    const [ isNotification, setIsNotification ] = useState(props.notification);

    const { idUser, visible, notification, email, changedPasswordAgo } = props.userSettings

    function notificationHandler() {
        return setIsNotification(!isNotification);
    }

    function SettingsSection(props) {
        const items = props.content.map(item => {
            return (
                <div key={item.id} className='settings-section__item'>
                    <p className='settings-section__name'>{ item?.name }</p>
                    {item?.action === 'edit' &&
                    <div className='settings-section__value'>
                        <span>{ item?.value }</span>
                        <img src={EditIcon} alt='Редактировать' />
                    </div>
                    }
                    {item?.action === 'select' &&
                    <select value={isVisible} onChange={e => { setIsVisible(Boolean(e.target.value)) }}>
                        <option key={'1'} value={false}>преподавателям</option>
                        <option key={'2'} value={true}>всем</option>
                    </select>
                    }
                    {item?.action === 'switch' &&
                    <SwitchButton handler={notificationHandler} value={isNotification}>
                        <span className='switch__title'>Уведомлять на почту</span>
                    </SwitchButton>
                    }
                </div>
                
            );
        });

        return (
            <div className='settings-section'>
                <h3 className='settings-section__title'>{ props?.title }</h3>
                { items }
            </div>
        );
    }

    const profile = [
        {id: 1, name: 'ID', value: idUser, action: 'edit'},
        {id: 2, name: 'Моя страница видна', value: visible, action: 'select'},
        {id: 3, value: notification, action: 'switch'},
    ];

    const mail = [
        {id: 1, name: email, action: 'edit'}
    ];

    const password = [
        {id: 1, name: `Был изменён ${changedPasswordAgo} дня назад`, action: 'edit'}
    ];


    return (
        <article className='user-settings'>
            <h2 className='user-settings__heading'>Настройки</h2>
            <div className='settings'>
                <SettingsSection 
                title='Профиль' 
                content={profile} />
                <SettingsSection 
                title='Электронная почта' 
                content={mail} />
                <SettingsSection 
                title='Пароль' 
                content={password} />
            </div>
        </article>
    );

}

export default UserSettings;