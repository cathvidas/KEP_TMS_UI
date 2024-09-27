import { Col, Row } from "react-bootstrap";
import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types";
import ModuleItem from "../../components/TrainingPageComponents/ModuleItem";
import { UserList } from "../../components/List/UserList";
import { Column } from "primereact/column";
import StatusColor from "../../components/General/StatusColor";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
const ParticipantsView = ({ data }) => {
  const statusTemplate = (rowData) => {
    // return <>{StatusColor("Pending", "", {}, true)}</>
    return (
      <>
        <Button text icon="pi pi-pencil" />
        <Button text icon="pi pi-trash" severity="danger" />
      </>
    );
  };
  console.log(data);
  const handleRemove =()=>{
    ""
  }
  return (
    <>
      <SectionHeading
        title="Participants"
        icon={<i className="pi pi-users"></i>}
      />
      <UserList
        userlist={data}
        handleParticipants={""}
        trailingElement={{ action: true }}
      />
    </>
  );
};
ParticipantsView.propTypes = {
  data: proptype.array,
};
export default ParticipantsView;
