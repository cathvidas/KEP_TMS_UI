import { Card, CardBody, Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { Badge } from "primereact/badge";
import { TabPanel, TabView } from "primereact/tabview";
import userHook from "../../hooks/userHook";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import CommonTable from "../../components/General/CommonTable";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import {
  formatDateTime,
  GenerateTrainingDates,
} from "../../utils/datetime/Formatting";
import { useState } from "react";
import { Button } from "primereact/button";
import CertificateTemplate from "../../components/certificate/CertificateTemplate";
import CertificatesList from "../../components/certificate/CertificatesList";
import { APP_DOMAIN, SearchValueConstant, UserTypeValue } from "../../api/constants";
import NewUserForm from "../../components/forms/ModalForms/NewUserForm";
import mapUserUpdateDetail from "../../services/DataMapping/mapUserUpdateDetails";
import oldTrainingsHook from "../../hooks/oldTrainingsHook";
import { ButtonGroup } from "primereact/buttongroup";
import { useNavigate } from "react-router-dom";
export const DetailItem = (data) => (
  <>
    <div className="flex py-1">
      <h6 className={`mb-0 fw-bold ${data?.className}`}>{data.label}:</h6>
      {data?.loading ? <i className="pi pi-spin pi-spinner text-muted"></i>: <>
      {data.value && <span>{data.value}</span>}
      {data.user && <span>{userHook.useUserById(data.user)?.data?.fullname ?? data?.user}</span>}
      {data.badge && <Badge value={data.badge} />}</>}
    </div>
  </>
);
const UserDetailView = ({ id, adminList, isAdmin , options}) => {
  const [trigger, setTrigger] = useState(0);
  const { data, error, loading } = userHook.useUserById(id, trigger);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [isFacilitator, setIsFacilitator] = useState(false);
  const superiorName = userHook.useUserById(data?.superiorBadge)?.data?.fullname;
  const [isOldSystem, setIsOldSystem] = useState(false);
const oldTrainings = oldTrainingsHook.useUserOldTrainings(id, SearchValueConstant.ATTENDED);
const oldFacilitatedTrainings = oldTrainingsHook.useUserOldTrainings(id, SearchValueConstant.FACILITATED);
const newTrainings = trainingRequestHook.useTrainingsAttended(id);
const newFacilitatedTrainings = trainingRequestHook.useTrainingsFacilitated(id);const trainingSummary = userHook.useUserTotalAccumulatedHours(id);
const oldTrainingSummary = oldTrainingsHook.useOldTotalAccumulatedHours(id);
const navigate = useNavigate();const handleViewClick = (rowData) =>{
  let url = `${APP_DOMAIN}/`;
  if(isOldSystem){
    url+=`OldTrainingDetail/${rowData?.type}/${rowData?.id}`
  }else{
  url += `TrainingDetail/${rowData?.id}`;}
  navigate(url)
 }
  const columnItem = [
    {field: "id", header: "Id", },
    // {field: "id", header: "", body: (_, {rowIndex})=><>{((attendedTrainingsConfig?.page- 1) * 10) + (rowIndex+1)}</>},
    { field: "type", header: "Type" },
    { field: "program", header: "Program" },
    { field: "requesterName", header: "Provider", 
      body: (rowData) => <>{rowData?.trainingProvider?.name ?? "Knowles Electronics (Philippines) Corporation"}</>, },
    {
      field: "requesterName",
      header: "Training Dates",
      body: (rowData) => <>{GenerateTrainingDates(rowData.trainingDates)}</>,
    },
    { field: "durationInHours", header: "Total Hours", body: (rowData) => <>{Math.round(rowData?.durationInHours * 100) / 100}</> },
    { field: "totalParticipants", header: "Total Participants" },
  ];
  const ActionColumn = 
  { field: "totalParticipants", header: "Action", body: (rowData)=><><Button
    type="button"
    icon="pi pi-eye"
    size="small"
    severity="success"
    className="rounded"
    text
    onClick={() => handleViewClick(rowData)}
  /></>};
 const handleTabChange = (activeSystem) =>{
  setIsOldSystem(activeSystem)
 }
 const getplaceholder = (value) =>{
  return value > 0 ? `(${value})` : ""
 }
  const HeaderComponent = (prop)=> { 
    return(
    <>
      <ButtonGroup>
        <Button type="button" text={isOldSystem} label={`New Trainings ${getplaceholder(prop?.facilitator ? trainingSummary?.data?.totalTrainingsFacilitated : trainingSummary?.data?.totalTrainingsAttended)}`} onClick={()=>handleTabChange(false)} />
        <Button text={!isOldSystem} label={`Old Trainings ${getplaceholder(prop?.facilitator ? oldTrainingSummary?.data?.totalTrainingsFacilitated : oldTrainingSummary?.data?.totalTrainingsAttended)}`} onClick={()=>handleTabChange(true)} />
        {(isAdmin && (!(isFacilitator ? (newFacilitatedTrainings?.loading || oldFacilitatedTrainings?.loading) : (newTrainings?.loading || oldTrainings?.loading)))) &&
        <Button
        severity="help"
          type="button"
          label="Generate Certificate"
          icon="pi pi-download"
          onClick={() => {
            setShowCertForm(true);
            setIsFacilitator(prop?.facilitator);
          }}
          text
        />}
      </ButtonGroup>
    </>
  );}
  return (
    <>
      {!showCertForm ? (
        <>
          {loading ? (
            <SkeletonBanner />
          ) : error ? (
            <h1>error</h1>
          ) : (
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <h5 className="theme-color">User Details</h5>
                    <hr />
                    <DetailItem label="BadgeNo" value={data?.employeeBadge} />
                    <DetailItem label="Name" value={data?.fullname} />
                    <DetailItem label="NTName" value={data?.username} />
                    <DetailItem label="Position" value={data?.position} />
                    <DetailItem
                      label="Department"
                      value={data?.departmentName}
                    />
                    <DetailItem label="Email" value={data?.email} />
                    <DetailItem label="User Type" value={data?.roleName} />
                    <DetailItem
                      label="Immediate Superior"
                      value={superiorName}
                    />
                    <DetailItem label="Status" value={data?.statusName} />
                    {/* <DetailItem label="Password" value={data?.password} /> */}
                    <DetailItem label="Created By" user={data?.createdBy} />
                    <DetailItem
                      label="Created Date"
                      value={formatDateTime(data?.createdDate)}
                    />
                    <DetailItem
                      label="Updated By"
                      user={data?.updatedBy ?? "N/A"}
                    />
                    <DetailItem
                      label="Updated Date"
                      value={
                        data?.updatedDate
                          ? formatDateTime(data?.updatedDate)
                          : "N/A"
                      }
                    />
                    {isAdmin && (
                      <Button
                        type="button"
                        icon="pi pi-user-edit"
                        size="small"
                        text
                        label="Edit"
                        onClick={() => setShowUpdateForm(true)}
                      />
                    )}
                  </Col>
                  <Col className="border-start">
                    <h5 className="theme-color">Training Summary</h5>
                    <hr />
                    <h6 className="theme-color fw-bold">Trainings Attended:</h6>
                    <DetailItem
                      label="No of Trainings"
                      badge={trainingSummary?.data?.totalTrainingsAttended + oldTrainingSummary?.data?.totalTrainingsAttended}
                      className="text-muted"
                      loading={trainingSummary?.loading || oldTrainingSummary?.loading}
                    />
                    <DetailItem
                      label="Total Accumulated Hours"
                      badge={Math.round((trainingSummary?.data?.totalHoursAttended + oldTrainingSummary?.data?.totalHoursAttended) * 100) / 100}
                      className="text-muted"
                      loading={trainingSummary?.loading || oldTrainingSummary?.loading}
                    />
                    <br />
                    <h6 className="theme-color fw-bold">
                      Trainings Facilitated:
                    </h6>
                    <DetailItem
                      label="No of Trainings"
                      badge={trainingSummary?.data?.totalTrainingsFacilitated + oldTrainingSummary?.data?.totalTrainingsFacilitated}
                      className="text-muted"
                      loading={trainingSummary?.loading || oldTrainingSummary?.loading}
                    />
                    <DetailItem
                      label="Total Accumulated Hours"
                      badge={Math.round((trainingSummary?.data?.totalHoursFacilitated + oldTrainingSummary?.data?.totalHoursFacilitated) * 100) / 100}
                      className="text-muted"
                      loading={trainingSummary?.loading || oldTrainingSummary?.loading}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )}
          <br />
          <Card>
            <CardBody>
              <Row>
                <TabView className="custom-tab">
                  <TabPanel header={"Trainings Attended"}>
                        <CommonTable
                          hideOnEmpty={false}
                          emptyMessage={isOldSystem ? oldTrainings?.error : newTrainings?.error}
                          loading={isOldSystem ? oldTrainings?.loading : newTrainings?.loading}
                          headerComponent={<HeaderComponent/>}
                          dataTable={mapTRequestToTableData(
                            isOldSystem ? oldTrainings?.data : newTrainings?.data
                          )}
                          columnItems={[...columnItem, ActionColumn]}
                        />
                  </TabPanel>
                  {(trainingSummary?.data?.totalTrainingsFacilitated + oldTrainingSummary?.data?.totalTrainingsFacilitated > 0 ||
                    data?.roleName === UserTypeValue.FACILITATOR) && (
                    <TabPanel header={"Trainings Facilitated"}>
                      <CommonTable
                        headerComponent={<HeaderComponent facilitator/>}
                        dataTable={mapTRequestToTableData(isOldSystem ? oldFacilitatedTrainings?.data :
                          newFacilitatedTrainings?.data
                        )}
                        columnItems={[
                          ...columnItem,
                          {
                            header: "Evaluation Ratings",
                            body: (rowData) => (<>{isOldSystem ? oldTrainingsHook.useOldFacilitatorRating(id, rowData?.id) : trainingRequestHook.useFacilitatorRating(id, rowData?.id)}</>
                            ),
                          }, ActionColumn
                        ]}
                        hideOnEmpty={false}
                      />
                    </TabPanel>
                    )} 
                  <TabPanel header={"Certificates"}>
                    <CertificatesList
                      userId={id}
                    />
                  </TabPanel>
                </TabView>
              </Row>
            </CardBody>
          </Card>
        </>
      ) : (
        <Card>
          <CardBody>
            <div className="flex justify-content-between">
              <h5 className="theme-color m-0">Generate Training Certificate</h5>
              <Button
                type="button"
                icon="pi pi-times"
                text
                onClick={() => setShowCertForm(false)}
              />
            </div>
            <CertificateTemplate
              trainings={ isFacilitator ? oldFacilitatedTrainings?.data?.concat(newFacilitatedTrainings?.data) : oldTrainings?.data?.concat(newTrainings?.data)}
              isFacilitator={isFacilitator}
              signatoryList={adminList}
              userDetail={data}
            />
          </CardBody>
        </Card>
      )}

      <NewUserForm
        showForm={showUpdateForm}
        closeForm={setShowUpdateForm}
        options={options}
        defaultData={mapUserUpdateDetail(data, options?.options)}
        headerTitle={"Update User Details"}
        isUpdate
        onFinish={() => {
          setTrigger((prev) => prev + 1);
          setShowUpdateForm(false);
        }}
      />
    </>
  );
};
UserDetailView.propTypes = {
  id: proptype.string, // User Data
  adminList: proptype.array,
  isAdmin: proptype.bool,
  options: proptype.object,
};
export default UserDetailView;
