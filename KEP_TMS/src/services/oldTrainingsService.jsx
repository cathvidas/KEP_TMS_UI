import { SearchValueConstant } from "../api/constants";
import { GetExternalActivitiesByRequestIdApi, GetOldEffectivenessByRequestIdApi, GetOldExternalRequestApi, GetOldExternalRequestByIdApi, GetOldSystemFacilitatorApi } from "../api/oldTrainingsApi";
import { getPagedTrainingRequestsApi } from "../api/trainingRequestApi";

const oldTrainingsService = {
  getOldExternalRequestById: async (id) => {
    const response = id && (await GetOldExternalRequestByIdApi(id));
    return response?.status === 1 ? response?.data : null;
  },
  getOldExternalRequest: async (
    pageNumber,
    pageSize,
    searchValue,
    secondSearchValue,
    thirdSerachValue,
    fourthSearchValue
  ) => {
    const response = await GetOldExternalRequestApi(
      pageNumber,
      pageSize,
      searchValue,
      secondSearchValue,
      thirdSerachValue,
      fourthSearchValue
    );
    return response;
  },
  getCombinedTrainings: async (pageNumber, pageSize, userId, searchValue) => {
    const newTrainings = await getPagedTrainingRequestsApi(
      1,
      1,
      SearchValueConstant.ATTENDED,
      userId,
      searchValue
    );
    const oldExTrainings = await GetOldExternalRequestApi(
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
      const trainings = await GetOldExternalRequestApi(
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
    // if(oldNewTrainings?.totalRecords > 0 && results?.length <= pageSize) {
    //   const trainings = await GetOldNewRequestApi(pageNumber, pageSize, SearchValueConstant.PARTICIPANT, userId, searchValue);
    //   oldNewTrainings?.results?.forEach((item) => {
    //     if(results?.length <= pageSize){
    //       results.push(item)
    //     }
    //   })
    // }
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
  getExternalActivitiesByRequestId: async (id) => {
    const response = id && (await GetExternalActivitiesByRequestIdApi(id));
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
};
export default oldTrainingsService;
