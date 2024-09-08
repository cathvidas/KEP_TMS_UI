import proptype from "prop-types";
import UserIcon from "../GeneralComponents/UserIcon";
import { Form } from "react-bootstrap";

export const UserList = ({ leadingElement, userlist, trailingElement, col, onSelect }) => {
  return (
    <>
      {userlist && (
        <div className={`group-list    ${col && "row row-cols-1 row-cols-md-" + col}`}>
          {userlist.map((user, index) => (
            <div key={index} className={`d-flex align-items-center p-1  ${trailingElement && "theme-hover"} gap-2`}>
              {trailingElement === true ? (
                <>
                  <Form.Label className="cursor-pointer d-flex align-items-center flex-grow-1 my-0 " htmlFor={`label-${index}`}>
                    {leadingElement && <UserIcon Name={user.name} />}
                    <span className={trailingElement ? "mx-2" : ""}>
                      {user.name}
                    </span>
                  </Form.Label>    
                  <input
                    className="form-check-input ms-auto mt-0"
                    type="checkbox"
                    id={`label-${index}`}
                    onChange={onSelect}
                  />
                </>
              ) : (<> {leadingElement && <UserIcon Name={user.name} />}
                <span className={trailingElement ? "me-2" : ""}>
                  {user.name}
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
  trailingElement: proptype.bool,
  col: proptype.string,
  onSelect: proptype.func,
};
