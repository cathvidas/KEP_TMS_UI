import jsPDF from "jspdf";
const handleGeneratePdf = (e) => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    var newElement = document.createElement("div");
    newElement.style.width = 960 + "px";
    newElement.appendChild(e.cloneNode(true)); 
    pdf.setFont("Helvetica"); 
    newElement.className = "pdf-export"; // Apply PDF-specific CSS
    console.log(newElement)
    pdf.html(newElement, {
      html2canvas: {
        scale: 0.6,
        allowTaint: true
      },
      callback: function (pdf) {
        window.open(pdf.output("bloburl")); // to debug
      },
      autoPaging: 'text',
      x: 10, //margin
      y: 10,
    });
};
export default handleGeneratePdf;
