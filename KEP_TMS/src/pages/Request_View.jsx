import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TMS_Header from "../components/General/Header";
import RenderLayout from "../components/General/Layout";
import { RequestMenu } from "../components/TrainingDetails/Menu";
import { SectionHeading } from "../components/General/Section.jsx";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TDOverview from "../components/TrainingDetails/TDetOverview.jsx";
import TScheduleOverview from "../components/TrainingDetails/TSchedOverview.jsx";
import { GetSchedule, SampleStringList } from "../services/getApis.jsx";
import { TabHeader } from "../components/General/Tab.jsx";

const Content = () => {
  
  return (
    <>
      <TMS_Header title={"Training Detail"} />
      <div className="d-flex gap-3">
        <RequestMenu />
        <div className="flex-fill">
          <SectionHeading
            title="Overview"
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
          />
          <p>Here you can see the details of your training.</p>
          <TDOverview/>
          <TScheduleOverview schedule={GetSchedule()}/>
          <br />
          <TabHeader tablist={SampleStringList()} activeItem={"Apple"}/>
        </div>
      </div>
    </>
  );
};
const RequestView = () => {
  return (
    <>
      <RenderLayout ActionComponent={Content} />
    </>
  );
};
export default RequestView;
