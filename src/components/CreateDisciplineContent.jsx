import React, { useEffect, useState } from 'react';

import Selection from './Selection';
import FormSelect from './FormSelect';

// icons


// functions
import getDisciplineImage from '../assets/js/getDisciplineImage';

// hooks
import useDiscipline from '../hooks/useDiscipline';

const types = [
    {id: 1, title: 'Технологии', value: 'tech'},
    {id: 2, title: 'Учебный', value: 'study'},
    {id: 3, title: 'Алхимия', value: 'alch'},
]

const CreateDisciplineContent = () => {

    const { formValues, setFormValues } = useDiscipline();

    const [ typeImage, setTypeImage ] = useState(null);

    const formInputChangeHandler = (e) => {
        const { name, value } = e.target;
        
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const formTypeHandler = (value) => {
        setFormValues({
            ...formValues,
            ['type']: value
        });
    }

    useEffect(() => {
        if(formValues.type) {
            setTypeImage(getDisciplineImage(formValues.type));
        }
    }, [formValues.type]);

    return (
        <form className='create'>
            <div className='create-section'>
                <h2 className='create-section__heading'>Информация о дисциплине</h2>
                <div className='create-main create-main_d'>
                    <div className='create-main__image create-main__image_d'>
                        <img src={typeImage} alt='Дисциплина' />
                    </div>
                    <div className='create-main-info'>
                        <div className='create-main-info__grouping'>
                            <label htmlFor='number' className='create-main-info__label'>
                                <input 
                                name='number'
                                value={formValues.number} 
                                onChange={formInputChangeHandler}
                                type='text' 
                                className='create-main-info__input input' 
                                placeholder='&nbsp;' />
                                <span>Номер дисциплины</span>
                            </label>
                            <FormSelect 
                            labelClassName={`create-main-info__label`}
                            handler={formTypeHandler}
                            options={types} />
                        </div>
                        <label htmlFor='title' className='create-main-info__label'>
                            <input 
                            name='title'
                            value={formValues.title} 
                            onChange={formInputChangeHandler}
                            type='text' 
                            className='create-main-info__input input' 
                            placeholder='&nbsp;' />
                            <span>Название дисциплины</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='create-section'>
                <h2 className='create-section__heading'>Настройки доступа</h2>
                <div className='create-section__grouping'>
                    <Selection title='Преподаватели' context={{formValues, setFormValues}} />
                    <Selection title='Группы' context={{formValues, setFormValues}} />
                </div>
            </div>
        </form>
    );
}

export default CreateDisciplineContent;