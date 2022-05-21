import React, { useEffect } from 'react';

// functions
import updateTitle from '../assets/js/updateTitle';
import CreateFacultyAside from '../components/CreateFacultyAside';
import CreateFacultyContent from '../components/CreateFacultyContent';
import { CreateFacultyProvider } from '../hoc/CreateFacultyProvider';

const CreateFacultyPage = (props) => {

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <CreateFacultyProvider>
            <CreateFacultyContent />
            <CreateFacultyAside />
        </CreateFacultyProvider>
    );
}

export default CreateFacultyPage