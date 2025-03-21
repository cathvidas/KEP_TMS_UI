import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { UserList } from "../List/UserList";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ActionButton } from "../General/Button";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types";
import EmptyState from "./EmptyState";
import { Button } from "primereact/button";
import { Modal } from "react-bootstrap";
import { TrainingType, UserTypeValue } from "../../api/constants";
import userHook from "../../hooks/userHook";
import { actionDelay } from "../../services/sweetalert";
import Swal from "sweetalert2";
const TrainingParticipantsForm = ({
  formData,
  handleResponse,
  errors,
  departments,
  trainingType,
}) => {
  const [filter, setFilter] = useState({ name: "", department: "" });
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 50,
    page: 1,
    value: filter?.name,
  });
  const users = userHook.useAllUsers(
    paginatorConfig.page,
    paginatorConfig.rows,
    paginatorConfig.value
  );
  const [data, setFormData] = useState(formData);
  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState({
    trainees: [],
    facilitators: [],
    provider: "",
  });
  useEffect(() => {
    setPaginatorConfig((prev) => ({
      ...prev,
      value: filter?.value || filter.department,
    }));
  }, [filter]);

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
    const totalSelected =
      data.trainingParticipants.length + data.trainingFacilitators.length;
    setPaginatorConfig((prev) => ({
      ...prev,
      rows: totalSelected > 50 ? totalSelected + 50 : 50,
    }));
    setShowModal(true);
  };
  useEffect(() => {
    handleResponse(data);
  }, [data]);

  useEffect(() => {
    const fetchDatas = async () => {
      const user = users?.data?.results;
      const activeUsers = user.filter((user) => user.statusName !== "Inactive");
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
              (y) => x.employeeBadge === y.facilitatorBadge
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
  }, [data, users?.data?.results, participants, paginatorConfig]);
  useEffect(() => {
    var filtered = list.users;
    if (filter?.name != null && filter?.name != "") {
      filtered = list.users.filter((user) =>
        user?.name?.toLowerCase().includes(filter?.name?.toLowerCase())
      );
    }
    if (filter?.department != null && filter?.department != "") {
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
  useEffect(() => {
    const total =
      participants?.trainees?.length + participants?.facilitators?.length;
    const addedParticipants =
      data?.trainingParticipants?.length + data?.trainingFacilitators?.length;
    let addedRows = total + addedParticipants + 50;
    setPaginatorConfig((prev) => ({ ...prev, rows: addedRows }));
  }, [participants, data]);
  const checkUser = () => {
    actionDelay();
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
              (y) => y.facilitatorBadge === x.employeeBadge
            )
        );
        const mapped = newParticipants.map((item) => {
          return { facilitatorBadge: item.employeeBadge, faciDetail: item };
        });
        setFormData({
          ...data,
          trainingFacilitators: [...data.trainingFacilitators, ...mapped],
        });
      }
    }
    setShowModal(false);
    Swal.close();
  };
  const removeParticipant = (employeeBadge) => {
    setFormData({
      ...data,
      trainingParticipants: data?.trainingParticipants.filter(
        (obj) => obj.employeeBadge !== employeeBadge
      ),
    });
  };

  const removeFacilitator = (employeeBadge) => {
    setFormData({
      ...data,
      trainingFacilitators: data?.trainingFacilitators.filter(
        (obj) => obj.facilitatorBadge !== employeeBadge
      ),
    });
  };
  const bodyContent = (
    <>
      {" "}
      <SearchBar handleOnInput={setFilter} options={departments} />
      <div className="overflow-auto max-vh-100 mt-2">
        <UserList
        scrollHeight={"60vh"}
          leadingElement={true}
          userlist={
            currentSelected === "facilitators"
              ? filteredList.users
                  .filter(
                    (x) =>
                      x?.roleName === UserTypeValue.FACILITATOR ||
                      x?.roleName === UserTypeValue.ADMIN
                  )
                  .filter(
                    (user) =>
                      !participants?.facilitators?.some(
                        (obj) => obj.employeeBadge === user.employeeBadge
                      )
                  )
              : filteredList.users.filter(
                  (user) =>
                    !participants?.trainees?.some(
                      (obj) => obj.employeeBadge === user.employeeBadge
                    )
                )
          }
          trailingElement={{ input: true }}
          property={"name"}
          handleParticipants={handleParticipants}
          handleScroll={() => {
            if (users?.data?.totalRecords >= paginatorConfig.rows) {
              setPaginatorConfig((prev) => ({ ...prev, rows: prev.rows + 50 }));
            }
          }}
          showSelected
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
            action={(e) => removeParticipant(e)}
            // scrollHeight={"400px"}
          />
        </>
      ) : (
        <EmptyState
          placeholder="No participants added yet, please click to add."
          action={() => handleShow("trainees")}
        />
      )}
      {trainingType === TrainingType.INTERNAL && (
        <>
          <div className="mt-4"></div>
          <SectionHeading
            title="Training facilitator/s"
            icon={<FontAwesomeIcon icon={faUsers} />}
          />
          {error?.facilitators && (
            <small className="text-red">{error.facilitators}</small>
          )}
          {data.trainingFacilitators?.length > 0 ? (
            <>
              <span className="d-flex mb-2 justify-content-between">
                <span className="text-muted">
                  {data.trainingFacilitators?.length} facilitators
                </span>
                <ActionButton
                  variant={{ size: "btn-sm" }}
                  title="Add Facilitator"
                  onClick={() => handleShow("facilitators")}
                />
              </span>
              <UserList
                leadingElement={true}
                userlist={data.trainingFacilitators?.map(
                  (item) => item?.faciDetail ?? item
                )}
                trailingElement={{ action: true }}
                col="3"
                action={(e) => removeFacilitator(e)}
              />
            </>
          ) : (
            <EmptyState
              placeholder="Click to add facilitator."
              action={() => handleShow("facilitators")}
            />
          )}
        </>
      )}

      <div className="mt-4"></div>

      <Modal
        show={showModal}
        backdrop="static"
        onHide={() => setShowModal(false)}
        size={"xl"}
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 `}>
            {currentSelected === "facilitators"
              ? "Facilitators"
              : currentSelected === "trainees"
              ? "Employees"
              : "Users"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">{bodyContent}</Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            label="Cancel"
            onClick={() => setShowModal(false)}
            className="p-button-text rounded"
          />
          <Button
            label="Add"
            icon="pi pi-user-plus"
            onClick={checkUser}
            className="rounded"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
TrainingParticipantsForm.propTypes = {
  formData: proptype.object,
  handleResponse: proptype.func,
  errors: proptype.oneOfType([proptype.object, proptype.string]),
  departments: proptype.array,
  trainingType: proptype.oneOf([TrainingType.INTERNAL, TrainingType.EXTERNAL]),
};
export default TrainingParticipantsForm;
