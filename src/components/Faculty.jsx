import React, { useState, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const Faculty = ({formValues, setFormValues}) => {

    const [ data, setData ] = useState([]);

    const [faculties, isError, isLoading] = useAxios({
        url: '/api/admin/getGroup',
        method: 'get'
    });

    useEffect(() => {
        if(faculties && faculties.data) setData(faculties.data);
    }, [faculties]);

    function groupClickHandler(id) {
        setFormValues({
            ...formValues,
            ['faculty']: id
        });
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
                            className={`selection-list__item ${(item.id === formValues.group) ? 'selection-list__item_current' : ''}`}
                            onClick={() => groupClickHandler(item.id)}>
                                <h4 className='selection-list__title'>{ item.title }</h4>
                            </li>
                        ))
                        // if error -> show error
                    ) : (
                        <ErrorPage message='no' />
                    ) }
                </>
            )}
        </div>
    );
}

export default Faculty;