import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionButton } from "../components/General/Button";
import { TrainingRequestForm } from "../components/forms/TrainingRequestForm";
import { SectionBanner } from "../components/General/Section";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/General/Header";
import Layout from "../components/General/Layout";
import { icon } from "@fortawesome/fontawesome-svg-core";

const NewRequest = () => {
  const Content = () => {
    return (
      <>
        <div className="w-100 p-3">
          <TrainingRequestForm />
        </div>
      </>
    );
  };

  return <Layout BodyComponent={Content} header={{title: "Training Request", icon: <FontAwesomeIcon icon={faStickyNote} />}} />;
};
export default NewRequest;
