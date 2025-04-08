import proptype from "prop-types";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getVideoAttachmentUrl } from "../../utils/getVideoAttachmentUrl";
import ErrorTemplate from "./ErrorTemplate";

const VideoPlayer = ({ data, handleShow, handleClose }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          getVideoAttachmentUrl(
            data.attachmentId ? data.attachmentId : data?.id
          )
        );
        // Check if the response is successful
        if (!res.ok) {
          setError("Failed to fetch video");
          return;
        }
        const validFileTypes = [
          "video/*",
          "video/mp4",
          "video/mov",
          "video/avi",
          "video/vmw",
          "video/webm",
        ];
        const blob = await res?.blob();
        if(!validFileTypes.includes(blob?.type)){
          throw new Error("");
        }
        const url = URL.createObjectURL(blob);
        console.log(res, blob, url);
        setVideoUrl(url);
        // Clean up the URL when the component unmounts or video changes
        return () => URL.revokeObjectURL(url);
      } catch {
        setError("Failed to fetch video");
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [data]);
  return (
    <Modal show={handleShow} fullscreen onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="theme-color h6">{data?.fileName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        {loading ? <div className="d-flex justify-content-center align-items-center py-5">Loading...</div>: <>
        {error && <ErrorTemplate message={error} />}
        {videoUrl && (
          <video width="100%" height="100%" autoPlay controls>
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/ogg" />
            Something went wrong.{" "}
            <a href={videoUrl + `&isView=true`} target="_blank">
              Please click here to play the video.
            </a>
          </video>
        )}</>}
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
