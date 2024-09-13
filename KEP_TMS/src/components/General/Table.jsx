import { Button, Table } from "react-bootstrap";
import { getAllTrainingRequests } from "../../api/trainingServiceApi.jsx";
import React, { useEffect, useState } from "react";
import { FormatDate } from "../../utils/FormatDateTime.jsx";
import proptype from "prop-types"
import { Link, useNavigate } from "react-router-dom";
const RTable = ({heading, rows, columns}) => {
  const [trainingRequests, setTrainingRequests] = useState([]);
  useEffect(() => {
    getAllTrainingRequests().then((res) => {
      setTrainingRequests(res);
    });
  }, []);
  const navigate = useNavigate();
  const fetchData = (id) => {
    console.log(id)
  // navigate(`/KEP_TMS/Request_View/${id}`)
  }
  console.log(trainingRequests);
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
                <th>Program</th>
                <th>Category Name</th>
                <th>Requestor</th>
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
                <td>{item.trainingProgramName}</td>
                <td>{item.categoryName}</td>
                <td>{item.requestorName}</td>
                <td>{item.venue}</td>
                <td>
                  {FormatDate(item.trainingStartDate)} -{" "}
                  {FormatDate(item.trainingEndDate)}
                </td>
                <td>
                  {item.trainingFacilitators.map((fac) => {
                    return fac.facilitorId;
                  })}
                </td>
                <td>{item.trainingFee}</td>
                <td>
                  <span className="badge bg-primary">{item.statusName}</span>
                </td>
                <td>
                  <Link type="button" className="btn btn-primary btn-sm" to={`/KEP_TMS/Request_View/${item.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}

        </tbody>
      </Table>
    </div>
  );
};
RTable.propTypes={
  content: proptype.func,
  heading: proptype.string,
  rows: proptype.array,
  columns: proptype.array
  
}
export default RTable;
