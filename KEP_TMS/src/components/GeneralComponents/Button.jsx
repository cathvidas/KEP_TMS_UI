import proptype from "prop-types";
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
ActionButton.propTypes = {
  title: proptype.string.isRequired,
  actionLink: proptype.string,
  toggle: proptype.object,
  variant: proptype.object,
  onClick: proptype.func
};
