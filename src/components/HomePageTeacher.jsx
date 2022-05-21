import React from 'react';

import { Cards, CardsItem } from './Cards';
import Messages from './Messages';
import TimetableComponent from './TimetableComponent';

import { TimetableProvider } from '../hoc/TimetableProvider';

// images
import createTaskIcon from '../assets/images/icons/teacher/create_task.svg';
import repliesIcon from '../assets/images/icons/teacher/replies.svg';
import journalIcon from '../assets/images/icons/teacher/journal.svg';
import disciplinesIcon from '../assets/images/icons/teacher/disciplines.svg';

const HomePageAdmin = () => {
    return (
        <>
            <Cards>
                <CardsItem
                title='Создать новое задание'
                image={createTaskIcon}
                link='/create-task' />
                <CardsItem
                title='Посмотреть ответы'
                image={repliesIcon}
                link='/tasks' />
                <CardsItem
                title='Журнал оценок'
                image={journalIcon}
                link='/journal' />
                <CardsItem
                title='Дисциплины'
                image={disciplinesIcon}
                link='/disciplines' />
            </Cards>
            <div className='content-main__grid_two'>
                <TimetableProvider>
                    <TimetableComponent />
                </TimetableProvider>
                <Messages />
            </div>
                
        </>
    );
}

export default HomePageAdmin;