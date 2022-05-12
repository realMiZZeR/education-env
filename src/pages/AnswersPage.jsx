import React, { useEffect } from 'react';
import updateTitle from '../assets/js/updateTitle';

const AnswersPage = (props) => {

    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

}

export default AnswersPage;