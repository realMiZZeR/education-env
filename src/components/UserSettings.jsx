import React, { useState } from 'react';
import EditIcon from '../assets/images/icons/edit.svg';

const UserSettings = ({ settings }) => {

    const [ isVisible, setIsVisible ] = useState(settings.visible);

    const SettingsSection = (props) => {

        return (
            <div className='settings-section'>
                <h3 className='settings-section__title'>{ props.title }</h3>
                <div className='settings-section__item'>
                    { props?.children }
                </div>
            </div>
        );
    }


    return (
        <article className='user-settings'>
            <h2 className='user-settings__heading'>Настройки</h2>
            <div className='settings'>
                <SettingsSection title='Профиль'>
                    <p className='settings-section__name'>ID</p>
                    <div className='settings-section__value'>
                        <span>{ settings.idUser }</span>
                        <img src={EditIcon} alt='Редактировать' />
                    </div>
                    <select value={isVisible} onChange={e => { setIsVisible(e.target.value) }}>
                        <option key={'teacher'} value={isVisible === 'teacher'}>преподавателям</option>
                        <option key={'all'} value={isVisible === 'all'}>всем</option>
                    </select>
                </SettingsSection>
                <SettingsSection title='Электронная почта'>
                    <p className='settings-section__name'>Электронная почта</p>
                    <div className='settings-section__value'>
                        <span>{ settings.email }</span>
                        <img src={EditIcon} alt='Редактировать' />
                    </div>
                </SettingsSection>
                <SettingsSection title='Пароль'>
                    <p className='settings-section__name'>Был изменён {settings.changedPasswordAgo} дней(-я) назад</p>
                    <div className='settings-section__value'>
                        <img src={EditIcon} alt='Редактировать' />
                    </div>
                </SettingsSection>
            </div>
        </article>
    );

}

export default UserSettings;