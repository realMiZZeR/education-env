import React, { useState, useEffect } from 'react';
import switchItemActive from '../assets/js/switchItemActive';
import { useAxios } from '../hooks/useAxios';

import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const Faculty = ({formValues, setFormValues}) => {

    const [ data, setData ] = useState([]);

    const [faculties, isError, isLoading] = useAxios({
        url: '/api/admin/createGroup/getFacultet',
        method: 'get'
    });

    useEffect(() => {
        if(faculties && faculties.data) setData(faculties.data);
    }, [faculties]);

    function groupClickHandler(id) {
        switchItemActive(
            {
                initialObject: formValues, 
                setHandler: setFormValues,
                modifyProperty: 'faculty', 
                initialValue: id,
            }
        );
    }

    return (
        <div className='selection-list'>
            { isLoading ? (
                <LoadingPage />
            ) : (
                <>
                {/* no error -> load items */}
                    { !isError ? (
                        data.map(item => (
                            <li 
                            key={item.id} 
                            className={`selection-list__item selection-list__item_faculty ${(item.id === formValues.faculty) ? 'selection-list__item_current' : ''}`}
                            onClick={() => groupClickHandler(item.id)}>
                                <h4 className='selection-list__title'>{ item.title }</h4>
                            </li>
                        ))
                        // if error -> show error
                    ) : (
                        <ErrorPage error='CONNECTION_REFUSED' />
                    ) }
                </>
            )}
        </div>
    );
}

export default Faculty;