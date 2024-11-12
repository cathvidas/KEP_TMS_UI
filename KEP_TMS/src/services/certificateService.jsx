import {
  createCertificateApi,
  deleteCertificateApi,
  getCertificateById,
  getCertificateByUserId,
  getCertificatesByRequestId,
  updateCertificateApi,
} from "../api/certificateApi";

const certificateService = {
  getCertificateByUserId: async (userId) => {
    const response = await getCertificateByUserId(userId);
    return response?.status === 1 ? response.data : [];
  },
  getCertificateById: async (id) => {
    const response = await getCertificateById(id);
    return response?.status === 1 ? response.data : {};
  },
  getCertificateByRequestId: async (id) => {
    const response = await getCertificatesByRequestId(id);
    return response?.status === 1 ? response.data : [];
  },
  deleteCertificate: async (id) => {
    const response = await deleteCertificateApi(id);
    if (response?.status !== 1) {
      throw new Error(response?.message ?? response?.title);
    }
    return response;
  },
  createCertificate: async (data) => {
    const response = await createCertificateApi(data);
    if (response?.status !== 1) {
      throw new Error(response?.message ?? response?.title);
    }
    return response;
  },
  updateCertificate: async (data) => {
    const response = await updateCertificateApi(data);
    if (response?.status !== 1) {
      throw new Error(response?.message ?? response?.title);
    }
    return response;
  },
};
export default certificateService;