import React, { useEffect } from 'react';
import { useModal } from '../hooks/useModal';

import InputEffect from './InputEffect';

// use for InteractiveModal
const FacultyModal = () => {

    const { interactiveModalValues, setInteractiveModalValues } = useModal();

    useEffect(() => {
        setInteractiveModalValues({
            title: '',
            shortName: '',
            description: ''
        })
    }, []);

    const formInputChangeHandler = (e) => {
        const { name, value } = e.target;
        
        setInteractiveModalValues({
            ...interactiveModalValues,
            [name]: value
        })
    }

    return (
        <>
            {interactiveModalValues && (
                <div className='interactive-modal-section'>
                    <InputEffect
                        name='title'
                        value={interactiveModalValues.title}
                        handler={formInputChangeHandler}
                        type='text'
                        placeholder='Название факультета'
                    />
                    <div className='interactive-modal-section__grouping'>
                        <InputEffect
                            name='shortName'
                            value={interactiveModalValues.shortName}
                            handler={formInputChangeHandler}
                            type='text'
                            placeholder='Краткое обозначение'
                        />
                        <InputEffect
                            name='description'
                            value={interactiveModalValues.description}
                            handler={formInputChangeHandler}
                            type='text'
                            placeholder='Описание'
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default FacultyModal;