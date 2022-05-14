import React from 'react';

const TaskAttribute = ({ title, image, value }) => {
    return (
        <div className='task-attributes__item'>
            <h4 className='task-attributes__heading'>{ title }:</h4>
            <div className='task-attributes__value'>
                <div className='task-attributes__image'>
                    <img src={image} />
                </div>
                <p className='task-attributes__text' title={value}>{ value }</p>
            </div>
        </div>
    );
}

export default TaskAttribute;