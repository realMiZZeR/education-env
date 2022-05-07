import React, { useEffect, useState } from 'react';

const FormSelect = ({title, handler, options}) => {

    const [ optionTitle, setOptionTitle ] = useState(options[0]?.id);
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

    useEffect(() => {
        handler(options[0]?.id);
        setOptionTitle(options[0]?.title);
    }, [options]);

    const optionHandler = ([id, title]) => {
        handler(id);
        setOptionTitle(title);
    }

    const selectClickHandler = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className={`select ${isDropdownOpen ? 'select_active' : ''}`} onClick={selectClickHandler}>
            <label className='input-effect'>
                <input 
                type='text' 
                className='input-effect__input input' 
                value={optionTitle}
                placeholder='&nbsp;'
                onChange={() => {}}
                readOnly />
                <span>{ title }</span>
            </label>
            <div className={`dropdown ${isDropdownOpen ? 'dropdown_active' : ''}`}>
                <ul className='dropdown-list'>
                    {options.map(option => {
                        return (
                            <li key={option.id} 
                            onClick={() => { optionHandler([option?.id, option?.title]) } } 
                            className='dropdown-list__item'>
                                { option?.title }
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        
    );
}

export default FormSelect;