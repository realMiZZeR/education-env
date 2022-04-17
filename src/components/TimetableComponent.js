import React from 'react';
import { useLocation } from 'react-router-dom';

// images
import teacherIcon from '../assets/images/icons/teacher.svg';
import cabinetIcon from '../assets/images/icons/cabinet.svg';

const lessonsList = [
    {
        id: 1,
        lessonNumber: 1,
        title: 'МДК 02.01 Технология разработки программного обеспечения',
        teacher: 'Бек Анастасия Евгеньевна',
        'cabinet': '110'
    },
    {
        id: 2,
        lessonNumber: 2,
        title: 'Психология общения',
        teacher: 'Синькова Наталья Евгеньевна',
        'cabinet': '214'
    },
    {
        id: 3,
        lessonNumber: 3,
        title: 'МДК 02.01 Технология разработки программного обеспечения',
        teacher: 'Бек Анастасия Евгеньевна',
        'cabinet': '110'
    },
    [
        {
            id: 4,
            lessonNumber: 4,
            title: 'Иностранный язык в ПД',
            teacher: 'Первякова Карина Алексеевна',
            cabinet: '109'
        },
        {
            id: 5,
            lessonNumber: 4,
            title: 'Иностранный язык в ПД',
            teacher: 'Николаева Ольга Александровна',
            cabinet: '109'
        }
    ],
    {
        id: 6,
        lessonNumber: 5,
        title: '',
        teacher: '',
        cabinet: ''
    },
    {
        id: 7,
        lessonNumber: 6,
        title: '',
        teacher: '',
        cabinet: ''
    },
    {
        id: 8,
        lessonNumber: 7,
        title: '',
        teacher: '',
        cabinet: ''
    },
    {
        id: 9,
        lessonNumber: 8,
        title: '',
        teacher: '',
        cabinet: ''
    }
];

function Lesson(props) {
    const { lessonNumber } = props;
    return (
        <li className='lesson'>
            <h3 className='lesson__number'>{ lessonNumber }</h3>
            { props.children }
        </li>
    );
}

function TimetableLessons({ lessonsList }) {
    function Sublist({ lessonSublist }) {
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

    const lessonsItems = lessonsList.map(item => {
        if(!item.length > 0) {
            return (
                <Lesson key={item.id} lessonNumber={item.lessonNumber}>
                    <div className='lesson-info'>
                        <h4 className='lesson-info__title'>{ item?.title }</h4>
                        <div className='lesson-info__place'>
                            <small className='lesson-info__teacher'>
                                { item?.teacher !== '' && 
                                <div className='lesson-info__image'>
                                    <img src={teacherIcon} alt='Преподаватель' />
                                </div>
                                }
                                { item?.teacher !== '' && <span className='lesson-info__name'>{ item?.teacher }</span> }
                            </small>
                            <small className='lesson-info__cabinet'>
                                { item?.cabinet !== '' &&
                                <div className='lesson-info__image'>
                                    <img src={cabinetIcon} alt='Кабинет' />
                                </div>
                                }
                                {item?.cabinet !== '' && <span className='lesson-info__name'>Кабинет { item?.cabinet }</span>} 
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

export default function TimetableComponent() {
    const location = useLocation();
    let isHome = (location.pathname === '/');

    let timetableDate = '10.04.2022';
    let timetableUpdateDate = '10.04.2022';
    let timetableUpdateTime = '15:43:31';

    return (
        <article className='timetable'>
            {isHome &&
            <header className='timetable__heading'>
                <h2 className='timetable__title'>Расписание на { timetableDate }</h2>
            </header>
            }
            
            <div className='timetable-info'>
                {isHome &&
                <div className='timetable-info__heading'>
                    <h3 className='timetable-info__dayweek'>Понедельник / нечётная</h3>
                </div>
                }
                <TimetableLessons lessonsList={ lessonsList } />
            </div>
            {isHome &&
            <footer className='timetable__footer'>
                <p className='timetable__update'>Обновлено: { timetableUpdateDate } в { timetableUpdateTime }</p>
            </footer>
            }
        </article>
    );
}