import React, { useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import { useTimetable } from '../hooks/useTimetable';

import TimetableGroups from './TimetableGroups';
import TimetableTeachers from './TimetableTeachers';
import SwitchButton from './SwitchButton';
import Search from './Search';

const TimetableSort = () => {

    const { user } = useAuth();

    const { isTeacher, setIsTeacher } = useTimetable();

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