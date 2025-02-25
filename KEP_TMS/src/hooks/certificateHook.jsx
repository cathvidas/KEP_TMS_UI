import { useEffect, useState } from "react";
import certificateService from "../services/certificateService";
import trainingRequestService from "../services/trainingRequestService";
import handleResponseAsync from "../services/handleResponseAsync";

const certificateHook = {
  useAllTraineeCertificates: (id, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequestData = async () => {
        try {
          let newTrainingsCert = [];
          let trainingList = [];
          const certificates = await certificateService.getCertificateByUserId(
            id
          );
          for(const item of certificates || []){
            let detail = { certificate: [item] };
            const trainingDetail = trainingList.find(
              (training) => training.id === item.requestId
            );
            if (trainingDetail) {
              detail.training = trainingDetail;
            } else {
              const res = await trainingRequestService.getTrainingRequest(
                item.requestId
              );
              trainingList.push(res);
              if (res) {
                detail.training = res;
              } else {
                detail.training = null;
              }
            }
            const exist = newTrainingsCert.find(
              (cert) => cert?.training?.id === detail?.training?.id
            );
            if (exist) {
              exist.certificate.push(item);
            } else {
              newTrainingsCert.push(detail);
            }
          }
          setData(newTrainingsCert);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      getRequestData();
    }, [id, trigger]);
    return { data, error, loading };
  },
  useTrainingCertificatesByRequestId: (requestId, userId, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequestData = async () => {
        handleResponseAsync(
          () => certificateService.getCertificateByRequestId(requestId),
          (e) => {
            if (userId) {
              setData(e?.filter((item) => item?.employeeBadge === userId));
            } else {
              const updatedData = [];
              e?.map((item) => {
                const exist = updatedData.find(
                  (list) => list?.userId === item?.employeeBadge
                );
                if (exist) {
                  exist.certificate.push(item);
                } else {
                  updatedData.push({
                    userId: item?.employeeBadge,
                    certificate: [item],
                  });
                }
              });
              setData(updatedData);
            }
          },
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequestData();
    }, [requestId, userId, trigger]);
    return { data, error, loading };
  },
};
export default certificateHook;
