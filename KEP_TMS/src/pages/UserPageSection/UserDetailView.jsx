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
  GenerateTrainingDates,
} from "../../utils/datetime/Formatting";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import CertificateTemplate from "../../components/certificate/CertificateTemplate";
import CertificatesList from "../../components/certificate/CertificatesList";
import { UserTypeValue } from "../../api/constants";
import ErrorTemplate from "../../components/General/ErrorTemplate";
import handleResponseAsync from "../../services/handleResponseAsync";
import commonService from "../../services/commonService";
import NewUserForm from "../../components/forms/ModalForms/NewUserForm";
import mapUserUpdateDetail from "../../services/DataMapping/mapUserUpdateDetails";
const DetailItem = (data) => (
  <>
    <div className="flex py-1">
      <h6 className={`mb-0 ${data?.className}`}>{data.label}:</h6>
      {data.value && <span>{data.value}</span>}
      {data.badge && <Badge value={data.badge} />}
    </div>
  </>
);
const AverageRateTemplate = ({ reqId, userId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      handleResponseAsync(() =>
        commonService.getFacilitatorRating(
          reqId,
          userId),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        )
    };
    fetchData();
  }, [reqId, userId]);
  return <>
  {loading ? error? <ErrorTemplate message={error}/> : <i className="pi pi-spinner pi-spin"></i>: <>{data ?? "No ratings Found"}</>}
  </>
};
const UserDetailView = ({ id, adminList, isAdmin , options}) => {
  const [trigger, setTrigger] = useState(0);
  const { data, error, loading } = userHook.useUserById(id, trigger);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const trainings = trainingRequestHook.useUserTrainingsSummary(id);
  const facilitated = trainingRequestHook.useTrainingRequestByFacilitatorId(id);
  const attended = trainingRequestHook.useTrainingRequestByTraineeId(id);
  const [showCertForm, setShowCertForm] = useState(false);
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [certificateTrainings, setCertificateTrainings] = useState([]);
  const columnItem = [
    {field: "id", header: "Request #", },
    { field: "requesterName", header: "Name", body: <>{data?.fullname}</> },
    { field: "program", header: "Program" },
    {
      field: "requesterName",
      header: "Training Dates",
      body: (rowData) => <>{GenerateTrainingDates(rowData.trainingDates)}</>,
    },
    { field: "durationInHours", header: "Total Hours" },
    { field: "totalParticipants", header: "Total Participants" },
  ];
  const countTotalHours = (trainings) => {
    let count = 0;
    trainings?.map((item) => {
      count += item?.durationInHours;
    });
    return count;
  };
  return (
    <>
      {loading ? (
        <SkeletonBanner />
      ) : error ? (
        <h1>error</h1>
      ) : !showCertForm ? (
        <>
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
                  <DetailItem label="Department" value={data?.departmentName} />
                  <DetailItem label="Email" value={data?.email} />
                  <DetailItem label="User Type" value={data?.roleName} />
                  <DetailItem label="Status" value={data?.statusName} />
                  <DetailItem label="Password" value={data?.password} />
                  <Button type="button" icon="pi pi-user-edit" size="small" text label="Edit" onClick={() => setShowUpdateForm(true)}/>
                </Col>
                <Col className="border-start">
                  <h5 className="theme-color">Training Summary</h5>
                  <hr />
                  <h6>Trainings Attended:</h6>
                  <DetailItem
                    label="No of Trainings"
                    badge={attended?.data?.length}
                    className="text-muted"
                  />
                  <DetailItem
                    label="Total Accumulated Hours"
                    badge={countTotalHours(attended?.data)}
                    className="text-muted"
                  />
                  <br />
                  <h6>Trainings Facilitated:</h6>
                  <DetailItem
                    label="No of Trainings"
                    badge={facilitated?.data?.length}
                    className="text-muted"
                  />
                  <DetailItem
                    label="Total Accumulated Hours"
                    badge={countTotalHours(facilitated?.data)}
                    className="text-muted"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <br />
          <Card>
            <CardBody>
              {trainings?.loading ? (
                <SkeletonDataTable />
              ) : (
                <Row>
                  <TabView className="custom-tab">
                    <TabPanel header={"Trainings Attended"}>
                      <CommonTable
                      headerComponent={
                         isAdmin ?
                          <Button
                            type="button"
                            label="Generate Certificate"
                            icon="pi pi-download"
                            onClick={() => {setShowCertForm(true);
                              setCertificateTrainings(attended?.data)
                              setIsFacilitator(false)
                            }}
                            text
                          />
                        : null}
                        dataTable={mapTRequestToTableData(
                          attended?.data
                        )}
                        columnItems={columnItem}
                      />
                    </TabPanel>
                    {(trainings?.data?.facilitated?.length > 0 || data?.roleName === UserTypeValue.FACILITATOR) &&
                    <TabPanel header={"Trainings Facilitated"}>
                      <CommonTable
                      headerComponent={
                         isAdmin ?
                          <Button
                            type="button"
                            label="Generate Certificate"
                            icon="pi pi-download"
                            onClick={() => {setShowCertForm(true);
                              setCertificateTrainings(facilitated?.data)
                              setIsFacilitator(true)
                            }}
                            text
                          />
                        : null}
                        dataTable={mapTRequestToTableData(
                          facilitated?.data
                        )}
                        columnItems={[...columnItem, {header: "Evaluation Ratings", body: (rowData)=><AverageRateTemplate reqId={rowData?.id} userId={id}/>}]}
                      />
                    </TabPanel>}
                    <TabPanel header={"Certificates"}>
                      <CertificatesList
                        userId={id}
                        trainings={certificateTrainings}
                      />
                    </TabPanel>
                  </TabView>
                </Row>
              )}
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
              trainings={certificateTrainings}
              isFacilitator={isFacilitator}
              signatoryList={adminList}
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
        onFinish={()=>{setTrigger(prev=>prev + 1);
          setShowUpdateForm(false);
        }}
      />
    </>
  );
};

AverageRateTemplate.propTypes = {
  reqId: proptype.number,
  userId: proptype.string,
}
UserDetailView.propTypes = {
  id: proptype.string, // User Data
  adminList: proptype.array,
  isAdmin: proptype.bool,
  options: proptype.object,
};
export default UserDetailView;
