import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import DevidedByTwo from '../layouts/DevidedByTwo';
import TimetableComponent from './TimetableComponent';
import Messages from './Messages';

// images
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';

import getDisciplineImage from '../assets/js/getDisciplineImage';
import { TimetableProvider } from '../hoc/TimetableProvider';

const tasksList = [
    {
        id: 1,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 'general',
        deadline: '15.02.2022'
    },
    {
        id: 2,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 'general',
        deadline: '15.02.2022'
    },
    {
        id: 3,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 'general',
        deadline: '15.02.2022'
    },
    {
        id: 4,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 'general',
        deadline: '15.02.2022'
    },
    {
        id: 5,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 'general',
        deadline: '15.02.2022'
    },
    {
        id: 6,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 'general',
        deadline: '15.02.2022'
    },
];


function HomePageUser() {
    const TaskSlide = ({ discipline, title, deadline, disciplineType }) => {
        return (
            <li className='home-tasks-list__item'>
                <div className='home-tasks-list__image'>
                    { getDisciplineImage(disciplineType) }
                </div>
                <div className='home-tasks-list__info'>
                    <p className='home-tasks-list__discipline' title={ discipline }>{ discipline }</p>
                    <h3 className='home-tasks-list__title' title={ title }>{ title }</h3>
                    <small className='home-tasks-list__deadline'>Выполнить до: { deadline }</small>
                </div>
            </li>
        );
    }

    const TestSlide = ({ tasksList }) => {
        // slider-slick settings
        const settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: <NextArrow  />,
            prevArrow: <PrevArrow />
          };

        const slideList = tasksList.map(task => {
            return (
                <TaskSlide
                    key={task.id}
                    discipline={task.discipline}
                    title={task.title}
                    deadline={task.deadline}
                    disciplineType={task.disciplineType}
                />
            );
        });

        return (
            <Slider {...settings}>
                { slideList }
            </Slider>
        );
    }


    return (
        <>
            <article className='home-tasks'>
                <div className='home-tasks__heading'>
                    <h2 className='home-tasks__title'>Задания</h2>
                    <Link to="/tasks" className='home-tasks__link'>
                        Все задания
                    </Link>
                </div>
                <TestSlide tasksList={tasksList} />
            </article>
            <DevidedByTwo>
                <TimetableProvider>
                    <TimetableComponent />
                </TimetableProvider>
                <Messages />
            </DevidedByTwo>
        </>
    );
}

export default HomePageUser;