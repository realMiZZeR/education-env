import React, { useState, useEffect } from 'react';

import useDiscipline from '../hooks/useDiscipline';
import { useAxios } from '../hooks/useAxios';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const Teachers = () => {

    const { formValues, setFormValues } = useDiscipline();

    const [ data, setData ] = useState([]);

    // get teachers replace
    const [teachers, isError, isLoading] = useAxios({
        url: '/api/admin/getGroup',
        method: 'get'
    });

    useEffect(() => {
        if(teachers && teachers.data) setData(teachers.data);
    }, [teachers]);

    function teacherClickHandler(id) {
        setFormValues({
            ...formValues,
            ['teacher']: id
        });
    }

    return (
        <ul className='selection-list'>

            { isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                {/* no error -> load items */}
                    { !isError ? (
                        data.map(item => (
                            <li 
                            key={item.id} 
                            className={`selection-list__item ${(item.id === formValues.teacher) ? 'selection-list__item_current' : ''}`}
                            onClick={() => teacherClickHandler(item.id)}>
                                <div className='selection-list__image'>
                                    <img src={(!item.img) ? defaultIcon : item.img} alt='Аватар группы' />
                                </div>
                                <h4 className='selection-list__title'>{ item.title }</h4>
                            </li>
                        ))
                        // if error -> show error
                    ) : (
                        <div className=''>stop</div>
                    ) }
                </>
            )}
        </ul>
    );
}

export default Teachers;