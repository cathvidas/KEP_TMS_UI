import { Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import proptype from "prop-types"
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { actionFailed, actionSuccessful, confirmAction } from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import userService from "../../../services/userService";
import { UserTypeValue } from "../../../api/constants";
import { useNavigate } from "react-router-dom";
const AddUserForm = ({showForm, closeForm, userType, data, userRoles})=>{
    const [selectedUser, setSelectedUser] = useState({label:"", value:""})
    const [options, setOptions] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
     const mappedData = data?.map((user) => (
       { label: user?.fullname, value: user?.employeeBadge })
      );
      setOptions(mappedData)
    }, [data]);
    const handleSubmit = () => {
      const isValid = validateForm();
      const userData = data?.filter(
        (user) => user.employeeBadge === selectedUser.value
      )?.[0];
      const roleId = userRoles?.filter((role) => role?.name === userType)?.[0]
        ?.id;
        console.log(isValid, userData, roleId);
      if (isValid && userData && roleId) {
        const newData = { ...userData, roleId: roleId };
        console.log(newData)
        confirmAction({
          onConfirm: () => {
            handleResponseAsync(
              () => userService.updateUser(newData),
              (e) => actionSuccessful("Success!", e.message),
              (e) => actionFailed("Error!", e.message),
              () => {
                closeForm();
                navigate();
              }
            );
          },
        });
      }
    };
    const validateForm = () => {
      let newErrors = "";
      let isValid = true;
      const isExist = data?.some((user) => user.roleName === userType && user.employeeBadge === selectedUser.value);
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
    userRoles: proptype.array 
}
export default AddUserForm;