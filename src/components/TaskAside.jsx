import React, { useState } from 'react';
import getDisciplineImage from '../assets/js/getDisciplineImage';

import getTypeTask from '../assets/js/getTypeTask';

import publishedIcon from '../assets/images/icons/tasks/deadline.png';
import deadlineIcon from '../assets/images/icons/tasks/deadline.png';
import { Link } from 'react-router-dom';

import isEmptyUserImage from '../assets/js/isEmptyUserImage';

import attachIcon from '../assets/images/icons/attach_file.svg';
import sendIcon from '../assets/images/icons/send.svg';

const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const TaskAside = ({ task }) => {

    const TaskAttribute = ({ title, image, value }) => {
        return (
            <div className='task-attributes__item'>
                <h4 className='task-attributes__heading'>{ title }:</h4>
                <div className='task-attributes__value'>
                    <div className='task-attributes__image'>
                        <img src={image} />
                    </div>
                    <p className='task-attributes__text' title={value}>{ value }</p>
                </div>
            </div>
        );
    }

    const replyFields = {
        description: '',
        files: [],
    }

    const [ replyValues, setReplyValues ] = useState(replyFields);

    const replyFormChangeHandler = (e) => {
        // const { name, value } = e.target;

        // setReplyValues({
        //     ...replyValues,
        //     [name]: value
        // });
    }

    const replyFormSubmitHandler = (e) => {
        e.preventDefault();
    }

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
            <div className='reply'>
                <div className='reply-description'>
                    <h4 className='reply-description__heading'>Ваш ответ:</h4>
                    <p className='reply-description__text'>
                        { (task.reply.description) ? task.reply.description : 'Нет ответа' }
                    </p>
                </div>
                {task.reply.files.length > 0 && <div className='reply-files'>
                    <h4 className='reply-files__heading'>Прикреплённые файлы</h4>
                    <ul className='reply-files__list'>
                    { task.reply?.files.map(file => {
                        return (
                            <li key={file.id} className='reply-files__item'>
                                <a href={file.file} className='reply-files__link link' download>
                                    <img src='' alt='Файл' />
                                </a>
                                <div className='reply-files__name'>{ file.name }</div>
                            </li>
                        )
                    }) }
                    </ul>
                </div>
                }
                <form onSubmit={replyFormSubmitHandler} className='reply-form'>
                    <label htmlFor='reply' className='reply-form__label'>
                        <input 
                            type='text' 
                            onChange={replyFormChangeHandler}
                            className='reply-form__input input' 
                            placeholder='Напишите здесь ответ'
                        />
                        <div className='reply-form__attach' style={{cursor: 'pointer'}}>
                            <img src={attachIcon} alt='Прикрепить файл' />
                            <input 
                                type='file' 
                                name='files' 
                                onChange={replyFormChangeHandler} 
                            />
                        </div>
                    </label>
                    <button type='submit' className='reply-form__submit button'>
                        <img src={sendIcon} alt='Отправить '/>
                    </button>
                </form>
            </div>
        </aside>
    );
}

export default TaskAside;