import proptype from "prop-types";
const GetInitials = (name) => {
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
};
const getInitialsFromParts = (lastName, firstName) => {
  let initials = "";

  if (firstName.length > 0) {
    initials += firstName[0];
  }
  if (lastName.length > 0) {
    initials += lastName[0];
  }
  return initials.toUpperCase(); // Optional: convert initials to uppercase
};

GetInitials.propTypes={
    name: proptype.string.isRequired
}
export default GetInitials