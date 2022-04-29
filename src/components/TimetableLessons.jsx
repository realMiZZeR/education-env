import React from 'react';

// images
import teacherIcon from '../assets/images/icons/teacher.svg';
import cabinetIcon from '../assets/images/icons/cabinet.svg';

function Lesson(props) {
    const { lessonNumber } = props;
    return (
        <li className='lesson'>
            <h3 className='lesson__number'>{ lessonNumber }</h3>
            { props.children }
        </li>
    );
}

const Sublist = ({ lessonSublist }) => {
    const sublistItems = lessonSublist.map(item => {
        return (
            <li className='lesson-sublist__item' key={item.id}>
                <div className='lesson-info'>
                    <h4 className='lesson-info__title'>{ item?.title }</h4>
                    <div className='lesson-info__place'>
                        <small className='lesson-info__teacher'>
                            {item?.teacher !== '' && 
                            <div className='lesson-info__image'>
                                <img src={teacherIcon} alt='Преподаватель' />
                            </div>
                            }
                            <span className='lesson-info__name' title={ item?.teacher }>{ item.teacher }</span>
                        </small>
                        <small className='lesson-info__cabinet'>
                            <div className='lesson-info__image'>
                                <img src={cabinetIcon} alt='Кабинет' />
                            </div>
                            <span className='lesson-info__name'>Кабинет { item?.cabinet }</span>
                        </small>
                    </div>
                </div>
            </li>
        );
    });

    return (
        <ul className='lesson-sublist'>{ sublistItems }</ul>
    );
}

function TimetableLessons({ lessons }) {
    
    // item =   {
    //          "teacher": "",
    //          "auditorium": "",
    //          "lessonName": ""
    //          }
    const lessonsItems = lessons.map(item => {
        if(!item.length > 0) {
            return (
                <Lesson key={item.id} lessonNumber={item.lessonNumber}>
                    <div className='lesson-info'>
                        <h4 className='lesson-info__title'>{ item.lessonName }</h4>
                        <div className='lesson-info__place'>
                            <small className='lesson-info__teacher'>
                                { item.teacher !== '' && 
                                <div className='lesson-info__image'>
                                    <img src={teacherIcon} alt='Преподаватель' />
                                </div>
                                }
                                { item.teacher !== '' && <span className='lesson-info__name'>{ item.teacher }</span> }
                            </small>
                            <small className='lesson-info__cabinet'>
                                { item.auditorium !== '' &&
                                <div className='lesson-info__image'>
                                    <img src={cabinetIcon} alt='Кабинет' />
                                </div>
                                }
                                {item.auditorium !== '' && <span className='lesson-info__name'>Кабинет { item.auditorium }</span>} 
                            </small>
                        </div>
                    </div>
                </Lesson>
            );
        }
        return (
            <Lesson key={item[0].id} lessonNumber={item[0].lessonNumber}>
                <Sublist lessonSublist={ item } />   
            </Lesson>
        );
    });
    
    return (
        <ul className='lessons-list'>{ lessonsItems }</ul>
    );
}

export default TimetableLessons;