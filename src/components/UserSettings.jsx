import React, { useState } from 'react';
import EditIcon from '../assets/images/icons/edit.svg';

const UserSettings = ({ settings }) => {

    const [ isVisible, setIsVisible ] = useState(settings.visible);

    const SettingsSection = (props) => {

        return (
            <div className='settings-section'>
                <h3 className='settings-section__title'>{ props.title }</h3>
                { props?.children }
            </div>
        );
    }


    return (
        <article className='user-settings'>
            <h2 className='user-settings__heading'>Настройки</h2>
            <div className='settings'>
                <SettingsSection title='Профиль'>
                    <div className="settings-section__item">
                        <p className='settings-section__name'>ID</p>
                        <div className='settings-section__value'>
                            <span>{ settings.idUser }</span>
                            <img src={EditIcon} alt='Редактировать' />
                        </div>
                    </div>
                    <div className="settings-section__item">
                        <p className='settings-section__name'>Моя страница видна</p>
                        <select value={isVisible} onChange={e => { setIsVisible(e.target.value) }}>
                            <option key={'teacher'} value={isVisible === 'teacher'}>преподавателям</option>
                            <option key={'all'} value={isVisible === 'all'}>всем</option>
                        </select>
                    </div>
                </SettingsSection>
                <SettingsSection title='Электронная почта'>
                    <div className="settings-section__item">
                        <p className='settings-section__name'>{ settings.email ? settings.email : 'не привязана' }</p>
                        <div className='settings-section__value'>
                            <img src={EditIcon} alt='Редактировать' />
                        </div>
                    </div>
                </SettingsSection>
                <SettingsSection title='Пароль'>
                    <div className="settings-section__item">
                        <p className='settings-section__name'>Был изменён {settings.changedPasswordAgo} дней(-я) назад</p>
                        <div className='settings-section__value'>
                            <img src={EditIcon} alt='Редактировать' />
                        </div>
                    </div>
                </SettingsSection>
            </div>
        </article>
    );

}

export default UserSettings;