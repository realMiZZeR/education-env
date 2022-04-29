import React, { useState, useEffect } from 'react';

// functions
import updateTitle from '../assets/js/updateTitle';
import CreateUserAside from '../components/CreateUserAside';
import CreateUserContent from '../components/CreateUserContent';
import { CreateUserProvider } from '../hoc/CreateUserProvider';

function CreateUser(props) {
    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <CreateUserProvider>
            <CreateUserContent />
            <CreateUserAside />
        </CreateUserProvider>
    );
}

export default CreateUser;