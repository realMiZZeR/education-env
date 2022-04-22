import React, { useState, useEffect } from 'react';

// functions
import updateTitle from '../assets/js/updateTitle';
import CreateUserAside from '../components/CreateUserAside';
import CreateUserContent from '../components/CreateUserContent';
import { AdminCreateLayout } from '../layouts/AdminCreateLayout';

function CreateUser(props) {
    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <AdminCreateLayout>
            <CreateUserContent />
            <CreateUserAside />
        </AdminCreateLayout>
    );
}

export default CreateUser;