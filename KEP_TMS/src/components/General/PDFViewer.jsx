import proptype from "prop-types";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const PDFViewer = ({ data, handleShow, handleClose }) => {
  console.log(data)
  const [file, setFile] = useState(data)
  useEffect(()=>{
    setFile(data)
  },[data])
  return (
    <Modal show={handleShow} fullscreen onHide={()=>handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title className="theme-color h6">{file?.fileName}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="p-0">
      
  <iframe src={file?.url} className="w-100 " style={{height: "calc(100vh - 70px)"}}></iframe>
    </Modal.Body>
  </Modal>
  )
  
};
PDFViewer.propTypes = {
  url: proptype.string,
  data: proptype.object,
  handleShow: proptype.bool,
  handleClose: proptype.func,
};
export default PDFViewer;