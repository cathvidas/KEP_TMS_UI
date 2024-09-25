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
  const [filter, setFilter] = useState({value: "", department: ""});
  
  useEffect(()=>{
    handleOnInput(filter.value)
  }, [filter.value,handleOnInput])
  
  useEffect(()=>{
    setFilter({...filter, value: filter.department})
  }, [filter.department])

console.log(filter)
  return (
    <>
      <div className="form-group position-relative z-1">
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
              value={filter.value}
              onInput={(e) =>setFilter({...filter, value: e.target.value})}
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
                    <span key={index} onClick={()=>setFilter({...filter, department: option.name})}>
                    <Dropdown.Item className={option.name == filter.department ? "active" : ""} >{option.name}</Dropdown.Item></span>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>}
          </div>{
            filter.department && 
            <div className="bg-success flex justify-content-between bg-opacity-50 mt-2 p-1 rounded text-center text-uppercase px-2">{filter.department} <span className="btn btn-sm text-white" onClick={()=>{setFilter({...filter, department: ""})}}><FontAwesomeIcon icon={faX}/></span> </div>
   
          }
           </>
  );
};
SearchBar.propTypes ={
  handleOnInput: proptype.func.isRequired,
  options: proptype.array,
}
export default SearchBar;
