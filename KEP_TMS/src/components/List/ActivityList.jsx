import { useState } from "react";
import CommonTable from "../General/CommonTable";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { Collapse } from "react-bootstrap";
import { SectionHeading } from "../General/Section";
import userHook from "../../hooks/userHook";

const ActivityList = ({ data, show = true, label, toggle }) => {
  const [isShow, setIsShow] = useState(show);
  const items = [
    { field: "no", header: "No", body:(_,{rowIndex})=><>{rowIndex+1}</> },
    { field: "name", header: "Processed By", body: (rowData) => <>{rowData?.name ? rowData.name : rowData?.userId ? userHook.useUserById(rowData?.userId)?.data?.fullname : "N/A"}</> },
    { field: "process", header: "Process" },
    { field: "date", header: "Date" },
    { field: "remark", header: "Remarks" },
  ];
  return (
    <>
      <div className="flex gap-0 mb-1">
        {label && <SectionHeading title={label} />}
        {toggle && (
          <Button
            className="py-0"
            size="small"
            type="button"
            text
            icon={isShow ? "pi pi-eye-slash" : "pi pi-eye"}
            onClick={() => setIsShow(!isShow)}
            aria-controls="example-collapse-text"
            aria-expanded={isShow}
          />
        )}
      </div>

      <Collapse in={isShow}>
        <div id="example-collapse-text">
          <CommonTable
            dataTable={data}
            columnItems={items}
            hideHeader
            hidePaginator
            dataKey={"id"}
          />
        </div>
      </Collapse>
    </>
  );
};
ActivityList.propTypes = {
  data: proptype.array.isRequired,
  show: proptype.bool,
  toggle: proptype.bool,
  label: proptype.string,
};
export default ActivityList;
