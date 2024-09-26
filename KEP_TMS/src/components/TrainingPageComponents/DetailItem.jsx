import proptype from "prop-types";
const DetailItem = ({ label, value, textStyle }) => (
  <div className="m-0 border-start h-100">
    <label className="fw-bold text-muted form-label d-block mb-1 theme-bg-light px-2 py-1">
      {label}:{" "}
    </label>{" "}
    <p
      className={`px-2 py-1 m-0 ${
        textStyle != null ? textStyle : "text-uppercase"
      }`}
    >
      {value ? value : "N/A"}
    </p>
  </div>
);
DetailItem.propTypes = {
  label: proptype.string.isRequired,
  value: proptype.oneOfType([proptype.string, proptype.number, proptype.bool]),
  textStyle: proptype.string,
};
export default DetailItem;
