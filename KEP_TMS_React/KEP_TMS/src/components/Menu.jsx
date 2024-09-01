import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RequestMenu = ({}) => {
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
          <MenuItem
            title={"Dropdown"}
            components={[
              <MenuItem title={"Menu 1"} />,
              <MenuItem title={"Menu 2"} />,
            ]}
          />
        </ul>
      </div>
    </>
  );
};


export const MenuItem = ({ components, title }) => {
  return (
    <>
      <li className="list-group-item">
        <span>{title}</span>
      </li>
      {components &&
        components.map((component, index) => (
          <div key={index}>{component}</div>
        ))}

    </>
  );
};
