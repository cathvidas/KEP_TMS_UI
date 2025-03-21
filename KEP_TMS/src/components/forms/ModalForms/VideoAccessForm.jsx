import { Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import proptype from "prop-types";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import { SessionGetEmployeeId } from "../../../services/sessions";
import trainingRequestHook from "../../../hooks/trainingRequestHook";
import attachmentService from "../../../services/attachmentService";
const VideoAccessForm = ({
  showForm,
  closeForm,
  userType,
  onFinish,
  dataList,
  data
}) => {
  const [selectedItem, setSelectedItem] = useState({ label: "", value: "" });
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 5,
    page: 1,
    value: null,
  });

  const trainingRequests = trainingRequestHook.usePagedTrainingRequest(
    paginatorConfig.page,
    paginatorConfig.rows,
    paginatorConfig.value
  );
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const filteredData = trainingRequests?.data?.results?.filter(
      (item) => !dataList?.some((x) => x.id === item?.id)
    );
    const mappedData = filteredData?.map((item) => ({
      label: "Request #" + item?.id + " - " + item?.trainingProgram?.name,
      value: item?.id,
    }));
    setOptions(mappedData);
  }, [trainingRequests?.data?.results, userType, dataList]);

  const handleSubmit = () => {
    if(!selectedItem?.value) {
      setError("No training request selected")
      return
    }
    const formData = new FormData();
    formData.append("attachmentIds", data?.id);
      confirmAction({
        onConfirm: () => {
          handleResponseAsync(
            () => attachmentService.addAttachmentsAccess(selectedItem?.value, formData, SessionGetEmployeeId()),
            () => actionSuccessful("Success!", "Successfully added access to video"),
            (e) => actionFailed("Error!", e.message),
            onFinish
          );
        },
      });
  };
  return (
    <>
      <Modal show={showForm} onHide={closeForm}>
        <Modal.Header closeButton>
          <Modal.Title className="h5 theme-color">{`Add Video Access`}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Row>
              <FormFieldItem
                label={"Training Program"}
                error={error}
                FieldComponent={
                  <Select
                    // isMulti
                    onMenuScrollToBottom={() =>
                      setPaginatorConfig((prev) => ({
                        ...prev,
                        rows: prev.rows + 10,
                      }))
                    }
                    onInputChange={(e) =>
                      setPaginatorConfig((prev) => ({ ...prev, value: e }))
                    }
                    isLoading={trainingRequests?.loading}
                    options={options}
                    value={selectedItem}
                    onChange={setSelectedItem}
                  />
                }
              />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              onClick={closeForm}
              className="rounded"
              text
              label="Cancel"
            />
            <Button
              type="button"
              className="rounded"
              label="Save"
              onClick={handleSubmit}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
VideoAccessForm.propTypes = {
  showForm: proptype.bool,
  closeForm: proptype.func,
  userType: proptype.string,
  data: proptype.array,
  userRoles: proptype.array,
  onFinish: proptype.func,
  dataList: proptype.array,
};
export default VideoAccessForm;
