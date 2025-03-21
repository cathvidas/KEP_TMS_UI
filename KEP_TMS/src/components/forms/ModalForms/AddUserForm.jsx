import { Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import proptype from "prop-types"
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { statusCode, UserTypeValue } from "../../../api/constants";
import mapUserUpdateDetail from "../../../services/DataMapping/mapUserUpdateDetails";
import { actionFailed, actionSuccessful, confirmAction } from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import userService from "../../../services/userService";
import { SessionGetEmployeeId } from "../../../services/sessions";
import userHook from "../../../hooks/userHook";
const AddUserForm = ({showForm, closeForm, userType, userRoles, optionList, onFinish})=>{
    const [selectedUser, setSelectedUser] = useState({label:"", value:""})  
    const [paginatorConfig, setPaginatorConfig] = useState({
      first: 0,
      rows: 5,
      page: 1,
      value: null,
    }); 
    
    const users = userHook.useAllUsers(paginatorConfig.page, paginatorConfig.rows, paginatorConfig.value);
    const userDetail = userHook.useUserById(selectedUser.value)?.data;
    const [options, setOptions] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
      const filteredData = users?.data?.results?.filter((user) => user.roleName !== userType);
     const mappedData = filteredData?.map((user) => (
       { label: user?.fullname, value: user?.employeeBadge })
      );
      setOptions(mappedData)
    }, [users?.data?.results, userType]);
    const handleSubmit = () => {
      const isValid = validateForm();
      const roleId = userRoles?.filter((role) => role?.label === userType)?.[0]
        ?.value;
      if (isValid && userDetail && roleId) {
        const newData = { ...mapUserUpdateDetail(userDetail, optionList), roleId: roleId, updatedBy: SessionGetEmployeeId(), statusId: statusCode.ACTIVE };
        confirmAction({
          onConfirm: () => {
            handleResponseAsync(
              () => userService.updateUser(newData),
              (e) => actionSuccessful("Success!", e.message),
              (e) => actionFailed("Error!", e.message),
              onFinish
            );
          },
        });
      }
    };
    const validateForm = () => {
      let newErrors = "";
      let isValid = true;
      const isExist = users?.data?.results?.some((user) => user.roleName === userType && user.employeeBadge === selectedUser.value);
      if (isExist) {
        newErrors = `This user is already ${userType === UserTypeValue.FACILITATOR ? "a": "an"} ${userType} `;
        isValid = false;
      }
      if(!selectedUser?.value){
        newErrors = "User is required";
        isValid = false;
      }
      setError(!isValid ? newErrors: "");
      return isValid;
    };
    return (
      <>
        <Modal show={showForm} onHide={closeForm}>
          <Modal.Header closeButton>
            <Modal.Title className="h5 theme-color">{`Add ${userType}`}</Modal.Title>
          </Modal.Header>
          <Form >
          <Modal.Body>
            <Row>
                <FormFieldItem
                label={"User"}
                error={error}
                FieldComponent={
                    <Select
                    onMenuScrollToBottom={() =>
                      setPaginatorConfig((prev) => ({ ...prev, rows: prev.rows + 10 }))
                    }    onInputChange={(e) =>
                      setPaginatorConfig((prev) => ({ ...prev, value: e }))
                    }
                      isLoading={users?.loading}
                    options={options} 
                    value={selectedUser}   
                      onChange={setSelectedUser}
                    />
                }
                />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" onClick={closeForm} className="rounded" text label="Cancel"/>
            <Button type="button" className="rounded" label="Save" onClick={handleSubmit}/>
          </Modal.Footer></Form>
        </Modal>
      </>
    );
}
AddUserForm.propTypes = {
    showForm: proptype.bool,
    closeForm: proptype.func, 
    userType: proptype.string,
    data: proptype.array,
    userRoles: proptype.array,
    optionList: proptype.object,
    onFinish: proptype.func
}
export default AddUserForm;