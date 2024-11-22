import proptype from "prop-types"
const TableEmailTemplate = ({ items, value }) => {
  return (
    <>
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
                        {item[x?.field]}
                    </td>
                  </>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
TableEmailTemplate.propTypes = {
    items: proptype.array,
    value: proptype.array,
}
export default TableEmailTemplate;
