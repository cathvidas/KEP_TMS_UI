import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import attachmentService from "../services/attachmentService";

const attachmentHook = {
  useTraineeCertificates: (id, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
          () => attachmentService.getAllTraineeCertificate(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getPrograms();
    }, [id, trigger]);
    return { data, error, loading };
  },
  useAttachmentsByReferenceId: (id,type, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
          () => attachmentService.getAttachmentByReference(id, type),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getPrograms();
    }, [id,type, trigger]);
    return { data, error, loading };
  },
  useAllVideoAttachments: (pageNumber, pageSize, searchValue, SecondSearchValue, trigger) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getVideos = async () => {
        handleResponseAsync(
          () => attachmentService.getAttachments(pageNumber, pageSize, searchValue, SecondSearchValue),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getVideos();
      
    }, [pageNumber, pageSize, searchValue, SecondSearchValue, trigger])
    return { data, error, loading };
  },
  useAttachmentAccess: (pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue, trigger) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getVideos = async () => {
        handleResponseAsync(
          () => attachmentService.getAttachmentAccess(pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue),
          (e) => setData(e),
          (e) => setError(e?.message ?? e),
          () => setLoading(false)
        );
      };
      getVideos()
    }, [pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue, trigger])
    return { data, error, loading };
  }
};
export default attachmentHook;
