import { useState, useEffect } from "react";


export const useWindowResolution = () => {
    const hasWindow = typeof window !== undefined;

    const getWindowResulution = () => {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;

        return {
            width,
            height
        }
    }

    const [ windowResolution, setWindowResolution ] = useState(getWindowResulution());

    useEffect(() => {
      if(hasWindow) {
          function resizeHandler() {
              setWindowResolution(getWindowResulution());
          }

          window.addEventListener('resize', resizeHandler);

          return () => window.removeEventListener('resize', resizeHandler)
      }
    }, [hasWindow])
    
    return windowResolution;
}