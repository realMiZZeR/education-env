import React, { useEffect, useReducer } from 'react';
import Groups from './Groups';
import Teachers from './Teachers';
import Search from './Search';

import useDiscipline from '../hooks/useDiscipline';

function componentsReducer(state, action) {

    switch(action.type) {
        case 'Преподаватели':
            return {component: <Teachers />}
        case 'Группы':
            return {component: <Groups />}
        default:
            throw new Error();
    }
}

const Selection = ({ title }) => {

    const { formValues, setFormValues } = useDiscipline();

    const initialState = {
        component: '',
        context: {formValues, setFormValues}
    };

    const [state, dispatch] = useReducer(componentsReducer, initialState);

    useEffect(() => {
        dispatch({type: title});
    }, []);

    return (
        <div className='selection'>
            <h3 className='selection__title'>{ title }</h3>
            <Search className={`selection__search search`} />
            { state.component }
        </div>
    );
} 

export default Selection;