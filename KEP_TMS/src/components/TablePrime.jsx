// import { useEffect, useState } from "react";
// import { uploadFile } from "../api/trainingServices";
// import { Button } from "react-bootstrap";
// import { formatDateTime } from "../utils/datetime/Formatting";

// const ExamSection = () => {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [upload, setUpload] = useState(false);

//   const handleOnChange = (e) => {
//     const file1 = e.target.files[0];
//     setFile(file1);
//   };

//   const getSizeInKiloByte = (fileSizeInBytes) => {
//     return (fileSizeInBytes / 1024).toFixed(2);
//   };

//   useEffect(() => {
//     if (upload) {
//       const formData = new FormData();
//       formData.append("File", file);
//       const getResponse = async () => {
//         try {
//           setLoading(true);
//           const response = await uploadFile(formData);
//           if (response.isSuccess) {
//             setUsers(response.data.users);
//             if (response.message === "") {
//               setSuccess("Successfully retrieved users.");
//             } else {
//               setError("Not Found: " + response.message);
//             }
//           } else {
//             setError(response?.message);
//           }
//         } catch (error) {
//           setError(
//             error.response?.data || "An error occurred during the upload."
//           );
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       getResponse();
//     }
//   }, [upload, file]); // Added `file` as a dependency to ensure it updates correctly.

//   return (
//     <div className="card mt-5">
//       <input type="file" className="form-control" onChange={handleOnChange} />
//       {file && (
//         <>
//           <span>Name: {file.name}</span>
//           <span>Last modified: {formatDateTime(file.lastModified)}</span>
//           <span>Size: {getSizeInKiloByte(file.size)} KB</span>
//           <span>Type: {file.type}</span>
//         </>
//       )}
//       <Button type="button" onClick={() => setUpload(true)} variant="primary">
//         Upload
//       </Button>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           {error && <span className="text-red">{error}</span>}
//           {success && <span className="text-success">{success}</span>}
//           {users.length > 0 &&
//             users.map((element) => (
//               <div key={element.id}>
//                 <span>Name: {element.fullname}</span>
//                 <span>Id: {element.employeeBadge}</span>
//               </div>
//             ))}
//         </>
//       )}
//     </div>
//   );
// };
// export default ExamSection;
