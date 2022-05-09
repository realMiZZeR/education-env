import React from 'react';
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
        disciplineType: 1,
        deadline: '15.02.2022'
    },
    {
        id: 2,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 1,
        deadline: '15.02.2022'
    },
    {
        id: 3,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 1,
        deadline: '15.02.2022'
    },
    {
        id: 4,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 1,
        deadline: '15.02.2022'
    },
    {
        id: 5,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 1,
        deadline: '15.02.2022'
    },
    {
        id: 6,
        title: 'Интеллект-карта Лекция 1',
        discipline: 'МДК 02.01 Технология разработки программного обеспечения',
        disciplineType: 1,
        deadline: '15.02.2022'
    },
];


function HomePageUser() {

    const TasksSlider = ({ tasksList }) => {

        const slideList = tasksList.map(task => {
            return (
                <li key={task.id} className='home-tasks-list__item'>
                    <div className='home-tasks-list__image'>
                        <img src={getDisciplineImage({type: task.disciplineType})} alt={task.disciplineType} />
                    </div>
                    <div className='home-tasks-list__info'>
                        <p className='home-tasks-list__discipline' title={ task.discipline }>{ task.discipline }</p>
                        <h3 className='home-tasks-list__title' title={ task.title }>{ task.title }</h3>
                        <small className='home-tasks-list__deadline'>Выполнить до: { task.deadline }</small>
                    </div>
                </li>
            );
        });

        // slider-slick settings
        const settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: <NextArrow  />,
            prevArrow: <PrevArrow />
        };

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
                <TasksSlider tasksList={tasksList} />
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