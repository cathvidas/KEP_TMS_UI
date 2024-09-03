import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype, { func } from "prop-types";
import React from "react";

export const RequestMenu = () => {
  return (
    <>
      <div
        className="border-end pe-3 position-sticky top-0"
        style={{ height: "100vh" }}
      >
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faBars} />
          <i className="icon ion-star bs-icon-md bs-icon"></i>
          <h5 className="m-0">MENU</h5>
        </div>
        <ul className="list-group">
          <MenuItem title={"Overview"} />
          <MenuItem title={"Modules"} />
          <MenuItem title={"Exam"} />
          <MenuItem title={"Reports"} />
          <DropdownContainer
            title={"Dropdowns"}
            components={[
              <MenuItem key={""} title={"Menu 1"} />,
              <MenuItem key={""} title={"Menu 2"} />,
            ]}
          />
        </ul>
      </div>
    </>
  );
};

export const MenuItem = ({title }) => {
  return (
      <li
        className={`list-group-item`}
      >
        <span>{title}</span>
      </li>
  );
};
export const DropdownContainer = ({key, title, components }) => {
  return (
    <div className="accordion list-group-item p-0 overflow-hidden">
      <div className="accordion-item  border-0">
        <h2 className="accordion-header " id={`h${key}`}>
          <button
            className="accordion-button rounded-0 collapsed "
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
          className="accordion-collapse collapse"
          aria-labelledby={`h${key}`}
          data-bs-parent="#accordionExample"
        >
          <ul className="list-group border-0">
            
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
};

