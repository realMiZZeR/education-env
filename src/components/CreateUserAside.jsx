import React from 'react';

// icons
import defaultUserIcon from '../assets/images/icons/profile/user.png';

const CreateUserAside = () => {
    return (
        <aside className='create-aside'>
            <div className='aside-users'>
                <ul className='aside-users-list'>
                    <li className='aside-users-list__item'>
                        <div className='aside-users-list__image'>
                            <img src={defaultUserIcon} alt='Аватарка' />
                        </div>
                        <h4 className='aside-users-list__login'>user_nickname</h4>
                    </li>
                </ul>
                <button className='aside-users__button button'>
                    <span>Добавить</span>
                </button>
            </div>
        </aside>
        
    );
}

export default CreateUserAside;