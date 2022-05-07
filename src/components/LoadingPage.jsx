import React from 'react';

const LoadingPage = () => {
    return (
        <div className='loading'>
            <div className='loading-cells'>
                <div className='loading-cells__cell'>
                    <span />
                </div>
                <div className='loading-cells__cell'>
                    <span />
                </div>
                <div className='loading-cells__cell'>
                    <span />
                </div>
                <div className='loading-cells__cell'>
                    <span />
                </div>
            </div>
            <p className='loading__text'>Загрузка...</p>
        </div>
    );
}

export default LoadingPage;