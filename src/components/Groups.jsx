import React, { useState, useEffect } from 'react';

import useDiscipline from '../hooks/useDiscipline';
import { useAxios } from '../hooks/useAxios';

import defaultGroupIcon from '../assets/images/icons/users.svg';

const Groups = () => {

    const { formValues, setFormValues } = useDiscipline();

    const [ data, setData ] = useState([]);

    const [groups, isError, isLoading] = useAxios({
        url: '/api/admin/getGroup',
        method: 'get'
    });

    useEffect(() => {
        if(groups && groups.data) setData(groups.data);
    }, [groups]);

    function groupClickHandler(id) {
        setFormValues({
            ...formValues,
            ['group']: id
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
                            className={`selection-list__item ${(item.id === formValues.group) ? 'selection-list__item_current' : ''}`}
                            onClick={() => groupClickHandler(item.id)}>
                                <div className='selection-list__image'>
                                    <img src={(!item.img) ? defaultGroupIcon : item.img} alt='Аватар группы' />
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

export default Groups;