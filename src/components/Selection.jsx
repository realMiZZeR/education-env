import React from 'react';

import Groups from './Groups';
import Teachers from './Teachers';
import Faculty from './Faculty';
import Search from './Search';

const Selection = ({ title, context }) => {

    const { formValues, setFormValues } = context;

    return (
        <div className='selection'>
            <h3 className='selection__title'>{ title }</h3>
            <Search className={`selection__search search`} />
            { (title === 'Преподаватели') ? <Teachers formValues={formValues} setFormValues={setFormValues} /> : '' }
            { (title === 'Группы') ? <Groups formValues={formValues} setFormValues={setFormValues} /> : '' }
            { (title === 'Факультет') ? <Faculty formValues={formValues} setFormValues={setFormValues} /> : '' }
        </div>
    );
} 

export default Selection;