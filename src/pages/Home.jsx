import React, { useEffect } from 'react';

import HomePageUser from '../components/HomePageUser';
import HomeController from '../hoc/HomeController';

// functions
import updateTitle from '../assets/js/updateTitle';

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