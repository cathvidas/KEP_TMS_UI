import { Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FormatDate } from "../../utils/FormatDateTime.jsx";
import proptype from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  approveTrainingRequest,
  getAllTrainingRequests,
  getTrainingRequestByApprover,
} from "../../services/trainingServices.jsx";
import {
  SessionGetEmployeeId,
  SessionGetFirstName,
  SessionGetUserId,
  SessionGetUserName,
} from "../../services/sessions.jsx";
import { getUserById } from "../../api/UserAccountApi.jsx";
import StatusColor from "./StatusColor.jsx";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert.jsx";
import { TrainingRequestApproval } from "../../services/insertData.jsx";
import { statusCode } from "../../api/constants.jsx";
const RTable = ({ heading, rows, columns, userType }) => {
  const navigate = useNavigate();
  const [trainingRequests, setTrainingRequests] = useState([]);
  const [requestState, setRequetState] = useState(TrainingRequestApproval);
  useEffect(() => {
    const getTrainingRequests = async () => {
      try {
        var trainingRequests = await getAllTrainingRequests();
        if (userType === "forapprovall") {
          trainingRequests = await getTrainingRequestByApprover(
            SessionGetUserId()
          );
        }
        
        console.log(trainingRequests);
        const updatedRequests = await Promise.all(
          trainingRequests.map(async (request) => {
            // Get the list of facilitator IDs
            const facilitatorIds = request.trainingFacilitators.map(
              ({ facilitorBadge }) => facilitorBadge
            );
            // Fetch details for each facilitator
            const facilitatorsDetails = await Promise.all(
              facilitatorIds.map(async (employeeBadge) => {
                const user = await getUserById(employeeBadge);
                console.log(user);
                return {
                  employeeBadge,
                  name: user.data.username,
                  fullname: user.data.lastname + ", " + user.data.firstname,
                };
              })
            );

            return {
              ...request,
              trainingFacilitators: facilitatorsDetails, // Replace with detailed facilitator information
            };
          })
        );
        
        // Set training requests with updated facilitator information
        if (userType === "user" || userType === "Trainee") {
          const userRequests = updatedRequests.filter(
            (request) => request.requestorName === SessionGetFirstName()
          );
          setTrainingRequests(userRequests);
        } else {
          setTrainingRequests(updatedRequests);
        }
      } catch (error) {
        console.error("Error fetching training requests:", error);
      }
    };

    getTrainingRequests();
  }, [userType]);

  useEffect(()=>{
    setRequetState({employeeBadge: SessionGetEmployeeId(), updatedBy: SessionGetUserName()})
  }, [trainingRequests.id])
  const handleApprove = async(id)=>{
    const formData = {
      requestId: id,
      statusId: statusCode.APPROVED,
      updatedBy: SessionGetUserName(),
      employeeBadge: SessionGetEmployeeId(),
    }
    try{
      
      const response = await approveTrainingRequest(formData);
      if(response.isSuccess ===true){
        actionSuccessful("Success", "training request successfully approved")
        setTimeout(() => {
          navigate("/KEP_TMS/RequestList")
        }, 5000);
      }else{
        actionFailed("Error", response.message)
      }
      console.log(response)
    }catch(err){
    
      actionFailed("Error", err)
  }

  }
  return (
    <div className="">
      <Table className="theme-table bg-success border m-0">
        <thead className="theme-bg">
          <tr>
            {columns ? (
              columns.map((col, k) => <th key={k}>{col}</th>)
            ) : (
              <>
                <th>R_No</th>
                {userType !== "user" && <th>Requestor</th>}
                <th>Program</th>
                <th>Category Name</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Facilitator</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Action</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rows
            ? rows.map((row, x) => (
                <>
                  <tr key={x}>
                    {row.map((col, i) => (
                      <td key={i}>{row[i]}</td>
                    ))}
                  </tr>
                </>
              ))
            : trainingRequests.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  {userType !== "user" && <td>{item.requestorName}</td>}
                  <td>{item.trainingProgramName}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.venue}</td>
                  <td>
                    {FormatDate(item.trainingStartDate)} -{" "}
                    {FormatDate(item.trainingEndDate)}
                  </td>
                  <td>
                    {item.trainingFacilitators.map((fac) => {
                      return fac.fullname;
                    })}
                  </td>
                  <td>{item.trainingFee}</td>
                  <td>{StatusColor(item.statusName)}</td>
                  <td >
                    <span className="d-flex gap-2 align-items-center">
                    <Link
                      type="button"
                      className="btn theme-bg btn-sm"
                      to={`/KEP_TMS/Request_View/${item.id}`}
                    >
                      View
                    </Link>
                    {userType === "forapproval" && 
                    <Button className="btn-sm" onClick={()=>confirmAction("","Please choose an action", "Approve", "Reject", handleApprove, item.id)}>Approve</Button>
                    }</span>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};
RTable.propTypes = {
  content: proptype.func,
  heading: proptype.string,
  rows: proptype.array,
  columns: proptype.array,
  userType: proptype.string,
};
export default RTable;
