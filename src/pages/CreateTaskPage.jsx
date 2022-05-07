import React, { useEffect } from 'react';

import CreateTaskContent from '../components/tasks/CreateTaskContent';
import CreateTaskAside from '../components/tasks/CreateTaskAside';

import { CreateTaskProvider } from '../hoc/CreateTaskProvider';

// functions
import updateTitle from '../assets/js/updateTitle';

const CreateTaskPage = (props) => {
    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <CreateTaskProvider>
            <CreateTaskContent />
            <CreateTaskAside />
        </CreateTaskProvider>
    )
}

export default CreateTaskPage;