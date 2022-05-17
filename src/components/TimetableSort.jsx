import React, { useEffect, useState } from 'react';

import TimetableGroups from './TimetableGroups';
import TimetableTeachers from './TimetableTeachers';
import SwitchButton from './SwitchButton';
import Search from './Search';
import { useAuth } from '../hooks/useAuth';

const TimetableSort = () => {

    const { user } = useAuth();

    const [ isTeacher, setIsTeacher ] = useState(false);

    useEffect(() => {
        setIsTeacher(user?.role === 1)
    }, []);

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
            {isTeacher && <TimetableTeachers />}
        </article>
    );
}

export default TimetableSort;