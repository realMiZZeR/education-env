import React from 'react';
import useDiscipline from '../hooks/useDiscipline';
import Search from './Search';

import StudentsList from './StudentsList';

import createTaskIcon from '../assets/images/icons/teacher/create_task.svg';

const CreateDisciplineAside = () => {

    const { saveDisciplineData, formValues } = useDiscipline();

    return (
        <aside className='create-form__aside'>
            <h2 className='create-form__heading'>Список студентов</h2>
            <div className='create-form-section create-form-section_full'>
                <Search className='create-form__search search' />
                <StudentsList formValues={formValues} />
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

export default CreateDisciplineAside;