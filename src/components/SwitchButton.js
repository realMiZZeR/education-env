import React from 'react';

function SwitchButton(props) { 
    return (
        <div className='switch'>
            { props?.children }
            <button 
            className={`switch-button ${(props.value ? 'switch-button_active' : '')}`}
            onClick={props.handler}>
                <span className='switch-button__toggle' />
            </button>
        </div>
    );
}

export default SwitchButton;