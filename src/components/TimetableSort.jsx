import React, { useState } from 'react';

import TimetableGroups from './TimetableGroups';
import Teachers from './Teachers';
import SwitchButton from './SwitchButton';
import Search from './Search';

const TimetableSort = () => {

    const [ isTeacher, setIsTeacher ] = useState(false);

    const teacherChangeHandler = () => {
        setIsTeacher(!isTeacher);
    }

    return (
        <article className='timetable-sort'>
            <SwitchButton handler={teacherChangeHandler} value={isTeacher} >
                <p className='switch__title'>
                    Расписание для { isTeacher ? 'преподавателя' : 'студента' }
                </p>
            </SwitchButton>
            <Search className='search' />
            {!isTeacher && <TimetableGroups />}
            {isTeacher && <Teachers />}
        </article>
    );
}

export default TimetableSort;