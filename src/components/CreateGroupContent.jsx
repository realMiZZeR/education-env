import React from 'react';

import Selection from './Selection';

import { useGroup } from '../hooks/useGroup';

import defaultGroupIcon from '../assets/images/icons/default_group.svg';

const CreateGroupContent = () => {

    const { formValues, setFormValues } = useGroup();

    const formInputChangeHandler = (e) => {
        const { name, value } = e.target;
        
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    return (
        <form className='create'>
            <div className='create-section'>
                <h2 className='create-section__heading'>Информация о группе</h2>
                <div className='create-main create-main_g'>
                    <div className='create-main__image'>
                        <img src={defaultGroupIcon} alt='Аватарка группы' />
                    </div>
                    <div className='create-main-info'>
                        <label htmlFor='title' className='create-main-info__label'>
                            <input 
                            name='title'
                            value={formValues.title} 
                            onChange={formInputChangeHandler}
                            type='text' 
                            className='create-main-info__input input' 
                            placeholder='&nbsp;' />
                            <span>Название группы</span>
                        </label>
                        <div className='create-main-info__grouping'>
                            <label htmlFor='entrance' className='create-main-info__label'>
                                <input 
                                name='entrance'
                                value={formValues.number} 
                                onChange={formInputChangeHandler}
                                type='date' 
                                className='create-main-info__input input' 
                                placeholder='&nbsp;' />
                                <span>Дата поступления</span>
                            </label>
                            <label htmlFor='expiration' className='create-main-info__label'>
                                <input 
                                name='expiration'
                                value={formValues.number} 
                                onChange={formInputChangeHandler}
                                type='date' 
                                className='create-main-info__input input' 
                                placeholder='&nbsp;' />
                                <span>Дата окончания</span>
                            </label>
                        </div>
                    </div>
                    <div className='create-section'>
                        <div className='selections'>
                            <Selection title='Преподаватели' context={{formValues, setFormValues}} />
                            <Selection title='Факультет' context={{formValues, setFormValues}}  />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateGroupContent;