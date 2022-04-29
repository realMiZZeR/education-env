import React, { useEffect, useState } from 'react';

const FormSelect = ({handler, labelClassName, options}) => {

    const [ optionTitle, setOptionTitle ] = useState(options[0].title);
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

    useEffect(() => {
        handler(options[0].value);
    }, []);

    const optionHandler = ([title, value]) => {
        handler(value);
        setOptionTitle(title);
    }

    const selectClickHandler = (e) => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className={`select ${isDropdownOpen ? 'select_active' : ''}`} onClick={selectClickHandler}>
            <label className={`${labelClassName}`}>
                <input 
                type='text' 
                className='create-main-info__input input' 
                value={optionTitle}
                placeholder='&nbsp;'
                readOnly />
                <span>Тип дисциплины</span>
            </label>
            <div className={`dropdown ${isDropdownOpen ? 'dropdown_active' : ''}`}>
                <ul className='dropdown-list'>
                    {options.map(option => {
                        return (
                            <li key={option.id} 
                            onClick={() => { optionHandler([option.title, option.value]) } } 
                            className='dropdown-list__item'>
                                { option.title }
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        
    );
}

export default FormSelect;