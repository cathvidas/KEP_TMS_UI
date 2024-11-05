import { Badge } from "primereact/badge";
import proptype from "prop-types";
import sortArrayInDescending from "../../utils/sorting/sortArrayInDescending";
import { Button } from "primereact/button";
import { useState } from "react";

const ActivityLog = ({ items, label, isDescending, show = true, toggle}) => {
  const arrayList = isDescending ? sortArrayInDescending(items) : items;
  const [isShow, setIsShow] = useState(show);
  return (
    <>
      <div className="flex gap-0">
        {label && <h6 className="mb-1">{label}</h6>}
        {toggle &&
        <Button className="py-0" size="small" type="button" text icon={isShow ? "pi pi-eye-slash" : "pi pi-eye"} onClick={()=>setIsShow(!isShow)}/>
      } </div>
      {isDescending}
      {isShow && arrayList?.map((item, index) => (
        <>
          <div className="flex">
            <div className="text-muted" style={{ width: "125px" }}>
              <small style={{ fontSize: "0.8rem" }}>{item?.date}</small>
            </div>
            <div className="position-relative me-2 text-center">
              <div
                className="h-100 border position-absolute start-50 top-50 z-1 translate-middle"
                style={{ width: "1px" }}
              ></div>
              <Badge
                severity={
                  item?.severity ? item?.severity : index === 0 ? "default" : ""
                }
                className={` z-2 position-relative`}
                style={{
                  background: item?.severity
                    ? ""
                    : index === 0
                    ? ""
                    : "#c3c8cd",
                }}
              />
            </div>
            <div className="col">
              <small>
                {item?.icon && (
                  <i
                    style={{ color: item?.color, fontSize: ".8rem" }}
                    className={item?.icon}
                  ></i>
                )}{" "}
                {item?.label}
              </small>
            </div>
          </div>
        </>
      ))}
    </>
  );
};
ActivityLog.propTypes = {
  items: proptype.array,
  label: proptype.string,
  isDescending: proptype.bool,
  show: proptype.bool,
  toggle: proptype.bool,
};
export default ActivityLog;
