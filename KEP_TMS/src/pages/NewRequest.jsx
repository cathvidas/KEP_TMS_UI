import { ActionButton } from "../components/Button";
import { FormContainer } from "../components/Form";
import TMS_Header from "../components/Header";
import RenderLayout from "../components/Layout";
import { SectionBanner, SectionTitle } from "../components/Section";
import RTable from "../components/Table";

const NewRequest = () => {
  const Content = () => {
    return(
    <>
      <TMS_Header title="das" />
      <SectionBanner title="Add request" subtitle={"I don "} />
      <SectionTitle title={"Recent Trainings"} ViewAll={"View All"} />
      <FormContainer/>
    </>)
  }

  return <RenderLayout ActionComponent={Content} />
};
export default NewRequest;
