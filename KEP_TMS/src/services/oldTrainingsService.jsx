import { SearchValueConstant, TrainingType } from "../api/constants";
import { GetOldAttendedTrainingsApi, GetOldEffectivenessActivityByIdApi, GetOldEffectivenessByRequestIdApi, GetOldExternalRequestByIdApi, GetOldFacilitatedTrainingsApi, GetOldFacilitatorRatingApi, GetOldInternalRequestByIdApi, GetOldSystemFacilitatorApi, GetOldTotalAccumulatedHoursApi, GetOldTrainingActivitiesByRequestIdApi, GetOldTrainingEvaluationByRequestIdApi, GetOldTrainingReportActivityByIdApi, GetOldTrainingReportByRequestIdApi, GetOldTrainingRequestApi } from "../api/oldTrainingsApi";
import { getPagedTrainingRequestsApi } from "../api/trainingRequestApi";

const oldTrainingsService = {
  getOldExternalRequestById: async (id) => {
    const response = id && (await GetOldExternalRequestByIdApi(id));
    return response?.status === 1 ? response?.data : null;
  },
  getOldInternalRequestById: async (id) => {
    const response = id && (await GetOldInternalRequestByIdApi(id));
    return response?.status === 1 ? response?.data : null;
  },
  getOldTrainingRequest: async (
    trainingType,
    pageNumber,
    pageSize,
    searchValue,
    secondSearchValue,
    thirdSerachValue,
    fourthSearchValue
  ) => {
    const response = await GetOldTrainingRequestApi(
      trainingType,
      pageNumber,
      pageSize,
      searchValue,
      secondSearchValue,
      thirdSerachValue,
      fourthSearchValue
    );
    return response;
  },
  getCombinedTrainings: async (
    pageNumber, pageSize, userId, searchValue) => {
    const newTrainings = await getPagedTrainingRequestsApi(
      1,
      1,
      SearchValueConstant.ATTENDED,
      userId,
      searchValue
    );
    const oldExTrainings = await GetOldTrainingRequestApi(
      TrainingType.EXTERNAL,
      1,
      1,
      SearchValueConstant.PARTICIPANT,
      userId,
      searchValue
    );
    const oldNewTrainings = null;
    const totalRecords =
      (newTrainings?.totalRecords ?? 0) +
      (oldExTrainings?.totalRecords ?? 0) +
      (oldNewTrainings?.totalRecords ?? 0);
    let results = [];
    if (newTrainings?.totalRecords > 0) {
      const trainings = await getPagedTrainingRequestsApi(
        pageNumber,
        pageSize,
        SearchValueConstant.ATTENDED,
        userId,
        searchValue
      );
      results = results.concat(trainings?.results);
    }
    if (oldExTrainings?.totalRecords > 0 && results?.length <= pageSize) {
      const trainings = await GetOldTrainingRequestApi(
        TrainingType.EXTERNAL,
        pageNumber,
        pageSize,
        SearchValueConstant.PARTICIPANT,
        userId,
        searchValue
      );
      trainings?.results?.forEach((item) => {
        if (results?.length <= pageSize) {
          results.push(item);
        }
      });
    }
    return {
      currentPage: pageNumber,
      pageSize: pageSize,
      totalRecords: totalRecords,
      results: results,
    };
  },
  getOldSystemFacilitator: async (id) => {
    const response = id && (await GetOldSystemFacilitatorApi(id));
    return response?.status === 1 ? response?.data : null;
  },
  getOldTrainingActivitiesByRequestId: async (id, type) => {
    const response = await GetOldTrainingActivitiesByRequestIdApi(id || 0, type);
    return response?.status === 1 ? response?.data : [];
  },
  getOldEffectivenessActivityById: async (id, type) => {
    const response = await GetOldEffectivenessActivityByIdApi(id, type);
    return response?.status === 1 ? response?.data : [];
  },
  getOldEffectivenessByRequestId: async (id, type) => {
    const response = id && (await GetOldEffectivenessByRequestIdApi(id, type));
    return response?.status === 1
      ? response?.data?.map((item) => ({
          ...item,
          projectPerformanceEvaluation: item?.projectPerformanceEvaluationDto,
        }))
      : [];
  },
  getOldTrainingReportActivityById: async (id, type) => {
    const response = await GetOldTrainingReportActivityByIdApi(id, type);
    return response?.status === 1 ? response?.data : [];
  },
  getOldTrainingReportByRequestId: async (id, type) => {
    const response = id && (await GetOldTrainingReportByRequestIdApi(id, type));
    return response?.status === 1 ? response?.data : [];
  },
  getOldTrainingEvaluationByRequestId: async (id, type) => {
    const response = id && (await GetOldTrainingEvaluationByRequestIdApi(id, type));
    return response?.status === 1 ? response?.data : [];
  },
  getOldFacilitatedTrainings: async (id) => {
    const response = id && await GetOldFacilitatedTrainingsApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getOldAttendedTrainings: async (id) => {
    const response = id && await GetOldAttendedTrainingsApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getOldTotalAccumulatedHours: async (id) => {
    const response = id && await GetOldTotalAccumulatedHoursApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getOldFacilitatorRating: async (userId, reqId) => {
    const response = userId && (await GetOldFacilitatorRatingApi(userId, reqId));
    return response?.status === 1 ? response?.data : null;
  }
};
export default oldTrainingsService;
