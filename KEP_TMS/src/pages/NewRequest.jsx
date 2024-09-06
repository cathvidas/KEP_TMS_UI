import { ActionButton } from "../components/Button";
import { FormContainer } from "../components/Form";
import TMS_Header from "../components/Header";
import RenderLayout from "../components/Layout";
import { SectionBanner, SectionTitle } from "../components/Section";

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
        <TMS_Header title="das" />
        <SectionBanner
          title="Add request"
          subtitle={"I don "}
          ActionComponents={action}
        />
        <SectionTitle title={"Recent Trainings"} ViewAll={"View All"} />
        <FormContainer />
      </>
    );
  };

  return <RenderLayout ActionComponent={Content} />;
};
export default NewRequest;
