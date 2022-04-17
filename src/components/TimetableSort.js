import React, { Suspense, useState } from 'react';

import LoadingPage from './LoadingPage';
import Groups from './Groups';
import Teachers from './Teachers';
import SwitchButton from './SwitchButton';
import Search from './Search';

export default function TimetableSort() {
    const [ isTeacher, setIsTeacher ] = useState(false);

    function teacherHandleChange() {
        setIsTeacher(!isTeacher);
    }

    return (
        <article className='timetable-sort'>
            <SwitchButton handler={teacherHandleChange} value={isTeacher} >
                <p className='switch__title'>
                    Расписание для { isTeacher ? 'преподавателя' : 'студента' }
                </p>
            </SwitchButton>
            <Search className='search' />
            <Suspense fallback={<LoadingPage />}>
                {!isTeacher && <Groups />}
                {isTeacher && <Teachers />}
            </Suspense>
        </article>
    );
}