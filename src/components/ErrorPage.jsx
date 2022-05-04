import React, { useEffect, useReducer } from 'react';

import connectionRefusedIcon from '../assets/images/icons/connection_refused.svg';

function errorReducer(state, action) {
    switch(action.type) {
        case 'CONNECTION_REFUSED':
            return {icon: connectionRefusedIcon, message: 'Подключение прервано. Попробуйте перезагрузить страницу.'}
        default:
            throw new Error();
    }
}

const initialState = {
    icon: '',
    message: ''
}

const ErrorPage = ({error}) => {

    const [ state, dispatch ] = useReducer(errorReducer, initialState)

    useEffect(() => {
        dispatch({type: error});
    }, [error]);

    return (
        <div className='error'>
            <div className='error__image'>
                <img src={state.icon} alt='Ошибка' />
            </div>
            <p className='error__message'>
            { state.message }
            </p>
        </div>  
    );
}

export default ErrorPage;