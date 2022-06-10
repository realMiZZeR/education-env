import React, { useEffect } from 'react';

import StudentJournal from '../components/StudentJournal';
import TeacherJournal from '../components/TeacherJournal';

// functions
import updateTitle from '../assets/js/updateTitle';
import { useAuth } from '../hooks/useAuth';

const Journal = (props) => {

    const { user } = useAuth();

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <article className='journal'>
            {user.role === 0 && <StudentJournal />}
            {user.role === 1 && <TeacherJournal />}
        </article>
    )
}

export default Journal;