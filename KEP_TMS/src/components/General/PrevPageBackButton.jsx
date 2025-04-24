import { useNavigate } from "react-router-dom";
import { UsePreviousUrl } from "./PreviousUrlProvider";
import { Button } from "primereact/button";
import { APP_DOMAIN } from "../../api/constants";

const PrevPageBackButton = (prop) => {   
    const previousUrl = UsePreviousUrl();  
    const navigate = useNavigate();
    const handleBackButtonClick = () => {  
        navigate(previousUrl ? previousUrl : `${APP_DOMAIN}/Dashboard`)
    }; 

    return (  
        <Button text={prop?.text} icon={prop?.icon ?? "pi pi-arrow-left"} onClick={handleBackButtonClick} className={`${prop?.className}`} label={prop?.label ?? "Back"}/>  
    );  
}; 
export default PrevPageBackButton;