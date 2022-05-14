import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import getTypeTask from '../assets/js/getTypeTask';
import { useAuth } from '../hooks/useAuth';

import publishedIcon from '../assets/images/icons/tasks/published.png';
import deadlineIcon from '../assets/images/icons/tasks/deadline.png';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';
import getDisciplineImage from '../assets/js/getDisciplineImage';

import TaskAttribute from './TaskAttribute';
import ReplyTeacher from './ReplyTeacher';
import ReplyUser from './ReplyUser';

import { TaskContext } from '../pages/TaskInfoPage';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const TaskAside = ({ task }) => {

    const { user } = useAuth();

    const correctDateFormat = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <aside className='task-aside'>
            <div className='task-attributes'>
                <TaskAttribute 
                    title='Дисциплина'
                    image={getDisciplineImage({type: task.discipline.type})}
                    value={task.discipline.name}  
                />
                <TaskAttribute 
                    title='Тип задания'
                    image={getTypeTask({type: task.taskType.type})}
                    value={task.taskType.name}  
                />
                <TaskAttribute 
                    title='Опубликовано'
                    image={publishedIcon}
                    value={correctDateFormat(task.published)}  
                />
                <TaskAttribute 
                    title='Срок сдачи'
                    image={deadlineIcon}
                    value={correctDateFormat(task.dateTo)}  
                />
                <footer className='task-attributes__footer'>
                    <Link to={`/profile/${task.author.id}`} className='task-attributes-author link'>
                        <div className={`task-attributes-author__image ${isEmptyUserImage(task.author.image, 'task-attributes-author__image')}`}>
                            <img src={(task.author.image) ? task.author.image : defaultIcon} alt='Аватарка' />
                        </div>
                        <div className='task-attributes-author__info'>
                            <h4 className='task-attributes-author__heading'>Создатель:</h4>
                            <p className='task-attributes-author__fullname' title={task.author.fullname}>{ task.author.fullname }</p>
                        </div>
                    </Link>
                </footer>
            </div>
            {user.role === 0 && <ReplyUser />}
            {user.role === 1 && <ReplyTeacher />}
        </aside>
    );
}

export default TaskAside;