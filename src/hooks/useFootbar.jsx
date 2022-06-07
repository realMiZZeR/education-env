import { useEffect, useState } from "react"


export const useFootbar = (ref) => {
    const [ currentElem, setCurrentElem ] = useState(null);

    useEffect(() => {
        if(ref) setCurrentElem(ref.current);

        return () => setCurrentElem(null);
    }, [ref.current]);
    
    const footbarHandler = () => {
        currentElem.className = `${currentElem.className} ${currentElem.className}_show`;
    }

    const footbarClose = () => {

    }

    return { footbarHandler, footbarClose }

}