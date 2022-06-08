import React, { useEffect, cloneElement, Children, useRef } from 'react';
import { useFootbar } from '../hooks/useFootbar';

const Footbar = ({children}) => {

    const footbarRef = useRef();
    const { footbarClose, setInitialRef } = useFootbar();

    useEffect(() => {
        setInitialRef(footbarRef);

        return () => setInitialRef(null);
    }, []);

    const StyledChildren = () => {
        return (
            Children.map(children, child => 
                cloneElement(child, {classes: `footerbar__component`})
            )
        )
    }
    
    return (
        <div ref={footbarRef} className='footerbar'>
            <div className='footerbar__blackover' />
            <StyledChildren />
        </div>
    );
}

export default Footbar;