import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionButton } from "../components/Button";
import { FormContainer } from "../components/Form";
import TMS_Header from "../components/Header";
import RenderLayout from "../components/Layout";
import { SectionBanner, SectionTitle } from "../components/Section";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

const NewRequest = () => {
  const action = () => (
    <>
      <ActionButton
        title="Request Training"
        toggle={{ Item: "modal", Target: "#TRtype" }}
        variant={{ size: "btn-sm" }}
      />
      <ActionButton
        title="View All Request"
        actionLink="/Newrequest"
        variant={{ brand: "secondary", size: "btn-sm" }}
      />
    </>
  );
  const Content = () => {
    return (
      <>
        <TMS_Header title="Training Request" IconComponent={<FontAwesomeIcon icon={faStickyNote}/>}/>
        <SectionBanner
          title="Training Requests || Add Request"
          subtitle={"To add a new training request, fill out the form with the course name, desired date, and any special requirements. Click 'Submit' to finalize your request."}
          // ActionComponents={action}
        />
        <SectionTitle title={"Recent Trainings"} ViewAll={"View All"} />
        <FormContainer />
      </>
    );
  };

  return <RenderLayout ActionComponent={Content} />;
};
export default NewRequest;
