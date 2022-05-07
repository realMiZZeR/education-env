import React from 'react';

import { useTask } from '../../hooks/useTask';
import FileUpload from '../FileUpload';

const CreateTaskContent = () => {

    const { formValues, setFormValues } = useTask();

    const formInputChangeHandler = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    return (
        <section className='create-form__content'>
            <h2 className='create-form__heading'>Создание нового задания</h2>
            <div className='create-form-section create-form-section_full'>
                <label htmlFor='title' className='input-effect'>
                    <input 
                    name='title'
                    value={formValues.title} 
                    onChange={formInputChangeHandler}
                    type='text' 
                    className='input-effect__input input' 
                    placeholder='&nbsp;' />
                    <span>Название</span>
                </label>
                <textarea 
                name='description'
                value={formValues.description} 
                onChange={formInputChangeHandler}
                className='create-form-section__textarea textarea' 
                placeholder='Описание' />
                <FileUpload context={{formValues, setFormValues}} />
            </div>
        </section>
    );
}

export default CreateTaskContent;