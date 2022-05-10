import React from 'react';
import getColorMark from '../assets/js/getColorMark';

const baseUrl = 'http://server.selestia.ru'

const TaskTeacher = ({ task }) => {

    return (
        <div className='task-content'>
            <article className='task'>
                <div className='task-description'>
                    <h3 className='task-description__heading'>{ task.title }</h3>
                    <p className='task-description__text'>{ task.description }</p>
                </div>
                <div className='task-files'>
                    <h3 className='task-files__heading'>Прикреплённые файлы:</h3>
                    {task.files.length > 0 && <ul className='task-files__list'>
                        { task.files.map(file => {
                            return (
                                <li key={file.id} className='task-files__item'>
                                    <a href={`${baseUrl}/${file.file}`} className='task-files__link link' download>
                                        <img src={`${baseUrl}/${file.file}`} alt='Файл' />
                                    </a>
                                    <p className='task-files__name'>{ file.name }</p>
                                </li>
                            )
                        }) }
                    </ul>
                    }
                </div>
                <span 
                    className={`tasks-section__mark ${getColorMark({className: 'mark', mark: task.mark})}`}
                >
                    { (task.mark) ? task.mark : '?' }
                </span>
            </article>
            
        </div>
    );
}

export default TaskTeacher;