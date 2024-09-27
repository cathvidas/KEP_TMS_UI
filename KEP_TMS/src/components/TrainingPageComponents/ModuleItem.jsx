import { Button, ButtonGroup } from "react-bootstrap";
import proptype from "prop-types";
const ModuleItem = ({ module }) => {
  return (
    <>
      <div className="shadow-sm overflow-hidden card">
        <div className="theme-bg-light p-2 px-3 d-flex align-items-center justify-content-between">
          <small className="text-muted fw-bold text-uppercase">
            {module?.name}
          </small>
          <ButtonGroup>
            <Button
              type="button"
              text
              size="small"
              icon="pi pi-pencil"
              severity="secondary"
              className="p-0 rounded"
            />
            <Button
              type="button"
              text
              size="small"
              severity="danger"
              icon="pi pi-trash"
              className="p-0 rounded"
            />
          </ButtonGroup>{" "}
        </div>
        <div className="px-4 ">
          <Button type="button" icon="pi pi-link" text label="FileName" />
          <Button type="button" icon="pi pi-link" text label="FileName" />
        </div>
      </div>
    </>
  );
};
ModuleItem.propTypes = {
  module: proptype.object.isRequired, // Module object
};
export default ModuleItem;
