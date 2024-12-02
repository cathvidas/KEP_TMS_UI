import { Button } from "primereact/button";
import ExamDetails from "../../components/Exam/ExamDetails";
import CommonTable from "../../components/General/CommonTable";
import StatusColor from "../../components/General/StatusColor";
import getTraineeExamDetail from "../../services/common/getTraineeExamDetail";
import proptype from "prop-types";
import GeneralEmailTemplate from "../../components/email/GeneralEmailTemplate";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { SectionHeading } from "../../components/General/Section";
import { ActivityType } from "../../api/constants";

const MonitoringExamView = ({ requestData, examList, onRefresh }) => {
    
  const [showForm, setShowForm] = useState(false);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const columnItems = [
    {
      field: "id",
      header: "No",
      body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "employeeBadge",
      header: "Badge No",
      body: (rowData) => <>{rowData?.userDetail?.employeeBadge}</>,
    },
    {
      field: "fullname",
      header: "Name",
      body: (rowData) => <>{rowData?.userDetail?.fullname}</>,
    },
    {
      field: "position",
      header: "Position",
      body: (rowData) => <>{rowData?.userDetail?.position}</>,
    },
    {
      field: "department",
      header: "Department",
      body: (rowData) => <>{rowData?.userDetail?.departmentName}</>,
    },
  ];

  const examColumnTemplate = (rowData, item) => {
    return (
      <>
        {getTraineeExamDetail(item, rowData?.userDetail?.employeeBadge)
          ?.submitted
          ? `${
              getTraineeExamDetail(item, rowData?.userDetail?.employeeBadge)
                ?.detail[0]?.totalScore
            }/${item?.examDetail?.questionLimit}`
          : StatusColor({
              status: "Pending",
              showStatus: true,
            })}
      </>
    );
  };
  const addcolumns = () => {
    if (examList) {
      examList?.map((item, index) => {
        columnItems.push({
          field: "",
          header: `Exam${index + 1} Score`,
          body: (rowData) => <>{examColumnTemplate(rowData, item)}</>,
        });
      });
    }
  };
  
  const HeaderComponent = () => {
    return (
      <>
        <Button
          label="Send Follow-up Email"
          icon="pi pi-send"
          type="button"
          size="small"
          className="rounded"
          onClick={() => setShowEmailTemplate(true)}
        />
      </>
    );
  };
  addcolumns();
  return(
    <>
      {!showForm ? (
        <>
          {showEmailTemplate ? (
            <GeneralEmailTemplate
              requestData={requestData}
              reportType={"examdetail"}
              typeId={ActivityType.EXAM}
              onClose={() => setShowEmailTemplate(false)}
              onRefresh={onRefresh}
            />
          ) : (
            <>
              <div className="flex justify-content-between">
                {" "}
                <SectionHeading
                  title={`Training Exam Monitoring`}
                  icon={<i className="pi pi-clock"></i>}
                />
              </div>

              <CommonTable
                headerComponent={<HeaderComponent />}
                dataTable={examList}
                columnItems={columnItems}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Card>
            <Card.Header className="text-end">
              <Button
                type="button"
                icon="pi pi-times"
                size="small"
                text
                className="rounded-circle"
                onClick={() => setShowForm(false)}
              />
            </Card.Header>
            {examList ? (
              <>
                <div className="d-flex flex-column">
                  {selectedData?.exam?.map((item, index) => (
                    <>
                      <ExamDetails
                        traineeExam={
                          getTraineeExamDetail(
                            item,
                            selectedData?.user
                          )?.detail
                        }
                        refreshData={onRefresh}
                        examDetail={item?.examDetail}
                        isAdmin
                      />
                      {index < selectedData?.exam?.length - 1 && (
                        <hr className="m-0" />
                      )}
                    </>
                  ))}
                </div>
              </>
            )  : (
              <div className="text-center py-5">No data available</div>
            )}
          </Card>
        </>
      )}{" "}
    </>)
};
MonitoringExamView.propTypes = {
  examList: proptype.array,
  onRefresh: proptype.func,
  requestData: proptype.object,
}
export default MonitoringExamView;