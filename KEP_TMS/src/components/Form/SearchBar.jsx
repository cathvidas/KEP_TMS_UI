import { Dropdown } from "react-bootstrap";
import { GetDepartments } from "../../services/getApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsersGear,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import proptype from 'prop-types'
import Select from "react-select";
import { useEffect, useState } from "react";
const SearchBar = ({handleOnInput, options}) => {
  const [filter, setFilter] = useState({});
  
  useEffect(()=>{
    handleOnInput(filter)
  }, [filter,handleOnInput])


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
              value={filter.name}
              onInput={(e) =>setFilter({name: e.target.value})}
            />
            {options && 
            <div className="position-absolute top-50 end-0 translate-middle-y border border-0 text-muted p-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="default"
                  className="border-0 p-0 theme-color rounded-0 btn btn-default bg-theme"
                >
                  <FontAwesomeIcon icon={faUsersGear} />
                </Dropdown.Toggle>
  
                <Dropdown.Menu align="end"  className="overflow-auto" style={{maxHeight: "300px"}}>
                  {options.map((option, index) => (
                    <span key={index} onClick={()=>setFilter({department: option.name})}>
                    <Dropdown.Item className={option.name == filter ? "active" : ""} >{option.name}</Dropdown.Item></span>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>}
          </div>{
            filter.department && 
            <div className="bg-success flex justify-content-between bg-opacity-50 mt-2 p-1 rounded text-center text-uppercase px-2">{filter.department} <span className="btn btn-sm text-white" onClick={()=>{setFilter({department: ""})}}><FontAwesomeIcon icon={faX}/></span> </div>
   
          }
           </>
  );
};
SearchBar.propTypes ={
  handleOnInput: proptype.func.isRequired,
  options: proptype.array,
}
export default SearchBar;
