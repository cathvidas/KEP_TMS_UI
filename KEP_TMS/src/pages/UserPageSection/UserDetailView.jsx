import { Card, CardBody, Col, Row } from "react-bootstrap";
import  proptype  from "prop-types";
import { Badge } from "primereact/badge";
import { SectionBanner } from "../../components/General/Section";
import { TabPanel, TabView } from "primereact/tabview";
import userHook from "../../hooks/userHook";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import CommonTable from "../../components/General/CommonTable";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import { formatCurrency, formatDateOnly } from "../../utils/datetime/Formatting";
const DetailItem = (data) => (
  <>
<div className="flex py-1">
    <h6 className={`mb-0 ${data?.className}`}>{data.label}:</h6>
    {data.value && <span>{data.value}</span>}
    {data.badge && <Badge value={data.badge}/>}
    </div>
  </>
);
const UserDetailView = ({id})=>{
    const {data, error, loading } = userHook.useUserById(id);
    const trainings = trainingRequestHook.useUserTrainingsSummary(id);
    const columnItem =[
        {field: "id", header: "No",body: (_, {rowIndex})=><>{rowIndex+1}</> },
        // {field: "id", header: "Id", },
        {field: "requestorName", header: "Requestor", },
        {field: "type", header: "Type", },
        {field: "program", header: "Program", },
        {field: "category", header: "Category",},
        {field: "provider", header: "Provider", },
        {field: "startDate", header: "Start Date", body: (rowData)=><>{formatDateOnly(rowData.startDate)}</> },
        {field: "endDate", header: "End Date", body: (rowData)=><>{formatDateOnly(rowData.endDate)}</> },
        {field: "venue", header: "Venue", },
        {field: "durationInHours", header: "Total Hours", },
        {field: "totalFee", header: "Cost", body: (rowData)=><>{formatCurrency(rowData.totalFee)}</>},
    ]
    const countTotalHours = (trainings)=>{
      let count = 0;
      trainings?.map(item =>{
        count += item?.durationInHours
      })
      return count;
    }
    return (
      <>
      {loading ? <SkeletonBanner/> : error ? <h1>error</h1> :<>
        {/* <SectionBanner title="User Details and Training Summary"/> */}
        <Card>
          <CardBody>
            <Row>
              <Col>
                <h5 className="theme-color">User Details</h5>
                <hr />
                <DetailItem label="BadgeNo" value={data?.employeeBadge} />
                <DetailItem label="Name" value={data?.fullname} />
                <DetailItem label="Position" value={data?.position} />
                <DetailItem label="Department" value={data?.departmentName} />
                <DetailItem label="User Type" value={data?.roleName} />
                <DetailItem label="Status" value={data?.statusName} />
                <DetailItem label="Password" value={data?.password} />
              </Col>
              <Col className="border-start">
                <h5 className="theme-color">Training Summary</h5>
                <hr />
                <h6>Trainings Attended:</h6>
                <DetailItem label="No of Trainings" badge={trainings?.data?.attended?.length} className="text-muted" />
                <DetailItem label="Total Accumulated Hours" badge={countTotalHours(trainings?.data?.attended)}  className="text-muted"/>
                <br />
                <h6>Trainings Facilitated:</h6>
                <DetailItem label="No of Trainings" badge={trainings?.data?.facilitated?.length} className="text-muted" />
                <DetailItem label="Total Accumulated Hours" badge={countTotalHours(trainings?.data?.facilitated)}  className="text-muted" />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <Row>
              <TabView className="custom-tab">
                <TabPanel header={"Trainings Attended"} >
                <CommonTable dataTable={mapTRequestToTableData(trainings?.data?.attended)} columnItems={columnItem}/>
                </TabPanel>
                <TabPanel header={"Trainings Facilitated"}>
                    <CommonTable dataTable={mapTRequestToTableData(trainings?.data?.facilitated)} columnItems={columnItem}/>
                </TabPanel>
                {/* <TabPanel header={"Ongoing Trainings"}>
                <CommonTable dataTable={mapTRequestToTableData(trainings?.data?.ongoing)} columnItems={columnItem}/>
                </TabPanel>
                <TabPanel header={"Trainings Requested"} >
                <CommonTable dataTable={mapTRequestToTableData(trainings?.data?.requested)} columnItems={columnItem}/>
                </TabPanel> */}
              </TabView>
            </Row>
          </CardBody>
        </Card></>}
      </>
    );
}
UserDetailView.propTypes = {
    data: proptype.object,
    id: proptype.number  // User Data
}
export default UserDetailView;