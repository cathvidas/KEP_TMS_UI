import fetchFromApi from "./apiUtil";

export const getAllProgramsApi = async () => {
  return await fetchFromApi("/TrainingProgram/GetAllTrainingPrograms");
};
export const getProgramApi = async (programId) => {
  return await fetchFromApi(
    `"/TrainingProgram/GetTrainingProgramById"?id=${programId}`
  );
};
export const createProgramApi = async (data) => {
  return await fetchFromApi(
    "/TrainingProgram/CreateTrainingProgram",
    "POST",
    data
  );
};
export const deleteProgramApi = async (id) => {
  return await fetchFromApi(
    `/TrainingProgram/DeleteTrainingProgram?id=${id}`,
    "DELETE"
  );
};
export const updateProgramApi = async (data) => {
  return await fetchFromApi(
    "/TrainingProgram/UpdateTrainingProgram",
    "PUT",
    data
  );
};
export const getPagedProgramApi = async (pageNumber, pageSize, searchValue) => {
  if (searchValue) {
    return await fetchFromApi(
      `/TrainingProgram/GetPaged?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`
    );
  }
  return await fetchFromApi(
    `/TrainingProgram/GetPaged?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};
