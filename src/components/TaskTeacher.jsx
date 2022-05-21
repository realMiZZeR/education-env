import React, { useContext } from 'react';
import { AnswerContext } from '../pages/StudentAnswerPage';

const baseUrl = 'http://server.selestia.ru'

const TaskTeacher = () => {

    const { data } = useContext(AnswerContext);

    return (
        <div className='task-content'>
            <article className='task'>
                <div className='task-description'> 
                    <h3 className='task-description__heading'>Ответ на задание:</h3>
                    <p className='task-description__text'>{ data.reply.description }</p>
                </div>
                {data.reply.files.length > 0 && <div className='task-files'>
                    <h3 className='task-files__heading'>Прикреплённые файлы:</h3>
                    <ul className='task-files__list'>
                        { data.reply.file.map(file => {
                            return (
                                <li key={file?.id} className='task-files__item'>
                                    <a href={`${baseUrl}/${file?.file}`} className='task-files__link link' download>
                                        <img src={`${baseUrl}/${file?.file}`} alt='Файл' />
                                    </a>
                                    <p className='task-files__name'>{ file?.name }</p>
                                </li>
                            )
                        }) }
                    </ul>
                </div>
                }
            </article>
            
        </div>
    );
}

export default TaskTeacher;