import proptype from "prop-types";
import UserIcon from "../General/UserIcon";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const UserList = ({ leadingElement, property, userlist, trailingElement, col, handleParticipants, action }) => {
  const [checked, setChecked] = useState([]);
  const handleInputChange = (user) => {
    const isChecked = checked.some((obj)=>obj.id === user.id);
    if(isChecked){
      setChecked(checked.filter((obj)=>obj.id!== user.id ));
    }else{
      setChecked([...checked, user]);
    }
  };
  useEffect(()=>{
    if(handleParticipants){
      handleParticipants(checked);}

  }, [checked, handleParticipants])
  return (
    <>
      {userlist && (
        <div className={`group-list    ${col && "row row-cols-1 row-cols-md-" + col}`}>
          {userlist.map((user, index) => (
            <div key={index} className={`d-flex align-items-center p-1  ${trailingElement && "theme-hover"} gap-2`}>
              {trailingElement != null ?(
                <>
                  <Form.Label className="cursor-pointer d-flex align-items-center flex-grow-1 my-0 " htmlFor={`label-${index}`}>
                    {leadingElement && <UserIcon Name={user[property]} />}
                    <span className={trailingElement ? "mx-2" : ""}>
                      {user[property]}
                    </span>
                  </Form.Label>   
                  {trailingElement?.action === true &&
                  <span className="text-danger btn btn-sm" onClick={()=>action(user.id)}><FontAwesomeIcon icon={faX}/></span> } 


                  
{trailingElement?.input === true &&
                  <input
                    className="form-check-input ms-auto mt-0"
                    type="checkbox"
                    id={`label-${index}`}
                    onChange={()=>handleInputChange(user)}
                    checked={
                        checked.filter((obj)=>obj.id === user.id ).length > 0 ? true : false

                    }
                  />}
                </>
              ) : (<> {leadingElement && 
              <UserIcon Name={user[property]} />}
                <span className={trailingElement ? "me-2" : ""}>
                  {user[property]}
                </span>
              </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

UserList.propTypes = {
  leadingElement: proptype.bool,
  userlist: proptype.array,
  trailingElement: proptype.object,
  col: proptype.string,
  handleParticipants: proptype.func,
  property: proptype.string,
  action: proptype.func,
};
