import React from 'react';
import { Cards, CardsItem } from './Cards';

// images
import createUserIcon from '../assets/images/icons/admin/create_user.svg';
import createDisciplineIcon from '../assets/images/icons/admin/create_discipline.svg';
import createGroupIcon from '../assets/images/icons/admin/create_group.svg';
import TimetableComponent from './TimetableComponent';
import Messages from './Messages';
import { TimetableProvider } from '../hoc/TimetableProvider';

function HomePageAdmin() {
    return (
        <>
            <Cards>
                <CardsItem
                title='Создать нового пользователя'
                image={createUserIcon}
                link='/create-user' />
                <CardsItem
                title='Создать новую дисциплину'
                image={createDisciplineIcon}
                link='/create-discipline' />
                <CardsItem
                title='Создать новую группу'
                image={createGroupIcon}
                link='/create-group' />
                <CardsItem
                title='Создать нового пользователя'
                image={createUserIcon}
                link='/create-user' />
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