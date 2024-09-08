import proptype from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const EmptyState = ({ placeholder, action }) => {
  return (
    <>
      {action ? (
          <div onClick={action} className="bg-light btn text-muted rounded w-100 text-center border py-5">
            {placeholder}
          </div>
      ) : (
        <div className="bg-light text-muted rounded w-100 text-center border py-5">
          {placeholder}
        </div>
      )}
    </>
  );
};
EmptyState.propTypes = {
  placeholder: proptype.string.isRequired,
  action: proptype.func,
};
export default EmptyState;
