import React from 'react';

function SwitchButton(props) { 
    return (
        <div className='switch'>
            { props?.children }
            <label 
            className={`switch-button ${(props.value) ? 'switch-button_active' : ''}`}
            onClick={props.handler}  
            htmlFor='switch'>
                <input type='checkbox' name='switch' value={props.value}/>
            </label>
            
        </div>
    );
}

export default SwitchButton;