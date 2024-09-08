import { Button, Table } from "react-bootstrap";

const RTable = () => {
  var items = [
    {
      key1: "01",
      key2: "Economics",
      key3: "John Doe",
      key4: "LEP Building",
      key5: "Jan 25, 2023 - jan 16, 2024",
      key6: "Jan 25, 2023",
      key7: "status",
    },
    {
      key1: "02",
      key2: "sample",
      key3: "Jane Doe",
      key4: "LEP Vwnuw",
      key5: "Jan 25, 2023 - jan 16, 2024",
      key6: "Jan 25, 2023",
      key7: "status",
    },
  ];
  return (
    <div className="">
      <Table className="theme-table bg-success border m-0">
        <thead className="theme-bg">
          <tr>
            <th>R_No</th>
            <th>Program</th>
            <th>Requestor</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.key1}</td>
              <td>{item.key2}</td>
              <td>{item.key3}</td>
              <td>{item.key4}</td>
              <td>{item.key5}</td>
              <td>{item.key6}</td>
              <td>
                <span className="badge bg-primary">{item.key7}</span>
              </td>
              <td>
                <Button type="button" className="btn-primary btn-sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default RTable;
