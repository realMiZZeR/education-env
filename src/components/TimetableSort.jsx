import React, { forwardRef, useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import { useTimetable } from '../hooks/useTimetable';

import TimetableGroups from './TimetableGroups';
import TimetableTeachers from './TimetableTeachers';
import SwitchButton from './SwitchButton';
import Search from './Search';

const TimetableSort = forwardRef((props, ref) => {

    const { user } = useAuth();

    const { isTeacher, setIsTeacher } = useTimetable();

    useEffect(() => {
        setIsTeacher(user?.role === 1)
    }, []);

    const teacherChangeHandler = () => {
        setIsTeacher(!isTeacher);
    }

    return (
        <article ref={ref} className={`timetable-sort ${props?.classes ? props?.classes : ''}`}>
            <SwitchButton handler={teacherChangeHandler} value={isTeacher} >
                <p className='switch__title'>
                    Расписание для { isTeacher ? 'преподавателя' : 'студента' }
                </p>
            </SwitchButton>
            <Search className='timetable-sort__search search' />
            {!isTeacher && <TimetableGroups />}
            {isTeacher && <TimetableTeachers />}
        </article>
    );
})

export default TimetableSort;