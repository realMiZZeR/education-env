import React, { useEffect, useState } from 'react';

import Selection from './Selection';
import FormSelect from './FormSelect';

// icons


// functions
import getDisciplineImage from '../assets/js/getDisciplineImage';

// hooks
import useDiscipline from '../hooks/useDiscipline';
import InputEffect from './InputEffect';
import { useAxios } from '../hooks/useAxios';

const CreateDisciplineContent = () => {

    const { formValues, setFormValues } = useDiscipline();

    const [ types, setTypes ] = useState([]);

    const [ typesAxios, isError, isLoading ] = useAxios({
        url: '/api/admin/getTypeDiscipline',
        method: 'get'
    });

    useEffect(() => {
        if(typesAxios && typesAxios.data) setTypes(typesAxios.data);
    }, [typesAxios]);

    useEffect(() => {
        console.log(typesAxios)
    }, [types]);

    const [ typeImage, setTypeImage ] = useState(null);

    const formInputChangeHandler = (e) => {
        const { name, value } = e.target;
        
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const formTypeHandler = (id) => {
        setFormValues({
            ...formValues,
            ['type']: id
        });
    }

    useEffect(() => {
        if(formValues.type) {
            setTypeImage(getDisciplineImage({type: formValues.type}));
        }
    }, [formValues.type]);

    return (
        <section className='create-form__content'>
            <h2 className='create-form__heading'>Информация о дисциплине</h2>
            <div className='create-form-section create-form-section_blank'>
                <div className='create-form-section__image_type'>
                    <img src={typeImage} alt='' />
                </div>
                <div className='create-form-section_blank-content'>
                    <div className='create-form-section__grouping'>
                        <InputEffect
                            name='number'
                            value={formValues.number}
                            handler={formInputChangeHandler}
                            type='text'
                            placeholder='Номер дисциплины'
                        />
                        <FormSelect 
                            handler={formTypeHandler}
                            options={types} 
                            title='Тип дисциплины'
                        />
                    </div>
                    <InputEffect
                        name='title'
                        value={formValues.title}
                        handler={formInputChangeHandler}
                        type='text'
                        placeholder='Название дисциплины'
                    />
                </div>
            </div>
            <h2 className='create-form__heading'>Настройки доступа</h2>
            <div className='create-form-section create-form-section_full'>
                <div className='create-form-section__grouping'>
                    <Selection title='Преподаватели' context={{formValues, setFormValues}} />
                    <Selection title='Группы' context={{formValues, setFormValues}} />
                </div>
            </div>
        </section>
    );
}

export default CreateDisciplineContent;