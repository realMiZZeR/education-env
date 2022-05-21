import React, { useEffect } from 'react';
import { useModal } from '../hooks/useModal';

// set for children classes of the component
// a prefix interactive-modal
const InteractiveModal = ({ title = '', buttonImage, callback, visible, children  }) => {

    const { interactiveModal, setInteractiveModal, interactiveModalValues } = useModal();

    const formSubmitHandler = (e) => {
        e.preventDefault();

        callback(interactiveModalValues);
    }

    const blackoverClickHandler = () => {
        setInteractiveModal({
            ...interactiveModal,
            visible: false
        });
    }

    return (
        <div className={`interactive-modal ${visible ? 'interactive-modal_active' : ''}`}>
            <div className='interactive-modal__blackover' onClick={blackoverClickHandler} />
            <div className='interactive-modal__content'>
                <h2 className='interactive-modal__title'>{ title }</h2>
                <form onSubmit={formSubmitHandler} className='interactive-modal__form'>
                    { children }
                    <button type='submit' className='interactive-modal__submit button'>
                        <img src={buttonImage} alt='Подтвердить' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default InteractiveModal;