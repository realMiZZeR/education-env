import React from 'react';
import useDiscipline from '../hooks/useDiscipline';
import Search from './Search';

import StudentsList from './StudentsList';

import createDisciplineIcon from '../assets/images/icons/admin/create_discipline.png';

const CreateDisciplineAside = () => {

    const { formValues } = useDiscipline();

    return (
        <aside className='create-form__aside'>
            <h2 className='create-form__heading'>Список студентов</h2>
            <div className='create-form-section create-form-section_full'>
                <Search className='create-form__search search' />
                <StudentsList formValues={formValues} />
            </div>
            <button type='submit' className='create-form-button button'>
                <div className='create-form-button__image'>
                    <img src={createDisciplineIcon} alt='Создать' />
                </div>
                <p className='create-form-button__text'>Создать</p>
            </button>
        </aside>
    );
}

export default CreateDisciplineAside;