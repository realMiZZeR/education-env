import React, { useEffect, forwardRef, cloneElement, Children } from 'react';
import { useFootbar } from '../hooks/useFootbar';

const Footbar = forwardRef(({children}, ref) => {

    const { footbarClose } = useFootbar();

    const StyledChildren = () => {
        return (
            Children.map(children, child => 
                cloneElement(child, {classes: `footerbar__component`})
            )
        )
    }
    
    return (
        <div ref={ref} className='footerbar'>
            <div className='footerbar__blackover' />
            <StyledChildren />
        </div>
    );
});

export default Footbar;