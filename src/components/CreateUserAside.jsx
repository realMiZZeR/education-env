import React, { useEffect } from 'react';
import { useSavedUsers } from '../hooks/useSavedUsers';

// icons
import defaultUserIcon from '../assets/images/icons/profile/user.png';
import saveIcon from '../assets/images/icons/save.png';
import deleteIcon from '../assets/images/icons/trashcan.png';

const UsersList = () => {

    const { savedUsers, saveUser, deleteUser, currentUser, setCurrentUser, formValues, setFormValues } = useSavedUsers();

    function userSaveHandler() {
        saveUser(formValues);
    }

    function userDeleteHandler(id) {
        deleteUser(id);        
    }

    function itemClickHandler(id) {
        setCurrentUser(id);
        const [ value ] = savedUsers.filter((user, index) => user.id === id);
        setFormValues(value);
    }
    
    const users = savedUsers.map(user => {
        return (
            <li key={user.id} 
            className={`aside-users-list__item ${(currentUser === user.id) ? 'aside-users-list__item_current' : ''}`}
            onClick={() => { itemClickHandler(user.id) }}
            >
                <div className='aside-users-list__image'>
                    <img src={defaultUserIcon} alt='Аватарка' />
                </div>
                <h4 className='aside-users-list__login'>{ (user?.login) ? user.login : 'Логин' }</h4>
                {(currentUser === user.id) &&
                <div className='aside-users-list__buttons'>
                    <button onClick={userSaveHandler} className='aside-users-list__button button'>
                        <img src={saveIcon} alt='Сохранить' />
                    </button>
                    <button onClick={() => { userDeleteHandler(user.id) } } className='aside-users-list__button button'>
                        <img src={deleteIcon} alt='Удалить' />
                    </button>
                </div>
                }
            </li>
        );
    })

    return (
        <ul className='aside-users-list'>{ users }</ul>
    );
}

const CreateUserAside = () => {

    const { incrementId, addUser, saveUsersData } = useSavedUsers();

    function addUserHandler() {
        incrementId();
        addUser();
    }

    function saveUsersHandler() {
        saveUsersData();
    }

    return (
        <aside className='create-form__aside'>
            <h2 className='create-form__heading'>&nbsp;</h2>
            <div className='create-form-section create-form-section_full'>
                <UsersList />
                <button onClick={addUserHandler} className='create-form-section__add button'>
                    <span>Добавить</span>
                </button>
            </div>
            <button type='submit' className='create-form-button button'>
                <div className='create-form-button__image'>
                    <img src={defaultUserIcon} alt='Создать' />
                </div>
                <p className='create-form-button__text'>Создать</p>
            </button>
        </aside>
    );
}

export default CreateUserAside;