import React, { useState, useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import TasksUser from './TasksUser';
import TasksTeacher from './TasksTeacher';

const TasksComponent = () => {

    const { user } = useAuth();
    
    return (
        <article className='tasks'>
            {user.role === 0 ? <TasksUser user={user} /> : ''}
            {user.role === 1 ? <TasksTeacher user={user} /> : ''}
        </article>
    );
}

export default TasksComponent;