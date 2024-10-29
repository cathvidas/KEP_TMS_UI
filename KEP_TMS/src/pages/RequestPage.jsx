import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { statusCode, UserTypeValue } from "../api/constants.jsx";
import OverviewSection from "./RequestPageSection/OverviewSection.jsx";
import ModuleSection from "./RequestPageSection/ModuleSection.jsx";
import ExamSection from "./RequestPageSection/ExamSection.jsx";
import trainingRequestHook from "../hooks/trainingRequestHook.jsx";
import TraineeReportView from "./TrainingPageSection/TraineeReportView.jsx";
import SkeletonList from "../components/Skeleton/SkeletonList.jsx";
import MenuContainer from "../components/menus/MenuContainer.jsx";
import MenuItemTemplate from "../components/General/MenuItemTemplate.jsx";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions.jsx";
import { actionSuccessful, confirmAction } from "../services/sweetalert.jsx";
import handleResponseAsync from "../services/handleResponseAsync.jsx";
import trainingRequestService from "../services/trainingRequestService.jsx";
import { Button } from "primereact/button";
import { validateTrainingRequestForm } from "../services/inputValidation/validateTrainingRequestForm.jsx";
import activityLogHook from "../hooks/activityLogHook.jsx";

const TrainingRequestPage = () => {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const { data, loading } = trainingRequestHook.useTrainingRequest(
    parseInt(id)
  );
  const [currentContent, setCurrentContent] = useState();
  
  const trainingForms = trainingRequestHook.useAllParticipantsReports(
    data?.trainingParticipants ?? []
  );
  const logs = activityLogHook.useTrainingRequestActivityLogs(
    data
  );
  const items = [
    {
        label: 'Menu',
        items: [
          { separator: true, template: MenuItemTemplate },
            {
                label: 'Overview',
                icon: 'pi pi-info-circle',
                command: () => navigate(`/KEP_TMS/TrainingRequest/${data.id}`),
                template: MenuItemTemplate,
                active: currentContent === 0? true : false,
                
            },
            {
                label: 'Modules',
                icon: 'pi pi-folder',
                command: () => navigate(`/KEP_TMS/TrainingRequest/${data.id}/Modules`),
                template: MenuItemTemplate,
                active: currentContent === 1? true : false,
            },
            {
                label: 'Questionnaire',
                icon: 'pi pi-list-check',
                command: () => navigate(`/KEP_TMS/TrainingRequest/${data.id}/Exams`),
                template: MenuItemTemplate,
                active: currentContent === 2? true : false,
            }
        ]
    },
];
const checkIfFacilitator= ()=>{
 return data?.trainingFacilitators?.some(f=>f.employeeBadge=== SessionGetEmployeeId());
}
  const Content = () => {
    const pages = [
      <>
        <OverviewSection
          data={data}
          showParticipants
          showFacilitators
          showApprovers={
            SessionGetRole() === UserTypeValue.ADMIN ||
            SessionGetRole() === UserTypeValue.SUPER_ADMIN ||
            SessionGetEmployeeId() === data?.requestorBadge
              ? true
              : false
          }
          logs={logs}
        />
      </>,
      <>
        <ModuleSection data={data} />
      </>,
      <>
        <ExamSection data={data} />
      </>,
      <>
        <TraineeReportView />
      </>,
    ];
    useEffect(() => {
      if (page === "Modules") {
        setCurrentContent(1);
      } else if (page === "Exams") {
        setCurrentContent(2);
      } else if (page === "Report"){
        setCurrentContent(3)
      }
       else {
        setCurrentContent(0);
      }
    }, []);
    const handlePublish = () => {
      const newData = {...validateTrainingRequestForm(data),
        statusId: statusCode.PUBLISHED,
        updatedBy: SessionGetEmployeeId()
      }
      confirmAction({title: "Publish Training Request", text: "Are you sure you want to publish this training request?", confirmButtonText: "Publish",
        onConfirm: ()=>{
          handleResponseAsync(
            ()=>trainingRequestService.updateTrainingRequest(newData),
            (e)=>actionSuccessful("Training request published successfully",e.message),
            (error)=>console.error("Error publishing training request: ", error),
            ()=>navigate(`/KEP_TMS/Training/${data?.id}`)
          )
        }
      })
    }
    const isNotPublished = ()=>{
      return data?.status?.id !== statusCode.FORAPPROVAL || data?.status?.id !== statusCode.SUBMITTED;
    }
    const showMenu = ()=>{
      return data.status?.id === statusCode.APPROVED && (checkIfFacilitator() === true || SessionGetRole() === UserTypeValue.ADMIN || SessionGetRole() === UserTypeValue.SUPER_ADMIN) || checkIfFacilitator()
    }
    return (
      <>  <div className={`d-flex g-0`}>
          {showMenu() && (<>
            <MenuContainer itemList={items} action={ 
              <Button type="button" label="Publish" size="small" severity="info" className="rounded py-1 ms-3" onClick={handlePublish}/>
              } isPublished={isNotPublished()}/>
            </>
          )}
          <div
            className={`${
              showMenu() && "border-start"
            } p-3 pb-5 col`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            {loading ? <SkeletonList/> : pages[currentContent]}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Layout
        BodyComponent={Content}
        header={{
          title: "Request Detail",
          icon: <FontAwesomeIcon icon={faFile} />,
        }}
      />
    </>
  );
};
export default TrainingRequestPage;
