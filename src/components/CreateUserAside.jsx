import React, { useEffect } from 'react';
import { useSavedUsers } from '../hooks/useSavedUsers';

// icons
import defaultUserIcon from '../assets/images/icons/profile/user.png';
import saveIcon from '../assets/images/icons/save.png';

const UsersList = ({savedUsers}) => {

    const { saveUser, currentUser, setCurrentUser, formValues, setFormValues } = useSavedUsers();

    function checkRole(role) {
        return (role === 'Преподаватель');
    }

    function userSaveHandler() {
        saveUser(formValues);
    }

    function testForm(id) {
        setCurrentUser(id);
        setFormValues(savedUsers[id]);
    }

    const users = savedUsers.map(user => {
        return (
            <li key={user.id} 
            className={`aside-users-list__item ${(currentUser === user.id) ? 'aside-users-list__item_current' : ''}`}
            onClick={() => { testForm(user.id) }}
            >
                <div className='aside-users-list__image'>
                    <img src={defaultUserIcon} alt='Аватарка' />
                </div>
                <h4 className='aside-users-list__login'>{ (user?.login) ? user.login : 'пусто' }</h4>
                {(currentUser === user.id) &&
                    <button onClick={userSaveHandler} className='aside-users-list__button button'>
                        <img src={saveIcon} alt='Сохранить' />
                    </button>
                }
            </li>
        );
    })

    return (
        <ul className='aside-users-list'>{ users }</ul>
    );
}

const CreateUserAside = () => {

    const { savedUsers, incrementId, addUser } = useSavedUsers();

    function addUserHandler() {
        incrementId();
        addUser();
    }

    return (
        <aside className='create-aside'>
            <div className='aside-users'>
                <UsersList savedUsers={savedUsers} />
                <button onClick={addUserHandler} className='aside-users__button button'>
                    <span>Добавить</span>
                </button>
            </div>
        </aside>
        
    );
}

export default CreateUserAside;