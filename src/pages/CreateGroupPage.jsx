import React, { useEffect } from 'react';

import CreateGroupContent from '../components/CreateGroupContent';
import CreateGroupAside from '../components/CreateGroupAside';

// hoc
import { CreateGroupProvider } from '../hoc/CreateGroupProvider';

// functions
import updateTitle from '../assets/js/updateTitle';

const CreateGroupPage = (props) => {

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <CreateGroupProvider>
            <CreateGroupContent />
            <CreateGroupAside />
        </CreateGroupProvider>
    );
}

export default CreateGroupPage