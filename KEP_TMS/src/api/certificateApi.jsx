import fetchFromApi from "./apiUtil";

export const getCertificateByUserId = async (id) => {
  return await fetchFromApi(`/Certificate/GetCertificatesByBadge?badge=${id}`);
};
export const getCertificateById = async (id) => {
  return await fetchFromApi(`/Certificate/GetCertificatesById?id=${id}`);
};
export const getCertificatesByRequestId = async (id) => {
  return await fetchFromApi(
    `/Certificate/GetCertificateByRequestId?requestId=${id}`
  );
};
export const deleteCertificateApi = async (id) => {
  return await fetchFromApi(
    `/Certificate/DeleteCertificate?id=${id}`,
    "DELETE"
  );
};

export const createCertificateApi = async (data) => {
  return await fetchFromApi(
    `/Certificate/CreateCertificate}`,
    "POST", data
    , {'Content-Type': 'multipart/form-data'}
  );
};

export const updateCertificateApi = async (data) => {
  return await fetchFromApi(
    `/Certificate/UpdateCertificate`,
    "PUT", data
  );
};
