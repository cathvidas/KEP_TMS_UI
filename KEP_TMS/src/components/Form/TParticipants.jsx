import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormFieldItem } from "./FormElements";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { UserList } from "../List/UserList";
import { ModalContainer } from "../Modal/ModalContainer";
import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import { ActionButton } from "../General/Button";
import Select from "react-select";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types";
import { getAllUsers } from "../../api/UserAccountApi";
import { getAllDepartments } from "../../api/ComboBoxes";
import { getAllTrainingProviders } from "../../services/trainingServices";
import { FilterMatchMode } from "primereact/api";
const TrainingParticipant = ({ formData, handleResponse }) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target?.value;
    // let _filters = { ...filters };

    // _filters["global"].value = value;

    if(filters.global.value !== value && value !== undefined){
      setFilters((prev)=>({
        ...prev, global:{...prev.global, value}

      }))
    }
    //setFilters(_filters);
  };

  console.log(filters)

  useEffect(()=>{
    
  })











  const [data, setFormData] = useState(formData);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ name: "", department: "" });
  const [participants, setParticipants] = useState({
    trainees: [],
    facilitators: [],
    provider: "",
  });

  
  
  const handleClose = () => setShowModal(false);
  const [list, setList] = useState({
    users: [],
    departments: [],
    providers: [],
  });
  const [filteredList, setFilteredList] = useState({
    users: [],
    departments: [],
    providers: [],
  });
  const [currentSelected, setCurrentSelected] = useState("");
  
  const handleShow = (type) => {
    console.log(type);
    setCurrentSelected(type);
    console.log(currentSelected);
    setShowModal(true);
  };
  useEffect(() => {
    handleResponse(data);
    console.log(data);
  }, [data]);

  useEffect(() => {
    const fetchDatas = async () => {
      const user = await getAllUsers();
      const activeUsers = user
        .filter((user) => user.statusName === "Active")
        .map(({ id, firstname, lastname, employeeBadge, departmentName, roleName }) => ({
          id,
          name: `${lastname}, ${firstname}`,
          employeeBadge,
          departmentName,
          roleName
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      const availableUsers = activeUsers.filter(
        (x) => !data.trainingParticipants?.some((y) => x.employeeBadge === y.employeeBadge)
      ).filter((x)=> !data.trainingFacilitators?.some((y)=> x.employeeBadge === y.employeeBadge));

      const departments = await getAllDepartments();
      const providers = await getAllTrainingProviders();

      setList({
        users: availableUsers,
        departments: departments,
        providers: providers.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      });
      setFilteredList({
        users: availableUsers,
        departments: departments,
        providers: providers.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
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
    console.log(data)
    if(participants.trainees!== data && currentSelected === "trainees"){
      setParticipants((prev)=>({...prev, trainees: data }));
    }else if(participants.facilitators!== data && currentSelected === "facilitators"){
      setParticipants((prev)=>({...prev, facilitators: data }));
    }
    //console.log(participants)
  };

  const checkUser = () => {
    console.log(currentSelected)
    if(currentSelected === "trainees"){
    if (participants?.trainees != null) {
      const newParticipants = participants.trainees.filter(
        (x) => !data?.trainingParticipants?.some((y) => x.employeeBadge === y.employeeBadge)
      );

      setFormData({
        ...data,
        trainingParticipants: [
          ...data.trainingParticipants,
          ...newParticipants,
        ],
      });
    }}
    else if(currentSelected === "facilitators"){
      
    if (participants?.facilitators != null) {
      const newParticipants = participants.facilitators.filter(
        (x) => !data?.trainingFacilitators?.some((y) => x.employeeBadge === y.employeeBadge)
      );

      setFormData({
        ...data,
        trainingFacilitators: [
          ...data.trainingFacilitators,
          ...newParticipants,
        ],
      });
    }}
    
  };

  const removerParticipant = (type, employeeBadge) => {
    setFormData({
      ...data,
      [type]: data[type].filter((obj) => obj.employeeBadge !== employeeBadge),
    });
  };
  const bodyContent = (
    <>
      {" "}
      <SearchBar handleOnInput={onGlobalFilterChange}  options={list.departments} />
      <div
        className="overflow-auto max-vh-100 mt-2"
        style={{ maxHeight: "calc(100vh - 275px)" }}
      >
        <UserList
          leadingElement={true}
          userlist={currentSelected === "facilitators" ? filteredList.users.filter((x)=> x.roleName === "Facilitator") :filteredList.users}
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
      {data.trainingParticipants?.length > 0 ? (
        <>
          <span className="d-flex justify-content-between">
            <span className="text-muted">
              {data.trainingParticipants.length} participants
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
            action={(e) => removerParticipant("trainingParticipants", e)}
          />
        </>
      ) : (
        <EmptyState
          placeholder="No participants added yet, please click to add."
          action={()=>handleShow("trainees")}
        />
      )}

      <div className="mt-4"></div>
      <SectionHeading
        title="Training faciltator"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      {data.trainingFacilitators.length > 0 ? (
        <>
          <span className="d-flex justify-content-between">
            <span className="text-muted">
              {data.trainingFacilitators.length} participants
            </span>
            <ActionButton
              variant={{ size: "btn-sm" }}
              title="Add Participant"
              onClick={()=>handleShow("facilitators")}
            />
          </span>
          <UserList
            leadingElement={true}
            userlist={data.trainingFacilitators}
            trailingElement={{ action: true }}
            col="3"
            property={"name"}
            action={(e) => removerParticipant("trainingFacilitators", e)}
          />
        </>
      ) : (
        <EmptyState
          placeholder="Click to add facilitator."
          action={()=>handleShow("facilitators")}
        />
      )}

      <div className="mt-4"></div>
      <SectionHeading
        title="Training Provider"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      <FormFieldItem
        col="col-12"
        FieldComponent={
          <Select
            value={list.providers.filter(
              (x) => x.value === data.trainingProviderId
            )}
            options={list.providers}
            onChange={(e)=>setFormData((obj) => ({ ...obj, trainingProviderId: e.value }))}
          />
        }
      />
      <ModalContainer
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
      />
    </>
  );
};
TrainingParticipant.propTypes = {
  formData: proptype.object,
  handleResponse: proptype.func,
};
export default TrainingParticipant;
