import React, { useEffect } from 'react';

import HomeController from '../hoc/HomeController';

// scripts
import updateTitle from '../assets/js/updateTitle';
import HomePageUser from '../components/HomePageUser';

export default function Home(props) {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    // // fetching messages
    // useEffect( async() => {

    // }, []);

    // // fetching timetable
    // useEffect( async() => {

    // }, []);

    return (
        <HomeController>
            <HomePageUser />
        </HomeController>
    );

}