import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionButton } from "../components/General/Button";
import { FormContainer } from "../components/Form";
import TMS_Header from "../components/General/Header";
import RenderLayout from "../components/General/Layout";
import { SectionBanner } from "../components/General/Section";
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
        actionLink="/KEP_TMS/Newrequest"
        variant={{ theme: "secondary", size: "btn-sm" }}
      />
    </>
  );
  const Content = () => {
    return (
      <>
        <TMS_Header
          title="Training Request"
          IconComponent={<FontAwesomeIcon icon={faStickyNote} />}
        />
        <SectionBanner
          title="Training Requests || Add Request"
          subtitle={
            "To add a new training request, fill out the form with the course name, desired date, and any special requirements. Click 'Submit' to finalize your request."
          }
          //  ActionComponents={action}
        />
        <FormContainer />
      </>
    );
  };

  return <RenderLayout ActionComponent={Content} />;
};
export default NewRequest;
