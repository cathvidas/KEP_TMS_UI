import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import CommonTable from "../General/CommonTable";
import proptype from "prop-types";
import { APP_DOMAIN } from "../../api/constants";
const PendingTaskList = ({data}) => {
    const navigate = useNavigate();
    const actionComponent = (rowData)=>{
        return <Button type="button" icon="pi pi-eye" text onClick={()=>navigate(`${APP_DOMAIN}/${rowData?.link}`)}/>
    } 
  const itemms = [
    {
      field: "id",
      header: "No",
      body: (_, {rowIndex}) => rowIndex + 1,
    },
    {
      field: "type",
      header: "Forms",
    },
    {
      field: "program",
      header: "Program",
    },
    {
      field: "title",
      header: "Details",
    },
    {
      field: "status",
      header: "Status",
      body: (item) => item?.status ?? "Not yet submitted",
    },
    {
      field: "action",
      header: "Action",
      body: actionComponent
    },
  ];
  return<>
  <CommonTable tableName="Pending Activities" columnItems={itemms} dataTable={data}/>
  </>
};
PendingTaskList.propTypes = {
    data: proptype.array.isRequired,
}
export default PendingTaskList;
