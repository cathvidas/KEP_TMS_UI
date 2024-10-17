// import React, { useEffect, useRef } from "react";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

// // Set the workerSrc to pdf.worker.js
// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.js`;

// const samPDFViewer = ({ pdfUrl }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadPDF = async () => {
//       const loadingTask = getDocument(pdfUrl);
//       const pdf = await loadingTask.promise;

//       // Fetch the first page
//       const page = await pdf.getPage(1);

//       const scale = 1.5; // Scale to make the PDF more visible
//       const viewport = page.getViewport({ scale });

//       // Set canvas dimensions
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       canvas.height = viewport.height;
//       canvas.width = viewport.width;

//       // Render PDF page into canvas context
//       const renderContext = {
//         canvasContext: context,
//         viewport: viewport,
//       };
//       await page.render(renderContext).promise;
//     };

//     loadPDF().catch(console.error); // Catch errors
//   }, [pdfUrl]);

//   return <canvas ref={canvasRef}></canvas>;
// };

// export default samPDFViewer;
