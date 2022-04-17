import React from 'react';
import searchIcon from '../assets/images/icons/search.svg';

export default function Search(props) {

    // avaiable class names: search, search_sm
    const { className } = props;

    return (
        <div className={ className }>
            <div className='search__image'>
                <img src={searchIcon} alt='Поиск'/>
            </div>
            <input placeholder='Поиск' className='search__input input' />
        </div>
    );

}