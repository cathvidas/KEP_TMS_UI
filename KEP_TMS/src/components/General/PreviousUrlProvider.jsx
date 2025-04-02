import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import proptype from "prop-types"

const PreviousUrlContext = createContext();  

const PreviousUrlProvider = ({ children }) => {  
    const [previousUrl, setPreviousUrl] = useState(''); 
    const location = useLocation();   
    const splitValues = location.pathname?.split("/");
    const pageException = useMemo(() => {  
      return ["TrainingDetail", "OldTrainingDetail"];  
  }, []);
    React.useEffect(() => {  
        // Store the previous URL when location changes  
        if(!pageException.includes(splitValues[2])){
        setPreviousUrl(location.pathname);  }
    }, [location, pageException, splitValues]);  

    return (  
        <PreviousUrlContext.Provider value={previousUrl}>  
            {children}  
        </PreviousUrlContext.Provider>  
    );  
};  
PreviousUrlProvider.propTypes = { children: proptype.node.isRequired };
export const UsePreviousUrl = () => useContext(PreviousUrlContext);  
export default PreviousUrlProvider;
