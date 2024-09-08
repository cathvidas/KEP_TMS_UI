import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormFieldItem, FormsectionHeading } from "./FormElements";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { UserList } from "../ListComponents/UserList";
import { ModalContainer } from "../ModalsComponent/ModalContainer";
import { useState } from "react";
import EmptyState from "./EmptyState";
import { GetEmployees } from "../../services/getApis";
import SearchBar from "./SearchBar";
import { ActionButton } from "../GeneralComponents/Button";
import Select from "react-select";

const TrainingParticipant = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleResponse = () => {};
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate1", label: "Chocolate" },
    { value: "strawberry1", label: "Strawberry" },
    { value: "vanilla14", label: "Vanilla" },
    { value: "chocolate3", label: "Chocolate" },
    { value: "strawberry3", label: "Strawberry" },
    { value: "vanilla3", label: "Vanilla" },
    { value: "chocolate2", label: "Chocolate" },
    { value: "strawberry2", label: "Strawberry" },
    { value: "vanilla2", label: "Vanilla" },
  ];
  const bodyContent = (
    <>
      {" "}
      <SearchBar />
      <div
        className="overflow-auto max-vh-100 mt-2"
        style={{ maxHeight: "calc(100vh - 275px)" }}
      >
        <UserList
          leadingElement={true}
          userlist={GetEmployees()}
          trailingElement={true}
        />
      </div>
    </>
  );
  const participants = [];
  return (
    <>
      <FormsectionHeading
        title="Training Participants"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      {participants.length > 0 ? (
        <>
          <span className="d-flex justify-content-between">
            <span className="text-muted">
              {participants.length} participants
            </span>
            <ActionButton
              variant={{ size: "btn-sm" }}
              title="Add Participant"
              onClick={handleShow}
            />
          </span>
          <UserList leadingElement={true} userlist={participants} col="3" />
        </>
      ) : (
        <EmptyState
          placeholder="No participants added yet, please click to add."
          action={handleShow}
        />
      )}

      <div className="mt-4"></div>
      <FormsectionHeading
        title="Training faciltator"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      {participants.length > 0 ? (
        <>
          <span className="d-flex justify-content-between">
            <span className="text-muted">
              {participants.length} participants
            </span>
            <ActionButton
              variant={{ size: "btn-sm" }}
              title="Add Participant"
              onClick={handleShow}
            />
          </span>
          <UserList leadingElement={true} userlist={participants} col="3" />
        </>
      ) : (
        <EmptyState
          placeholder="Click to add facilitator."
          action={handleShow}
        />
      )}
      
      <div className="mt-4"></div>
      <FormsectionHeading
        title="Training Provider"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
        <FormFieldItem
          col="col-12"
          FieldComponent={<Select  options={options} />}
        />
      <ModalContainer
        variantStyle={"primary"}
        state={showModal}
        close={handleClose}
        buttonAction={handleResponse}
        heading="Employee List"
        id="userlistModal"
        buttonText="Add"
        body={bodyContent}
      />
    </>
  );
};
export default TrainingParticipant;
