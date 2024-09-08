import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype from "prop-types";
export const TabHeader = ({ tablist , activeItem}) => {
  return (
    <>
      {tablist && (
        <ul className="group-list d-flex gap-2">
          {tablist.map((tab, index) => (
            <span
              key={index}
              className={`btn  group-list-item ${activeItem === tab ? ' btn-success' : 'btn-light'}`}>
            {activeItem == tab && <FontAwesomeIcon icon={faCheck}/>} {tab}
            </span>
          ))}
        </ul>
      )}
    </>
  );
};
TabHeader.propTypes = {
  tablist: proptype.array,
};
