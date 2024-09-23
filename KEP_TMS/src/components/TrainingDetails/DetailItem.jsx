import proptype from "prop-types";
export const DetailItem = ({ label, value }) => (
  <p className="m-0 d-flex gap-2">
    <span className="fw-bold text-muted form-label">{label}: </span>{" "}
    {value ? value : "N/A"}
  </p>
);
export const Heading = ({ value }) => (
  <h6 className="text-uppercase">{value}</h6>
);
Heading.propTypes = {
  value: proptype.oneOfType([proptype.string, proptype.number, proptype.bool]),
};
DetailItem.propTypes = {
  label: proptype.string.isRequired,
  value: proptype.oneOfType([proptype.string, proptype.number, proptype.bool]),
};
