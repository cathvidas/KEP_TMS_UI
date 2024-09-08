import proptype from "prop-types";
import GetInitials from "../../utils/GetInitials";


const UserIcon = ({ Name }) => {
  return (
    <>
      <div className="d-flex align-items-center gap-2">
        <div
          className="border rounded-circle ratio ratio-1x1 d-flex text-center align-items-center justify-content-center"
          style={{ width: "30px" }}
        >
          <span style={{ marginTop: "1px" }}>{GetInitials(Name)}</span>
        </div>
      </div>
    </>
  );
};
UserIcon.propTypes = {
  Name: proptype.string.isRequired,
};
export default UserIcon;
