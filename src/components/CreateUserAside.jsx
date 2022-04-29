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
        setFormValues(savedUsers[id]);
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
        <aside className='aside aside_without-head'>
            <div className='create-aside'>
                <div className='aside-users'>
                    <UsersList />
                    <button onClick={addUserHandler} className='aside-users__button button'>
                        <span>Добавить</span>
                    </button>
                </div>
            </div>
            <button type='submit' className='aside__confirm button' onClick={saveUsersHandler}>
                <span>Сохранить всё</span>
            </button>
        </aside>
        
    );
}

export default CreateUserAside;