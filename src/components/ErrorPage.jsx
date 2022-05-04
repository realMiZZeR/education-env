import React from 'react';

const ErrorPage = ({message}) => {
    return (
        <div className='error'>
            { message }
        </div>  
    );
}

export default ErrorPage;