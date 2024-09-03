import { Button, Table } from "react-bootstrap"

const RTable = () =>{
return(
    <div className="border">
    <Table className="table-striped">
        <thead>
            <tr>
                <th>R_No</th>
                <th>Program</th>
                <th>Requestor</th>
                <th>Created</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>01</td>
                <td>Economics</td>
                <td>John Doe</td>
                <td>June 2024</td>
                <td>
                    <Button className="btn-info btn-sm rounded-pill text-uppercase fw-bold text-white">Upcoming</Button>
                </td>
                <td>
                    <Button type="button" className="btn-primary">View</Button>
                </td>
            </tr>
        </tbody>
        </Table> 
    </div>
)
}
export default RTable