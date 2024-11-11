import { useState } from "react";
import CommonTable from "../General/CommonTable";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { Collapse } from "react-bootstrap";

const ActivityList = ({ data, show = true, label, toggle }) => {
  const [isShow, setIsShow] = useState(show);
  console.log(data)
  const items = [
    { field: "name", header: "Processed By" },
    { field: "process", header: "Process" },
    { field: "date", header: "Date" },
    { field: "remark", header: "Remark" },
  ];
  return (
    <>
      <div className="flex gap-0 mb-1">
        {label && (
          <h6 className="mb-1 theme-color" style={{ fontWeight: 600 }}>
            {label}
          </h6>
        )}
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
