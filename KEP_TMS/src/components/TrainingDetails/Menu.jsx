import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype, { func } from "prop-types";
import React from "react";

export const RequestMenu = ({menuList, action, current}) => {
  
  console.log(menuList)
  return (
    <>
      <div
        className="border-end pe-3 position-sticky top-0"
        style={{ height: "100vh" }}
      >
        <div className="d-flex gap-1 px-3 mb-1 border-bottom pb-2 align-items-center">
          <FontAwesomeIcon icon={faBars} />
          <i className="icon ion-star bs-icon-md bs-icon"></i>
          <h6 className="m-0">MENU</h6>
        </div>
        <ul className="list-group">
          {menuList ? menuList.map((item, i)=>(
            React.cloneElement(item, {key: i})
          )): (<>
          
          <MenuItem title={"Overview"} state={current == 0 && true} onCLick={action} param={0} />
          <MenuItem title={"Modules"} state={current == 1 && true} onCLick={action} param={1}/>
          <MenuItem title={"Exam"} state={current == 2&& true} onCLick={action} param={2}/>
          <MenuItem title={"Reports"} />
          <DropdownContainer
            title={"Dropdowns"}
            components={[
              <MenuItem key={""} title={"Menu 1"} />,
              <MenuItem key={""} title={"Menu 2"} />,
            ]}
          /></>

          )}
        </ul>
      </div>
    </>
  );
};

export const MenuItem = ({title, state, onCLick, param }) => {
  return (
      <li
        className={`list-group-item border-0 py-2 px-3  theme-hover cursor-pointer ${state ? "theme-bg": ""}`}
        onClick={()=>onCLick(param)}
      >
        <span>{title}</span>
      </li>
  );
};
export const DropdownContainer = ({key, title, components }) => {
  return (
    <div className="accordion list-group-item border-0 p-0 overflow-hidden">
      <div className="accordion-item  border-0">
        <h2 className="accordion-header " id={`h${key}`}>
          <button
            className="accordion-button theme-hover py-2 px-3 rounded-0 collapsed "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#c${key}`}
            aria-expanded="false"
            aria-controls={`c${key}`}
          >
            {title}
          </button>
        </h2>
        <div
          id={`c${key}`}
          className="accordion-collapse border overflow-hidden ps-2 collapse"
          aria-labelledby={`h${key}`}
          data-bs-parent="#accordionExample"
        >
          <ul className="list-group rounded-0 border-0">
            
          {components && components.map((component, index)=>(
            React.cloneElement(component, {key:index})
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
DropdownContainer.propTypes = {
  components: proptype.array,
  title: proptype.string.isRequired,
  key: proptype.string
};
MenuItem.propTypes = {
  components: proptype.array,
  title: proptype.string.isRequired,
  state: proptype.bool,
};
RequestMenu.propTypes = {
  menuList: proptype.arrayOf(proptype.node),  
};

