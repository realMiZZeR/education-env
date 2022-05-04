import axios from 'axios';
import React, { useState, useEffect } from 'react';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const StudentsListSelect = ({ formValues }) => {

    const [ students, setStudents ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://server.selestia.ru/api/admin/`
            );
            
            setStudents(result.data);
        }

        if(formValues.group) {
            fetchData();
        }
    }, []);

    const itemClickHandler = () => {

    }

    return (
        <ul className='students-list'>
        {students.map(item => {
            return (
                <li 
                key={item.id} 
                className='students-list__item'
                onClick={() => {itemClickHandler(item.id)} }>
                    <div className={`students-list__image ${!item.image ? 'students-list__image_empty' : ''} `}>
                        <img src={!item.image ? defaultIcon : item.image} alt='Аватарка' />
                    </div>
                    <p className='students-list__fullname'>{ item.fio }</p>
                    <span className='students-list__checkbox checkbox' />
                </li>
            );
        })}
    </ul>
    )
}

export default StudentsListSelect;