import React from 'react';
import { useGroup } from '../hooks/useGroup';

import Search from './Search';
import StudentsListSelect from './StudentsListSelect';

import createTaskIcon from '../assets/images/icons/teacher/create_task.svg';

const CreateGroupAside = () => {

    const { formValues, setFormValues } = useGroup();

    return (
        <aside className='create-form__aside'>
            <h2 className='create-form__heading'>Список студентов</h2>
            <div className='create-form-section create-form-section_full'>
                <Search className='students-list__search search' />
                <StudentsListSelect context={{formValues, setFormValues}} />
            </div>
            <button type='submit' className='create-form-button button'>
                <div className='create-form-button__image'>
                    <img src={createTaskIcon} alt='Создать' />
                </div>
                <p className='create-form-button__text'>Создать</p>
            </button>
        </aside>
    );
}

export default CreateGroupAside;