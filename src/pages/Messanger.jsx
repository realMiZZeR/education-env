import React, { useEffect } from 'react';

// functions
import updateTitle from '../assets/js/updateTitle';

const Messanger = (props) => {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    return (
        <>
            
        </>
    )
}

export default Messanger;