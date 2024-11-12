import { useEffect, useState } from "react";
import certificateService from "../services/certificateService";
import trainingRequestService from "../services/trainingRequestService";

const certificateHook = {
  useAllTraineeCertificates: (id, trainingList, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequestData = async () => {
        try {
          let newTrainingsCert = [];
          const certificates = await certificateService.getCertificateByUserId(
            id
          );
          certificates?.forEach(async (item) => {
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
          });
          setData(newTrainingsCert);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };

      getRequestData();
    }, [id, trainingList, trigger]);
    return { data, error, loading };
  },
};
export default certificateHook;
