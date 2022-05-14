import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import getColorMark from '../assets/js/getColorMark';
import { useAuth } from '../hooks/useAuth';
import { AnswerContext } from '../pages/StudentAnswerPage';

const baseUrl = 'http://server.selestia.ru'

const ReplyTeacher = () => {

    const { user } = useAuth();
    const { data, idTask, idUser } = useContext(AnswerContext);

    const [ currentMark, setCurrentMark ] = useState(data);

    useEffect(() => {
        setCurrentMark(data.mark);
    }, [data.mark]);

    const markClickHandler = (mark) => {
        setCurrentMark(mark);
    }

    const MarkButton = ({mark}) => {
        return (
            <label 
            htmlFor='mark' 
            className={`reply-form__mark ${currentMark === mark ? getColorMark({className: 'mark', mark: mark }) : ''}`}>
                <span>{ mark }</span>
                <input 
                    type='radio' 
                    name='mark' 
                    onClick={() => { markClickHandler(mark) }} 
                />
            </label>
        );
    }

    const replyFormSubmitHandler = (e) => {
        e.preventDefault();

        const setMark = async () => {
            await axios.post(
                'http://server.selestia.ru/api/teacher/putMarkUser',
                {
                    token:  user.token,
                    idTask: idTask,
                    idUser: idUser,
                    mark:   currentMark
                }
            ).then(response => console.log(response)
            ).catch(error => console.warn(error));
        }

        if(currentMark) setMark();
    }

    return (
        <div className='reply'>
            <h3 className='reply__heading'>Оценить</h3>
            <form onSubmit={replyFormSubmitHandler} className='reply-form reply-form_mark'>
                <div className='reply-form__grouping'>
                    <MarkButton mark={5} />
                    <MarkButton mark={4} />
                    <MarkButton mark={3} />
                    <MarkButton mark={2} />
                    <MarkButton mark={1} />
                </div>
                <button type='submit' className='reply-form__button button  '>
                    <span>Подтвердить</span>
                </button>
            </form>
        </div>
    )
}

export default ReplyTeacher;