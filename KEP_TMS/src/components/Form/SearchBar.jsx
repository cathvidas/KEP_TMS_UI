import { Dropdown } from "react-bootstrap";
import { GetDepartments } from "../../services/getApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import proptype from 'prop-types'
const SearchBar = ({onInput}) => {
  return (
    <>
      <div className="form-group position-relative">
            <span
              className="position-absolute top-50 start-0 translate-middle-y border border-0 text-muted px-3"
              id="basic-addon1"
            >
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control rounded-pill pe-5"
              style={{paddingLeft:"40px"}}
              placeholder="search employee"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onInput={onInput}
            />
            <div className="position-absolute top-50 end-0 translate-middle-y border border-0 text-muted p-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="default"
                  className="border-0 p-0 theme-color rounded-0 btn btn-default bg-theme"
                >
                  <FontAwesomeIcon icon={faUsersGear} />
                </Dropdown.Toggle>
  
                <Dropdown.Menu align="end">
                  {" "}
                  {GetDepartments().map((department, index) => (
                    <Dropdown.Item key={index}>{department.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
    </>
  );
};
SearchBar.propTypes ={
  onInput: proptype.func.isRequired
}
export default SearchBar;
