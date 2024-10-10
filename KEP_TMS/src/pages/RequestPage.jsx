import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { statusCode } from "../api/constants.jsx";
import OverviewSection from "./RequestPageSection/OverviewSection.jsx";
import ModuleSection from "./RequestPageSection/ModuleSection.jsx";
import ExamSection from "./RequestPageSection/ExamSection.jsx";
import trainingRequestHook from "../hooks/trainingRequestHook.jsx";
import TraineeReportView from "./TrainingPageSection/TraineeReportView.jsx";
import SkeletonList from "../components/Skeleton/SkeletonList.jsx";
import MenuContainer from "../components/menus/MenuContainer.jsx";
import MenuItemTemplate from "../components/General/MenuItemTemplate.jsx";
import { SessionGetEmployeeId } from "../services/sessions.jsx";
import { actionSuccessful, confirmAction } from "../services/sweetalert.jsx";
import handleResponseAsync from "../services/handleResponseAsync.jsx";
import trainingRequestService from "../services/trainingRequestService.jsx";
import { Button } from "primereact/button";

const TrainingRequestPage = () => {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const { data, error, loading } = trainingRequestHook.useTrainingRequest(
    parseInt(id)
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
                template: MenuItemTemplate
                
            },
            {
                label: 'Modules',
                icon: 'pi pi-folder',
                command: () => navigate(`/KEP_TMS/TrainingRequest/${data.id}/Modules`),
                template: MenuItemTemplate
            },
            {
                label: 'Questionnaire',
                icon: 'pi pi-list-check',
                command: () => navigate(`/KEP_TMS/TrainingRequest/${data.id}/Exams`),
                template: MenuItemTemplate
            }
        ]
    },
];
  const Content = () => {
    const pages = [
      <>
        <OverviewSection data={data}/>
      </>,
      <>
        <ModuleSection data={data}/>
      </>,
      <>
        <ExamSection data={data}/>
      </>,
      <>
      <TraineeReportView/>
      </>
    ];
    const [currentContent, setCurrentContent] = useState();
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
    }, [page]);
    const handlePublish = () => {
      const newData = {requestId: data.id,
        employeeBadge: SessionGetEmployeeId(),
        statusId: statusCode.PUBLISHED,
        updatedBy: SessionGetEmployeeId()
      }
      confirmAction({title: "Publish Training Request", text: "Are you sure you want to publish this training request?", confirmButtonText: "Publish",
        onConfirm: ()=>{
          handleResponseAsync(
            ()=>trainingRequestService.approveTrainingRequest(newData),
            (e)=>actionSuccessful("Training request published successfully",e.message),
            (error)=>console.error("Error publishing training request: ", error)
          )
        }
      })
      // actionSuccessful("ahsd")
    
    }
    return (
      <>  <div className={`d-flex g-0`}>
        {/* <div className={`row g-0`}> */}
          {data.status?.id === statusCode.APPROVED && (<>
            <MenuContainer itemList={items} action={ <Button type="button" label="Publish" size="small" severity="info" className="rounded py-1 ms-3" onClick={handlePublish}/>}/>
           
            </>
            // <RequestMenu current={currentContent} reqId={data.id} />
          )}
          <div
            className={`${
              data.status?.id === statusCode.APPROVED && "border-start"
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
