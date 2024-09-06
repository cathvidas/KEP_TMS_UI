import proptype from "prop-types";

function GetInitials(name) {
  let initials = "";
  const nameStr = String(name || "");
  if (nameStr) {
    const parts = nameStr.split(",", 2);
    if (parts.length >= 2) {
      // Extract last and first names if separated by a comma
      const [lastName, firstName] = parts.map((part) => part.trim());
      initials = getInitialsFromParts(lastName, firstName);
    } else {
      // Split by spaces if no comma is found
      const parts = nameStr.split(" ").filter((part) => part.trim() !== "");
      if (parts.length > 0) {
        const firstName = parts[0].trim();
        const lastName = parts.length > 1 ? parts[1].trim() : "";
        initials = getInitialsFromParts(lastName, firstName);
      }
    }
  }
  return initials;
}
function getInitialsFromParts(lastName, firstName) {
  let initials = "";

  if (firstName.length > 0) {
    initials += firstName[0];
  }
  if (lastName.length > 0) {
    initials += lastName[0];
  }
  return initials.toUpperCase(); // Optional: convert initials to uppercase
}

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
