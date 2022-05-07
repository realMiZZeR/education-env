import React from 'react';

import Selection from './Selection';
import InputEffect from './InputEffect';

import { useGroup } from '../hooks/useGroup';

import defaultGroupIcon from '../assets/images/icons/default_group.svg';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';

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
        <section className='create-form__content'>
            <h2 className='create-form__heading'>Информация о группе</h2>
            <div className='create-form-section create-form-section_blank'>
                <div className={isEmptyUserImage(null, 'create-form-section__image')}>
                    <img src={defaultGroupIcon} alt='Аватарка' />
                </div>
                <div className='create-form-section_blank-content'>
                    <InputEffect
                        name='title'
                        value={formValues.title}
                        handler={formInputChangeHandler}
                        type='text'
                        placeholder='Название группы'
                    />
                    <div className='create-form-section__grouping'>
                        <InputEffect
                            name='entrance'
                            value={formValues.entrance}
                            handler={formInputChangeHandler}
                            type='date'
                            placeholder='Дата поступления'
                        />
                        <InputEffect
                            name='expiration'
                            value={formValues.expiration}
                            handler={formInputChangeHandler}
                            type='date'
                            placeholder='Дата окончания'
                        />
                    </div>
                </div>
            </div>
            <h2 className='create-form__heading'>Содержимое группы</h2>
            <div className='create-form-section'>
                <div className='create-form-section__grouping'>
                    <Selection title='Преподаватели' context={{formValues, setFormValues}} />
                    <Selection title='Факультет' context={{formValues, setFormValues}}  />
                </div>
            </div>
            
        </section>
    )


    //                 <div className='create-section'>
    //                     <div className='selections'>
    //                         <Selection title='Преподаватели' context={{formValues, setFormValues}} />
    //                         <Selection title='Факультет' context={{formValues, setFormValues}}  />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
}

export default CreateGroupContent;