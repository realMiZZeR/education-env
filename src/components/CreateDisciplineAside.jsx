import React from 'react';
import useDiscipline from '../hooks/useDiscipline';
import Search from './Search';

import StudentsList from './StudentsList';

const CreateDisciplineAside = () => {

    const { saveDisciplineData, formValues } = useDiscipline();

    const saveDisciplineHandler = () => {
        saveDisciplineData();
    }

    return (
        <aside className='aside'>
            <h2 className='aside__heading'>Список студентов</h2>
            <div className='create-aside'>
                <Search className='students-list__search search' />
                <StudentsList formValues={formValues} />
            </div>
            <button type='submit' className='aside__confirm button' onClick={saveDisciplineHandler}>
                <span>Сохранить</span>
            </button>
        </aside>
    );
}

export default CreateDisciplineAside;