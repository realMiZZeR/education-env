import React, { useEffect } from 'react';

import CreateDisciplineAside from '../components/CreateDisciplineAside';
import CreateDisciplineContent from '../components/CreateDisciplineContent';

// hoc
import { CreateDisciplineProvider } from '../hoc/CreateDisciplineProvider';

// functions
import updateTitle from "../assets/js/updateTitle";


const CreateDisciplinePage = (props) => {
    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);
    
    return (
        <CreateDisciplineProvider>
            <CreateDisciplineContent />
            <CreateDisciplineAside />
        </CreateDisciplineProvider>
    );
}

export default CreateDisciplinePage;