import React, { useEffect } from 'react';

import { TasksProvider } from '../hoc/TasksProvider';

// functions
import updateTitle from '../assets/js/updateTitle';

import TasksList from '../components/TasksList';
import FullDisciplinesList from '../components/FullDisciplinesList';

const Tasks = (props) => {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <TasksProvider>
            <div className='tasks-wrapper'>
                <TasksList />
                <FullDisciplinesList />
            </div>
        </TasksProvider>
    )
}

export default Tasks;