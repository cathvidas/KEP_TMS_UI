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
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import CertificateTemplate from "../../components/certificate/CertificateTemplate";
import CertificatesList from "../../components/certificate/CertificatesList";
import { SearchValueConstant, UserTypeValue } from "../../api/constants";
import ErrorTemplate from "../../components/General/ErrorTemplate";
import handleResponseAsync from "../../services/handleResponseAsync";
import commonService from "../../services/commonService";
import NewUserForm from "../../components/forms/ModalForms/NewUserForm";
import mapUserUpdateDetail from "../../services/DataMapping/mapUserUpdateDetails";
import { Paginator } from "primereact/paginator";
const DetailItem = (data) => (
  <>
    <div className="flex py-1">
      <h6 className={`mb-0 fw-bold ${data?.className}`}>{data.label}:</h6>
      {data.value && <span>{data.value}</span>}
      {data.user && <span>{userHook.useUserById(data.user)?.data?.fullname ?? data?.user}</span>}
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
          (e) => setData(e ? Math.round(e * 100) / 100 : e
        ),
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
  const [showCertForm, setShowCertForm] = useState(false);
  const [isFacilitator, setIsFacilitator] = useState(false);
  const superiorName = userHook.useUserById(data?.superiorBadge)?.data?.fullname;
  const [attendedTrainingsConfig, setAttendedTrainingsConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: "",
  });  
  const [facilitatedTrainingsConfig, setFacilitatedTrainingsConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: "",
  });
const attendedTrainings = trainingRequestHook.usePagedTrainingRequest(attendedTrainingsConfig.page, attendedTrainingsConfig.rows, SearchValueConstant.ATTENDED, id, attendedTrainingsConfig.value);
const facilitatedTrainings = trainingRequestHook.usePagedTrainingRequest(attendedTrainingsConfig.page, attendedTrainingsConfig.rows, SearchValueConstant.FACILITATED, id, attendedTrainingsConfig.value);
const stackedTrainings = trainingRequestHook.usePagedTrainingRequest(1, 1000, isFacilitator ? SearchValueConstant.FACILITATED : SearchValueConstant.ATTENDED, id);
const trainingSummary = userHook.useUserTotalAccumulatedHours(id);
  const columnItem = [
    {field: "id", header: "Request #", },
    { field: "program", header: "Program" },
    { field: "requesterName", header: "Provider", 
      body: (rowData) => <>{rowData?.trainingProvider?.name ?? "Knowles Electronics (Philippines) Corporation"}</>, },
    {
      field: "requesterName",
      header: "Training Dates",
      body: (rowData) => <>{GenerateTrainingDates(rowData.trainingDates)}</>,
    },
    { field: "durationInHours", header: "Total Hours" },
    { field: "totalParticipants", header: "Total Participants" },
  ];
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
                  <DetailItem label="Immediate Superior" value={superiorName} />
                  <DetailItem label="Status" value={data?.statusName} />
                  {/* <DetailItem label="Password" value={data?.password} /> */}
                  <DetailItem label="Created By" user={data?.createdBy} />
                  <DetailItem label="Created Date" value={formatDateTime(data?.createdDate)} />
                  <DetailItem label="Updated By" user={data?.updatedBy ?? "N/A"} />
                  <DetailItem label="Updated Date" value={data?.updatedDate ? formatDateTime(data?.updatedDate) : 'N/A'} />
               {isAdmin &&  <Button type="button" icon="pi pi-user-edit" size="small" text label="Edit" onClick={() => setShowUpdateForm(true)}/>}
                </Col>
                <Col className="border-start">
                  <h5 className="theme-color">Training Summary</h5>
                  <hr />
                  <h6 className="theme-color fw-bold">Trainings Attended:</h6>
                  <DetailItem
                    label="No of Trainings"
                    badge={attendedTrainings?.data?.totalRecords}
                    className="text-muted"
                  />
                  <DetailItem
                    label="Total Accumulated Hours"
                    badge={trainingSummary?.data?.totalHoursAttended}
                    className="text-muted"
                  />
                  <br />
                  <h6 className="theme-color fw-bold">Trainings Facilitated:</h6>
                  <DetailItem
                    label="No of Trainings"
                    badge={facilitatedTrainings?.data?.totalRecords}
                    className="text-muted"
                  />
                  <DetailItem
                    label="Total Accumulated Hours"
                    badge={trainingSummary?.data?.totalHoursFacilitated}
                    className="text-muted"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <br />
          <Card>
            <CardBody>
                <Row>
                  <TabView className="custom-tab">
                    <TabPanel header={"Trainings Attended"}>
                      <CommonTable
                      hidePaginator
                      headerComponent={
                         isAdmin ?
                          <Button
                            type="button"
                            label="Generate Certificate"
                            icon="pi pi-download"
                            onClick={() => {setShowCertForm(true);
                              setIsFacilitator(false)
                            }}
                            text
                          />
                        : null}
                        dataTable={mapTRequestToTableData(
                          attendedTrainings?.data?.results
                        )}
                        columnItems={columnItem}
                      />
                      <Paginator
                        first={attendedTrainingsConfig?.first ?? 1}
                        pageLinkSize={5}
                        rows={attendedTrainingsConfig.rows}
                        totalRecords={attendedTrainings?.data?.totalRecords}
                        rowsPerPageOptions={[10, 20, 30, 50, 100]}
                        onPageChange={(e) =>
                          setAttendedTrainingsConfig((prev) => ({
                            ...prev,
                            first: e.first,
                            rows: e.rows,
                            page: e.page + 1,
                          }))
                        }
                      />
                    </TabPanel>
                    {(facilitatedTrainings?.data?.totalRecords > 0 || data?.roleName === UserTypeValue.FACILITATOR) &&
                    <TabPanel header={"Trainings Facilitated"}>
                      <CommonTable
                      hidePaginator
                      headerComponent={
                         isAdmin ?
                          <Button
                            type="button"
                            label="Generate Certificate"
                            icon="pi pi-download"
                            onClick={() => {setShowCertForm(true);
                              setIsFacilitator(true)
                            }}
                            text
                          />
                        : null}
                        dataTable={mapTRequestToTableData(
                          facilitatedTrainings?.data?.results
                        )}
                        columnItems={[...columnItem, {header: "Evaluation Ratings", body: (rowData)=><AverageRateTemplate reqId={rowData?.id} userId={id}/>}]}
                      />
                      <Paginator
                        first={facilitatedTrainingsConfig?.first ?? 1}
                        pageLinkSize={5}
                        rows={facilitatedTrainingsConfig.rows}
                        totalRecords={facilitatedTrainings?.data?.totalRecords}
                        rowsPerPageOptions={[10, 20, 30, 50, 100]}
                        onPageChange={(e) =>
                          setFacilitatedTrainingsConfig((prev) => ({
                            ...prev,
                            first: e.first,
                            rows: e.rows,
                            page: e.page + 1,
                          }))
                        }
                      />
                    </TabPanel>}
                    <TabPanel header={"Certificates"}>
                      <CertificatesList
                        userId={id}
                        trainings={stackedTrainings?.data?.results}
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
              trainings={stackedTrainings?.data?.results}
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
