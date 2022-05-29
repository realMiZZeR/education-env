import React from 'react';

const CircleProgressBar = ({ current, max, progressClass }) => {

    function calculate() {
        return (current / max * 100) * 180 / 100 + 1; 
    }

    return (
        <div className={`progress progress_circle ${progressClass}`}>
            <div className='progress__inner' />
            <div className='progress__value'>{current}/{max}</div>
            <div className='progress-circle'>
                <div className='progress-circle__bar left'>
                    <div 
                        className='progress-circle__completed' 
                        style={{transform: `rotate(${calculate()}deg)`}}
                    />
                </div>
                <div className='progress-circle__bar right'>
                    <div 
                        className='progress-circle__completed' 
                        style={{transform: `rotate()`}}
                    />
                </div>
            </div>
        </div>
    )
}

export default CircleProgressBar;