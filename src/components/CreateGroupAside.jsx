import React from 'react';
import { useGroup } from '../hooks/useGroup';

import Search from './Search';
import StudentsListSelect from './StudentsListSelect';

const CreateGroupAside = () => {

    const { formValues, saveGroupData } = useGroup();


    const saveGroupHandler = () => {
        saveGroupData();
    }

    return (
        <aside className='aside'>
            <h2 className='aside__heading'>Список студентов</h2>
            <div className='create-aside'>
                <Search className='students-list__search search' />
                <StudentsListSelect formValues={formValues} />
            </div>
            <button type='submit' className='aside__confirm button' onClick={saveGroupHandler}>
                <span>Сохранить</span>
            </button>
        </aside>
    );
}

export default CreateGroupAside;