import { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { ClearSessions, SessionGetToken } from '../../services/sessions';
import { confirmAction } from '../../services/sweetalert';

const SESSION_TIMEOUT_DURATION = 30 * 60000; // 30 minutes  

const SessionTimeout = () => {  
    const [isLoggedOut, setLoggedOut] = useState(false);  
    const navigate = useNavigate();  
    useEffect(() => {  
        let timeoutId;  

        const events = [
            "mousedown",
            "mousemove",
            "wheel",
            "keydown",
            "touchstart",
            "scroll"
          ];
        const handleActivity = () => {  
            clearTimeout(timeoutId);  
            if (isLoggedOut) {  
                setLoggedOut(false);  
            }  
            timeoutId = setTimeout(logout, SESSION_TIMEOUT_DURATION);  
        };  

        const logout = () => {
          if (SessionGetToken()) {
            setLoggedOut(true);
            ClearSessions(); // Clear the session data
            confirmAction({
              title: "Session Timeout",
              text: "Please login again.",
              hideCancelButton: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
              onConfirm: () => {
                navigate("/KEP_TMS/");
              },
            });
          }
        };

        // Events to track user activity  
        events.forEach((event) =>
            document.addEventListener(event, handleActivity)
          );
        
        handleActivity(); // Initialize timer  

        return () => {  
            clearTimeout(timeoutId);   
            events.forEach((event) =>
                window.removeEventListener(event, handleActivity)
              ); 
        };  
    }, [isLoggedOut, navigate]);  

    return (  
        <div>  
            {isLoggedOut && <p>Your session has timed out. Please log in again.</p>}  
        </div>  
    );  
};  

export default SessionTimeout;  