import jsPDF from "jspdf";
import star from "../../img/icons/star.png";
import starFill from "../../img/icons/star-fill.png";
import { actionDelay } from "../sweetalert";
import Swal from "sweetalert2";
const handleGeneratePdf = (e) => {
  actionDelay();
  const doc = new jsPDF("portrait", "pt", "a4");
  var newElement = document.createElement("div");
  newElement.style.width = 790 + "px";
  newElement.appendChild(e.cloneNode(true));
  doc.setFont("Helvetica");
  doc.setFontSize("11");
  newElement.className = "pdf-export"; // Apply PDF-specific CSS
  const formLabel = newElement.getElementsByClassName("form-label");
  for (let i = 0; i < formLabel.length; i++) {
    formLabel[i].classList.remove("required");
  }
  const hidden = newElement.querySelectorAll(".hideExport");
  for (let i = 0; i < hidden.length; i++) {
    hidden[i].remove();
  }
  const visible = newElement.querySelectorAll(".showExport");
  for (let i = 0; i < visible.length; i++) {
    visible[i].classList.remove("d-none");
  }
  const ratings = newElement.querySelectorAll(".p-rating-item");
  for (let j = 0; j < ratings.length; j++) {
    const img = document.createElement("img");
    img.width = 16;
    img.height = 16;
    if (ratings[j].classList.contains("p-rating-item-active")) {
      img.src = starFill;
    } else {
      img.src = star;
    }
    ratings[j].innerHTML = "";
    ratings[j].appendChild(img);
  }
  const table = newElement.getElementsByClassName("custom-table");
  for (let i = 0; i < table.length; i++) {
    table[i].classList.add("custom-table-bordered");
    table[i].classList.remove("table-bordered");
  }
//   doc.autoTable({
//     html: '.custom-table', // You can specify a selector here
//     startY: 20, // Optional: start rendering from Y position
//     margin: { top: 10, left: 10, bottom: 10, right: 10 }, // Optional: define margins
//     theme: 'grid', // Optional: theme for the table (grid, stripes, etc.)
// });
  doc.html(newElement, {
    html2canvas: {
      scale: 0.7,
      allowTaint: true,
    },
    callback: function (doc) {
      window.open(doc.output("bloburl")); // to debug
      Swal.close();
      Swal.close();
    },
    margin: [20, 20, 20, 20],
  });
};
export default handleGeneratePdf;
