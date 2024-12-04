import proptype from "prop-types"
import userHook from "../../hooks/userHook";
const TableEmailTemplate = ({ items, value, label, hideInNull = false }) => {
  return (
    <>
    {((hideInNull && value?.length > 0) || !hideInNull) && <>
     <p>
            <strong>{label}</strong>
        </p>
      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            {items?.map((item) => (
              <>
                <th
                  style={{
                    padding: "5px",
                    textAlign: "left",
                    fontSize: "16px",
                    border: "1px solid",
                  }}
                >
                  {item?.header}
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {value?.map((item) => (
            <>
              <tr>
                {items?.map((x) => (
                  <>
                    <td style={{ padding: "5px"}}>
                      {x?.getName ?
                        userHook.useUserById(item[x?.field])?.data?.fullname:
                        item[x?.field]}
                    </td>
                  </>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
      </>}
    </>
  );
};
TableEmailTemplate.propTypes = {
    items: proptype.array,
    value: proptype.array,
    label: proptype.string,
    hideInNull: proptype.bool,
}
export default TableEmailTemplate;
