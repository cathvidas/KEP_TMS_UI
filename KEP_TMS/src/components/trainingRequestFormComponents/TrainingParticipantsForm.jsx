import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { UserList } from "../List/UserList";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ActionButton } from "../General/Button";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types";
import { getAllUsersApi } from "../../api/userApi";
import { FilterMatchMode } from "primereact/api";
import EmptyState from "./EmptyState";
import { Button } from "primereact/button";
import { Modal } from "react-bootstrap";
const TrainingParticipantsForm = ({ formData, handleResponse, errors , departments}) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const onGlobalFilterChange = (value) => {
    if (filters.global.value !== value && value !== undefined) {
      setFilters((prev) => ({
        ...prev,
        global: { ...prev.global, value },
      }));
    }
  };

  const [data, setFormData] = useState(formData);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ name: "", department: "" });
  const [participants, setParticipants] = useState({
    trainees: [],
    facilitators: [],
    provider: "",
  });
  const [error, setError] = useState({});
  useEffect(() => {
    setError(errors);
  }, [errors]);

  const [list, setList] = useState({
    users: [],
    providers: [],
  });
  const [filteredList, setFilteredList] = useState({
    users: [],
    providers: [],
  });
  const [currentSelected, setCurrentSelected] = useState("");

  const handleShow = (type) => {
    setCurrentSelected(type);
    setShowModal(true);
  };
  useEffect(() => {
    handleResponse(data);
  }, [data]);

  useEffect(() => {
    const fetchDatas = async () => {
      const user = await getAllUsersApi();
      const activeUsers = user.filter((user) => user.statusName === "Active");

      const availableUsers = activeUsers
        .filter(
          (x) =>
            !data.trainingParticipants?.some(
              (y) => x.employeeBadge === y.employeeBadge
            )
        )
        .filter(
          (x) =>
            !data.trainingFacilitators?.some(
              (y) => x.employeeBadge === y.employeeBadge
            )
        );


      setList({
        users: availableUsers,
      });
      setFilteredList({
        users: availableUsers,
      });
    };
    fetchDatas();
  }, [data]);
  useEffect(() => {
    var filtered = list.users;
    if (filter?.name != null) {
      filtered = list.users.filter((user) =>
        user?.name?.toLowerCase().includes(filter?.name?.toLowerCase())
      );
    }
    if (filter?.department != null) {
      filtered = list.users.filter((user) =>
        user?.departmentName
          ?.toLowerCase()
          .includes(filter?.department.toLowerCase())
      );
    }
    setFilteredList((prev) => ({ ...prev, users: filtered }));
  }, [filter, list.users]);

  const handleParticipants = (data) => {
    if (participants.trainees !== data && currentSelected === "trainees") {
      setParticipants((prev) => ({ ...prev, trainees: data }));
    } else if (
      participants.facilitators !== data &&
      currentSelected === "facilitators"
    ) {
      setParticipants((prev) => ({ ...prev, facilitators: data }));
    }
  };

  const checkUser = () => {
    if (currentSelected === "trainees") {
      if (participants?.trainees != null) {
        const newParticipants = participants.trainees.filter(
          (x) =>
            !data?.trainingParticipants?.some(
              (y) => x.employeeBadge === y.employeeBadge
            )
        );

        setFormData({
          ...data,
          trainingParticipants: [
            ...data.trainingParticipants,
            ...newParticipants,
          ],
        });
      }
    } else if (currentSelected === "facilitators") {
      if (participants?.facilitators != null) {
        const newParticipants = participants.facilitators.filter(
          (x) =>
            !data?.trainingFacilitators?.some(
              (y) => x.employeeBadge === y.employeeBadge
            )
        );

        setFormData({
          ...data,
          trainingFacilitators: [
            ...data.trainingFacilitators,
            ...newParticipants,
          ],
        });
      }
    }
  };

  const removeParticipant = (type, employeeBadge) => {
    setFormData({
      ...data,
      [type]: data[type].filter((obj) => obj.employeeBadge !== employeeBadge),
    });
  };
  const bodyContent = (
    <>
      {" "}
      <SearchBar
        handleOnInput={onGlobalFilterChange}
        options={departments}
      />
      <div
        className="overflow-auto max-vh-100 mt-2"
        style={{ maxHeight: "calc(100vh - 275px)" }}
      >
        <UserList
          leadingElement={true}
          userlist={
            currentSelected === "facilitators"
              ? filteredList.users.filter((x) => x.roleName === "Facilitator")
              : filteredList.users
          }
          trailingElement={{ input: true }}
          property={"name"}
          handleParticipants={handleParticipants}
          filterTemp={filters}
        />
      </div>
    </>
  );
  return (
    <>
      <SectionHeading
        title="Training Participants"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      {error?.trainees && <small className="text-red">{error.trainees}</small>}
      {data?.trainingParticipants?.length > 0 ? (
        <>
          <span className="d-flex mb-2 justify-content-between">
            <span className="text-muted">
              {data.trainingParticipants?.length} participants
            </span>

            <ActionButton
              variant={{ size: "btn-sm" }}
              title="Add Participant"
              onClick={() => handleShow("trainees")}
            />
          </span>
          <UserList
            leadingElement={true}
            userlist={data.trainingParticipants}
            trailingElement={{ action: true }}
            col="3"
            property={"name"}
            action={(e) => removeParticipant("trainingParticipants", e)}
            scrollHeight={"400px"}
          />
        </>
      ) : (
        <EmptyState
          placeholder="No participants added yet, please click to add."
          action={() => handleShow("trainees")}
        />
      )}

      <div className="mt-4"></div>
      <SectionHeading
        title="Training faciltator"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      {error?.facilitators && (
        <small className="text-red">{error.facilitators}</small>
      )}
      {data.trainingFacilitators.length > 0 ? (
        <>
          <span className="d-flex mb-2 justify-content-between">
            <span className="text-muted">
              {data.trainingFacilitators.length} facilitators
            </span>
            <ActionButton
              variant={{ size: "btn-sm" }}
              title="Add Participant"
              onClick={() => handleShow("facilitators")}
            />
          </span>
          <UserList
            leadingElement={true}
            userlist={data.trainingFacilitators}
            trailingElement={{ action: true }}
            col="3"
            property={"name"}
            action={(e) => removeParticipant("trainingFacilitators", e)}
          />
        </>
      ) : (
        <EmptyState
          placeholder="Click to add facilitator."
          action={() => handleShow("facilitators")}
        />
      )}

      <div className="mt-4"></div>
      <Modal show={showModal} onHide={()=>setShowModal(false)} size={"xl"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 `}>{
          currentSelected === "facilitators"
            ? "Facilitators"
            : currentSelected === "trainees"
            ? "Employees": "Users"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">{bodyContent}
        </Modal.Body>
        <Modal.Footer className="border-0">
          
        <Button label="Cancel"  onClick={()=>setShowModal(false)} className="p-button-text rounded" />
        <Button label="Add" icon="pi pi-user-plus" onClick={checkUser} className="rounded"  />
   
        </Modal.Footer>
      </Modal>
      {/* <ModalContainer
        variantStyle={"primary"}
        state={showModal}
        close={handleClose}
        buttonAction={checkUser}
        heading={
          currentSelected === "facilitators"
            ? "Facilitators"
            : currentSelected === "trainees"
            ? "Employees"
            : "Users"
        }
        id="userlistModal"
        buttonText="Add"
        body={bodyContent}
        size={"xl"}
      /> */}
    </>
  );
};
TrainingParticipantsForm.propTypes = {
  formData: proptype.object,
  handleResponse: proptype.func,
  errors: proptype.oneOfType([proptype.object, proptype.string]),
};
export default TrainingParticipantsForm;
