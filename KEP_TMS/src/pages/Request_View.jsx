import TMS_Header from "../components/Header"
import RenderLayout from "../components/Layout"
import { RequestMenu } from "../components/Menu"

const Content =()=>{
    return(
        <>
        <TMS_Header title={"Training Detail"}/>
        <div className="d-flex gap-3">
        <RequestMenu/>
        <div className="flex-grow-1">
                <div className="p-4 rounded" style={{background: 'linear-gradient(rgba(91,228,155,0.2) 0%, rgba(0,167,111,0.2) 98%)'}}>
                    <h3 className="fw-bold" style={{color: 'rgb(0,75,80)'}}>Training Requests || Add Request</h3>
                    <p className="m-0">To add a new training request, fill out the form with the course name, desired date, and any special requirements. Click 'Submit' to finalize your request.</p>
                    <div className="d-flex mt-3"><a className="btn btn-primary btn-lg me-2" role="button" href="#" style={{background: '#00a76f',borderColor: '#00a76f'}} data-bs-toggle="modal" data-bs-target="#TRtype">Request Training</a><a className="btn btn-lg" role="button" href="#" style={{background: '#f6fbf9',color: '#066337'}}>View Request</a></div>
                </div>
            </div>
            </div>
        </>
    )
    }
const RequestView =()=>{
return(
    <>
    <RenderLayout ActionComponent={Content}/>
    </>
)
}
export default RequestView