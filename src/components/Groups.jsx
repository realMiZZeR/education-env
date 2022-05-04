import React, { useState, useEffect } from 'react';

import { useAxios } from '../hooks/useAxios';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const Groups = ({formValues, setFormValues}) => {

    const [ data, setData ] = useState([]);

    const [groups, isError, isLoading] = useAxios({
        url: '/api/admin/getGroup',
        method: 'get'
    });

    useEffect(() => {
        if(groups && groups.data) setData(groups.data);
    }, [groups]);

    function getGroupValues(id) {
        const result = [];

        if(result.includes(id)) result = result.filter(item => item !== id)
        else result = [...result, id];

        return result;
    }

    function groupClickHandler(id) {
        if(Array.isArray(formValues.group)) {
            setFormValues({
                ...formValues,
                ['group']: getGroupValues(id)
            });
        } else {
            setFormValues({
                ...formValues,
                ['group']: id
            });
        }
    }

    console.log(formValues);

    const doItemActive = (id) => {

        if(Array.isArray(formValues.group)) {
            return (formValues.group.includes(id)) ? 'selection-list__item_current' : '';
        }

        // for group of any type except array
        return (id === formValues.group) ? 'selection-list__item_current' : '';
    }

    return (
        <ul className='selection-list'>

            { isLoading ? (
                <LoadingPage />
            ) : (
                <>
                {/* no error -> load items */}
                    { !isError ? (
                        data.map(item => (
                            <li 
                            key={item.id} 
                            className={`selection-list__item ${doItemActive(item.id)}`}
                            onClick={() => groupClickHandler(item.id)}>
                                <div className='selection-list__image'>
                                    <img src={(!item.img) ? defaultIcon : item.img} alt='Аватар группы' />
                                </div>
                                <h4 className='selection-list__title'>{ item.title }</h4>
                            </li>
                        ))
                        // if error -> show error
                    ) : (
                        <ErrorPage error='CONNECTION_REFUSED' />
                    ) }
                </>
            )}
        </ul>
    );
}

export default Groups;