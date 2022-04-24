import { useSavedUsers } from '../hooks/useSavedUsers';
import { useEffect, useRef, useState } from 'react';
import Search from './Search';

// icons
import defaultUserIcon from '../assets/images/icons/profile/user.svg';
import defaultGroupIcon from '../assets/images/icons/default_group.png';
import emptyGroupIcon from '../assets/images/icons/empty_group.svg';

const GroupsList = () => {

    const list = [
        {id: 1, img: null, title: 'ПР-18'},
        {id: 2, img: null, title: 'ПР-19'},
        {id: 3, img: null, title: 'ПР-19'},
        {id: 4, img: null, title: 'ПР-19'},
        {id: 5, img: null, title: 'ПР-19'},
        {id: 6, img: null, title: 'ПР-19'},
        {id: 7, img: null, title: 'ПР-19'},
        {id: 8, img: null, title: 'ПР-19'},
        {id: 9, img: null, title: 'ПР-19'},
        {id: 10, img: null, title: 'ПР-19'},
        {id: 11, img: null, title: 'ПР-19'},
        {id: 12, img: null, title: 'ПР-19'},
    ];

    const items = list.map(item => {
        return (
            <li 
            key={item.id} 
            className='groups-selection-list__item'>
                <div className='groups-selection-list__image'>
                    <img src={defaultGroupIcon} alt='Аватар группы' />
                </div>
                <h4 className='groups-selection-list__title'>{ item.title }</h4>
            </li>
        );
    });


    return (
        <ul className='groups-selection-list'>{ items }</ul>
    );
}

const CreateUserContent = () => {

    const groupSelectionBlock = useRef(null);

    const [ isTeacher, setIsTeacher ] = useState(false);

    const { formValues, setFormValues } = useSavedUsers() || {}

    function groupHighlightHandler() {
        const elem = groupSelectionBlock.current;
        const classNames = elem.className;
        elem.className = `${classNames} ${elem.className}_highlight`;

        setTimeout(() => {
            elem.className = classNames;
        }, 3000);
    } 

    function formInputChangeHandler(e) {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    useEffect(() => {
        setFormValues(formValues);
    }, [formValues]);

    return (
        <form className='create'>
           <div className='create-section'>
               <h2 className='create-section__heading'>Информация о {(isTeacher) ? 'преподавателе' : 'студенте'}</h2>
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
                        <input 
                        name='role'
                        type='button' 
                        className={`create-user__button ${(!isTeacher) ? 'create-user__button_active' : ''} button`} 
                        value='Студент'
                        onClick={ () => {setIsTeacher(false)} } />
                        <input 
                        name='role'
                        type='button' 
                        className={`create-user__button ${(isTeacher) ? 'create-user__button_active' : ''} button`} 
                        value='Преподаватель'
                        onClick={ () => {setIsTeacher(true)} } />
                    </div>
               </div>
           </div>
           {!isTeacher && <div className='create-section'>
               <h2 className='create-section__heading'>
                   <span>Группа</span>
                   <span>Выбрано: ПР-18</span>
                </h2>
                <div className='groups_a'>
                    <div ref={groupSelectionBlock} className='groups-selection'>
                        <Search className={`groups-selection__search search`} />
                        <GroupsList />
                    </div>
                    <div className={`groups-info groups-info_empty`}>
                        <div className='groups-info__image'>
                            <img src={emptyGroupIcon} alt='Пустой' />
                        </div>
                        <p className='groups-info__descr'>
                            Выберите <span onClick={groupHighlightHandler}>группу</span>, чтобы увидеть её данные
                        </p>
                    </div>
                </div>
           </div>}
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