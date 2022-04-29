import React, { useEffect } from 'react';
import useDiscipline from '../hooks/useDiscipline';

const CreateDisciplineAside = () => {

    const { saveDisciplineData } = useDiscipline();

    const saveDisciplineHandler = () => {
        saveDisciplineData();
    }

    return (
        <aside className='aside'>
            <h2 className='aside__heading'>Список студентов</h2>
            <div className='create-aside'>
                {/* <StudentsList /> */}
            </div>
            <button type='submit' className='aside__confirm button' onClick={saveDisciplineHandler}>
                <span>Сохранить</span>
            </button>
        </aside>
    );
}

export default CreateDisciplineAside;