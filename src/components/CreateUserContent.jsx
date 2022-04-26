import { useSavedUsers } from '../hooks/useSavedUsers';
import { useEffect } from 'react';

// icons
import defaultUserIcon from '../assets/images/icons/profile/user.svg';
import GroupSelection from './GroupSelection';

const CreateUserContent = () => {

    const { formValues, setFormValues } = useSavedUsers() || {}

    function formInputChangeHandler(e) {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    function formRadioHandler(e) {
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
        <form className='create'>
           <div className='create-section'>
               <h2 className='create-section__heading'>Информация о {(formValues.isTeacher) ? 'преподавателе' : 'студенте'}</h2>
               <div className='create-user'>
                   <div className='create-user__image'>
                       <img src={defaultUserIcon} alt='Аватарка' />
                   </div>
                   <div className='create-user-info'>
                        <div className='create-user-info__grouping'>
                            <label htmlFor='login' className='create-user-info__label'>
                                <input 
                                name='login'
                                value={formValues.login} 
                                onChange={formInputChangeHandler}
                                type='text' 
                                className='create-user-info__input input' 
                                placeholder='&nbsp;' />
                                <span>Логин</span>
                            </label>
                            <label htmlFor='password' className='create-user-info__label'>
                                <input 
                                name='password'
                                value={formValues.password} 
                                onChange={formInputChangeHandler}
                                type='text' 
                                className='create-user-info__input input' 
                                placeholder='&nbsp;' />
                                <span>Пароль</span>
                            </label>
                        </div>
                        <label htmlFor='fullname' className='create-user-info__label'>
                            <input 
                            name='fullname'
                            value={formValues.fullname} 
                            onChange={formInputChangeHandler}
                            type='text' 
                            className='create-user-info__input input' 
                            placeholder='&nbsp;' />
                            <span>ФИО</span>
                        </label>
                   </div>
                   <div className='create-user__roles'>
                        <label htmlFor='isTeacher' className='create-user__label'>
                            <div className={`create-user__button ${(!formValues.isTeacher) ? 'create-user__button_active' : ''} button`}>
                                <span>Студент</span>
                            </div> 
                            <input 
                            name='isTeacher' 
                            type='radio' 
                            value='false' 
                            defaultChecked={!formValues.isTeacher}
                            onClick={formRadioHandler} />
                        </label>
                        <label htmlFor='isTeacher' className='create-user__label'>
                            <div className={`create-user__button ${(formValues.isTeacher) ? 'create-user__button_active' : ''} button`}>
                                <span>Преподаватель</span>
                            </div> 
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

           <GroupSelection />

           <div className='create-section'>
               <h2 className='create-section__heading'>Дополнительно</h2>
               <div className='extra'>
                   <div className='extra__grouping'>
                       <label htmlFor='userId' className='extra__label'>ID Пользователя</label>
                       <div className='extra__field'>
                            <input 
                            type='text' 
                            name='idUser'
                            value={formValues.idUser} 
                            onChange={formInputChangeHandler}
                            className='extra__input input' />
                            <span>Заполняется автоматически при создании</span>
                       </div>
                   </div>
                   <div className='extra__grouping'>
                       <label htmlFor='userId' className='extra__label'>Электронная почта</label>
                       <div className='extra__field'>
                            <input 
                            type='text'
                            name='email' 
                            value={formValues.email} 
                            onChange={formInputChangeHandler}
                            className='extra__input input' />
                            <span>Для получения писем о&nbsp;восстановлении пароля, опубликации новых заданий и&nbsp;т.п.</span>
                       </div>
                   </div>
               </div>
           </div>
        </form>
    );
}

export default CreateUserContent;