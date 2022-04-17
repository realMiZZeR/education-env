import React from 'react';

function LoadingPage() {
    return (
        <div className='loading'>
            <div className='loading-cells'>
                <span />
                <span />
                <span />
                <span />
            </div>
            <p className='loading__text'>Загрузка...</p>
        </div>
    );
}

export default LoadingPage;