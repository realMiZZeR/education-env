import axios from 'axios';
import React from 'react';

// images
import createUserIcon from '../assets/images/icons/admin/create_user.svg';
import createDisciplineIcon from '../assets/images/icons/admin/create_discipline.png';
import createGroupIcon from '../assets/images/icons/admin/create_group.svg';
import createFacultyIcon from '../assets/images/icons/admin/create_faculty.png';

import { useModal } from '../hooks/useModal';
import { useAuth } from '../hooks/useAuth';

import { Cards, CardsItem } from './Cards';
import Messages from './Messages';
import ControlSystem from './ControlSystem';
import FacultyModal from './FacultyModal';

const HomePageAdmin = () => {

    const { user } = useAuth();

    const { setModal, interactiveModal, setInteractiveModal } = useModal();

    const facultyInteractiveModal = () => {
        setInteractiveModal({
            title: 'Новый факультет',
            buttonImage: createFacultyIcon,
            component: <FacultyModal />,
            visible: true,
            callback: async (formValues) => {
                await axios.post(
                    'http://server.selestia.ru/api/admin/postCreateFacult',
                    formValues,
                    {headers: { token: user.token } }
                ).then(response => {
                    setModal({status: response.status, type: 'CREATE'});
                }).catch(error => console.dir(error)
                ).finally(() => setInteractiveModal({...interactiveModal, visible: false}));
            }
        });
    }

    return (
        <>
            <Cards>
                <CardsItem
                    title='Создать нового пользователя'
                    image={createUserIcon}
                    link='/create-user' 
                />
                <CardsItem
                    title='Создать новую группу'
                    image={createGroupIcon}
                    link='/create-group' 
                />
                <CardsItem
                    title='Создать новую дисциплину'
                    image={createDisciplineIcon}
                    link='/create-discipline' 
                />
                <CardsItem
                    title='Создать новый факультет'
                    image={createFacultyIcon}
                    link='/' 
                    handler={facultyInteractiveModal}
                />
            </Cards>
            <div className='content-main__grid_two'>
                <ControlSystem />
                <Messages />
            </div>
                
        </>
    );
}

export default HomePageAdmin;