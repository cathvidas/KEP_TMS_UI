import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionButton } from "../components/General/Button";
import { TrainingRequestForm } from "../components/forms/TrainingRequestForm";
import { SectionBanner } from "../components/General/Section";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/General/Header";
import Layout from "../components/General/Layout";
import { icon } from "@fortawesome/fontawesome-svg-core";

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
        actionLink="/KEP_TMS/Request"
        variant={{ theme: "secondary", size: "btn-sm" }}
      />
    </>
  );
  const Content = () => {
    return (
      <>
        <div className="w-100 p-3">
          {/* <SectionBanner
            title="Training Requests || Add Request"
            subtitle={
              "To add a new training request, fill out the form with the course name, desired date, and any special requirements. Click 'Submit' to finalize your request."
            }
            //  ActionComponents={action}
          /> */}
          <TrainingRequestForm />
        </div>
      </>
    );
  };

  return <Layout BodyComponent={Content} header={{title: "Training Request", icon: <FontAwesomeIcon icon={faStickyNote} />}} />;
};
export default NewRequest;
