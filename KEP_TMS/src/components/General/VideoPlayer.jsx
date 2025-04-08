import proptype from "prop-types";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getVideoAttachmentUrl } from "../../utils/getVideoAttachmentUrl";

const VideoPlayer = ({ data, handleShow, handleClose }) => {
  const [file, setFile] = useState(data)
  useEffect(()=>{
    setFile({...data, url: getVideoAttachmentUrl(data?.attachmentId ?? data?.id)})
  },[data])
  return (
    <Modal show={handleShow} fullscreen onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="theme-color h6">{file?.fileName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <video width="100%" height="100%" autoPlay controls>
          <source src={file?.url} type="video/mp4" />
          <source src={file?.url} type="video/ogg" />
          Something went wrong.{" "}
          <a
            href={file?.url+`&isView=true`}
            target="_blank"
          >
            Please click here to play the video.
          </a>
        </video>
      </Modal.Body>
    </Modal>
  );
  
};
VideoPlayer.propTypes = {
  url: proptype.string,
  data: proptype.object,
  handleShow: proptype.bool,
  handleClose: proptype.func,
};
export default VideoPlayer;
