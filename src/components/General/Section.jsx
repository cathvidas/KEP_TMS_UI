import proptype from "prop-types";
import { Link } from "react-router-dom";
export const SectionHeading = ({ title, icon }) => (
  <>
    <h5 className="my-2 text-uppercase theme-color">
      {icon && icon}
      &nbsp;{title}
    </h5>
  </>
);
export const SectionTitle = ({ title, Action }) => {
  return (
    <div className="d-flex py-2 justify-content-between">
      <h6>{title}</h6>
      {Action && (
        <Link className="text-muted text-decoration-none" to={Action.Link}>
          {Action.Text}
        </Link>
      )}
    </div>
  );
};

export const SectionBanner = ({ title, subtitle, ActionComponents }) => {
  return (
    <>
      <div
        className="p-4 mb-3 rounded"
        style={{
          background:
            "linear-gradient(rgba(91,228,155,0.2) 0%, rgba(0,167,111,0.2) 98%)",
        }}
      >
        <h3 className="fw-bold" style={{ color: "rgb(0,75,80)" }}>
          {title}
        </h3>
        <p className="m-0">{subtitle}</p>
        {ActionComponents && (
          <div className="mt-2">
            <ActionComponents />
          </div>
        )}
      </div>
    </>
  );
};
SectionHeading.propTypes = {
  title: proptype.string.isRequired,
  icon: proptype.object,
};
SectionBanner.propTypes = {
  title: proptype.string.isRequired,
  subtitle: proptype.string,
  ActionComponents: proptype.func,
};
SectionTitle.propTypes = {
  title: proptype.string.isRequired,
  Action: proptype.object,
};
