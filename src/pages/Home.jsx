import React, { useEffect } from 'react';

import HomePageUser from '../components/HomePageUser';
import HomePageAdmin from '../components/HomePageAdmin';
import HomePageTeacher from '../components/HomePageTeacher';

// functions
import updateTitle from '../assets/js/updateTitle';

import { useAuth } from '../hooks/useAuth';

const Home = (props) => {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const { user } = useAuth();

    // admin
    if(user.role === 2) {
        return (
            <HomePageAdmin />
        );
    }

    // teacher
    if(user.role === 1) {
        return (
            <HomePageTeacher />
        );
    }

    // authorized person
    return (
        <HomePageUser />
    );

}

export default Home;