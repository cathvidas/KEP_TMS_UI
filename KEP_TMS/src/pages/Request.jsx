import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TrainingRequestForm } from "../components/forms/TrainingRequestForm";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";

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

  return <Layout BodyComponent={Content} header={{title: "Training Request", icon: <FontAwesomeIcon icon={faStickyNote} />, hide: true}} />;
};
export default NewRequest;
