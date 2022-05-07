import React, { useEffect, useState } from 'react';
import axios from 'axios';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const StudentsList = ({ formValues }) => {

    const [ students, setStudents ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://server.selestia.ru/api/admin/studentInGroup?idGroup=${JSON.stringify(formValues.group)}`
            );
            
            setStudents(result.data);
        }

        if(formValues.group && formValues.group.length > 0) {
            fetchData();
        }
        return () => {
            if(formValues.group) setStudents([])
        }
    }, [formValues.group]);

    return (
        <ul className='students-list'>
            {students.map(item => {
                return (
                    <li key={item.id} className='students-list__item'>
                        <div className={`students-list__image ${!item.image ? 'students-list__image_empty' : ''} `}>
                            <img src={!item.image ? defaultIcon : item.image} alt='Аватарка' />
                        </div>
                        <p className='students-list__fullname'>{ item.fio }</p>
                    </li>
                );
            })}
        </ul>
    );
}

export default StudentsList;