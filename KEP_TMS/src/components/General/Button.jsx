import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export const ActionButton = ({ title, actionLink, toggle, variant, onClick }) => {
  const style =
    variant && variant?.theme == "secondary"
      ? "theme-secondary"
      : variant?.theme == "next-btn"
      ? "formStep-active"
      : "theme-bg";
  const size = variant && variant.size ? variant.size : "btn-lg";
  return (
    <>
      <Link
        className={`btn ${size} me-2 ${style}`}
        role="button"
        to={actionLink ? actionLink : "#"}
        style={{ background: "#00a76f;border-color: #00a76f" }}
        data-bs-toggle={toggle && toggle.Item ? toggle.Item : ""}
        data-bs-target={toggle && toggle.Target ? toggle.Target : ""}
        onClick={onClick}
      >
        {title}
      </Link>
    </>
  );
};

export const NavigationButton=({state, leftButton, RightButton})=>{
  return (<>
  <div className="d-flex justify-content-between">
    <Button variant={"light"} onClick={()=>leftButton.onClick(state > 0 ? state - 1 : 0)} disabled={leftButton.state}><FontAwesomeIcon icon={faArrowLeft}/> {leftButton.placeholder}</Button>
    <Button variant="success" onClick={() =>RightButton.onClick(state + 1)} disabled={RightButton.state}>{RightButton.placeholder} <FontAwesomeIcon icon={faArrowRight}/></Button>
  </div>
  </>)
}
NavigationButton.propTypes = {
  state: proptype.number.isRequired,
  leftButton: proptype.object,
  RightButton: proptype.object,
};

ActionButton.propTypes = {
  title: proptype.string.isRequired,
  actionLink: proptype.string,
  toggle: proptype.object,
  variant: proptype.object,
  onClick: proptype.func
};
