import React, { useEffect, useReducer } from 'react';
import Groups from './Groups';
import Teachers from './Teachers';
import Faculty from './Faculty';
import Search from './Search';

function componentsReducer(state, action) {

    switch(action.type) {
        case 'Преподаватели':
            return {component: <Teachers />}
        case 'Группы':
            return {component: <Groups />}
        case 'Факультет':
            return {component: <Faculty />}
        default:
            throw new Error();
    }
}

const Selection = ({ title, context }) => {

    const { formValues, setFormValues } = context;

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