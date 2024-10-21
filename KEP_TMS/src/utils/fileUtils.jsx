export const getFileExtension = (filename) => {
  return filename.split(".").pop();
};
export const checkFileIfImage = (file) => {
  const fileType = file["type"];
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  return validImageTypes.includes(fileType);
};