import { useEffect, useState } from "react"


export const useFootbar = () => {
    const [ currentElem, setCurrentElem ] = useState(null);
    const [ initialRef, setInitialRef ] = useState(null);

    useEffect(() => {
        console.log(initialRef)
        if(initialRef) setCurrentElem(initialRef.current);
    }, [initialRef]);
    
    const footbarHandler = () => {
        console.log(currentElem)
        let classNames = currentElem.className;
        currentElem.className = `${classNames} ${classNames}_show`;
    }

    const footbarClose = () => {

    }

    return { footbarHandler, footbarClose, setInitialRef }

}