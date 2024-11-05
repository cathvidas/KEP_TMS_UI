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
  const hidden = newElement.getElementsByClassName("hideExport");
  for (let i = 0; i < hidden.length; i++) {
    hidden[i].classList.add("d-none");
  }
  const visible = newElement.getElementsByClassName("showExport");
  for (let i = 0; i < visible.length; i++) {
    visible[i].classList.remove("d-none");
  }
  const ratings = newElement.getElementsByClassName("p-rating-item");
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
  const table = newElement.getElementsByClassName("table");
  for (let i = 0; i < table.length; i++) {
    table[i].classList.add("custom-table-bordered");
    table[i].classList.remove("table-bordered");
  }
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
