import { useEffect, useState } from "react"
import examService from "../services/examService";
import handleResponseAsync from "../services/handleResponseAsync";

const examHook = {
  useExamByRequestId: (id, trigger) => {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => examService.getExamByRequestId(id),
          (e) => setExams(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequest();
    }, [id, trigger]);
    return {
      exams,
      error,
      loading,
    };
  },
  useTraineeExam: (id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => examService.getTraineeExam(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequest();
    }, [id]);
    return {
      data,
      error,
      loading,
    };
  },
  useAllTraineeExamByExamId: (id, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => examService.getAllTraineeExamByExamId(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequest();
    }, [id, trigger]);
    return {
      data,
      error,
      loading,
    };
  },
  useAllTraineeExamByRequest: (id, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => examService.getExamByRequestId(id),
          async (e) => {
            const updatedData = await Promise.all(
              e?.map(async (item) => {
                const traineeExam = await examService.getAllTraineeExamByExamId(
                  item.id
                );
                return { examDetail: item, traineeExam: traineeExam };
              })
            );
            setData(updatedData);
            setLoading(false);
          },
          (e) => {
            setError(e);
            setLoading(false);
          }
        );
      };
      getRequest();
    }, [id, trigger]);
    return {
      data,
      error,
      loading,
    };
  },
};
export default examHook;