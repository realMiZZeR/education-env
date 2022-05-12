import { useSavedUsers } from '../hooks/useSavedUsers';
import { useEffect } from 'react';

// icons
import defaultUserIcon from '../assets/images/icons/profile/user.svg';

import GroupWithInfoSelection from './GroupWithInfoSelection';
import InputEffect from './InputEffect';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';

const CreateUserContent = () => {

    const { formValues, setFormValues } = useSavedUsers();

    const formInputChangeHandler = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const formRadioHandler = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: JSON.parse(value),
        });
    }

    useEffect(() => {
        setFormValues(formValues);
    }, [formValues]);

    return (
        <section className='create-form__content'>
            <h2 className='create-form__heading'>Информация о пользователе</h2>
            <div className='create-form-section create-form-section_blank'>
                <div className={isEmptyUserImage(null, 'create-form-section__image')}>
                    <img src={defaultUserIcon} alt='Аватарка' />
                </div>
                <div className='create-form-section_blank-content'>
                    <div className='create-form-section__grouping'>
                        <InputEffect
                            name='login'
                            value={formValues.login}
                            handler={formInputChangeHandler}
                            type='text'
                            placeholder='Логин'
                        />
                        <InputEffect
                            name='password'
                            value={formValues.password}
                            handler={formInputChangeHandler}
                            type='text'
                            placeholder='Пароль'
                        />
                    </div>
                    <InputEffect
                        name='fullname'
                        value={formValues.fullname}
                        handler={formInputChangeHandler}
                        type='text'
                        placeholder='ФИО'
                    />

                    <div className='create-form-section__grouping'>
                        <label htmlFor='isTeacher' 
                        className={`create-form-section__radio ${(!formValues.isTeacher) ? 'create-form-section__radio_active' : ''}`}>
                            <span>Студент</span>
                            <input 
                            name='isTeacher' 
                            type='radio' 
                            value='false' 
                            defaultChecked={!formValues.isTeacher}
                            onClick={formRadioHandler} />
                        </label>
                        <label htmlFor='isTeacher' 
                        className={`create-form-section__radio ${(formValues.isTeacher) ? 'create-form-section__radio_active' : ''}`}>
                            <span>Преподаватель</span>
                            <input 
                            name='isTeacher' 
                            type='radio' 
                            value='true' 
                            defaultChecked={formValues.isTeacher}
                            onClick={formRadioHandler} />
                        </label>
                    </div>
                </div>
            </div>
            
            {!formValues.isTeacher && <GroupWithInfoSelection />}

            <h2 className='create-form__heading'>Дополнительно</h2>
            <div className='create-form-section'>
                <label className='create-form-section__label'>
                    <p>ID пользователя</p>
                    <div className='create-form-section__control'>
                        <input 
                        name='idUser' 
                        className='input'
                        type='text' 
                        value={formValues.idUser} 
                        onChange={formInputChangeHandler} />
                        <span>Заполняется автоматически при создании</span>
                    </div>  
                </label>
                <label className='create-form-section__label'>
                    <p>Электронная почта</p>
                    <div className='create-form-section__control'>
                        <input 
                        name='email' 
                        className='input'
                        type='text' 
                        value={formValues.email} 
                        onChange={formInputChangeHandler} />
                        <span>Для получения писем о восстановлении пароля, опубликации новых заданий и т.п.</span>
                    </div>
                </label>
            </div>
            
        </section>
    );
}

export default CreateUserContent;