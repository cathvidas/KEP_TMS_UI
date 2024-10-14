import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types";
import { UserList } from "../../components/List/UserList";
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
  return (
    <>
      <SectionHeading
        title="Participants"
        icon={<i className="pi pi-users"></i>}
      />
      <UserList
        userlist={data}
        handleParticipants={""}
        // trailingElement={{ action: true }}
        scrollHeight={"100%"}
        sortable
      />
    </>
  );
};
ParticipantsView.propTypes = {
  data: proptype.array,
};
export default ParticipantsView;
