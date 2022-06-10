import React, { useEffect } from 'react';

import { TasksProvider } from '../hoc/TasksProvider';
import { useTasks } from '../hooks/useTasks';

// functions
import updateTitle from '../assets/js/updateTitle';

import TasksComponent from '../components/TasksComponent';
import FullDisciplinesList from '../components/FullDisciplinesList';

const Tasks = (props) => {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <TasksProvider>
            <div className='tasks-wrapper'>
                <TasksComponent />
                <FullDisciplinesList hook={useTasks} />
            </div>
        </TasksProvider>
    )
}

export default Tasks;