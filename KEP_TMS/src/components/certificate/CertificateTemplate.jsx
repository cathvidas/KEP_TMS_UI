import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { Row } from "react-bootstrap";
import TextEditor from "../forms/common/TextEditor";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";
import Select from "react-select";
import proptype from "prop-types";
import handleGeneratePdf from "../../services/common/handleGeneratePdf";
import logo from "../../img/Knowles_Gray_RGB.png";
import CertificateContent from "./CertificateContent";
const CertificateTemplate = ({ trainings, signatoryList, isFacilitator }) => {
  const certRef = useRef();
  const certHeaderTempRef = useRef();
  const certHeaderRef = useRef();
  const certSignatory = useRef();
  const [certData, setCertData] = useState("");
  const [certHeader, setCertHeader] = useState("");
  const [signatory, setSignatory] = useState();
  const [customSignatory, setCustomSignatory] = useState({});
  const selectedSignatory = signatoryList?.find(
    (item) => item?.employeeBadge === signatory?.value
  );
  useState(() => {
    const assigned =
      signatoryList?.find((item) => item?.employeeTypeName === "Director") ??
      signatoryList?.find((item) => item?.employeeTypeName === "Manager");
    setSignatory({ value: assigned?.employeeBadge, label: assigned?.fullname });
    setCustomSignatory({
      name: `${assigned?.firstname} ${assigned?.lastname}`,
      title: assigned?.position,
    });
  }, [signatoryList]);
  const generateCertificate = () => {
    const div = document.createElement("div");
    // div.style.padding = "10px 0.5in";
    const header = certHeaderTempRef.current;
    const headerContent = header?.querySelector(".header-content");
    headerContent.innerHTML = certHeader;
    headerContent.style.lineHeight = "normal"
    headerContent.style.fontSize = "12px"
    div.innerHTML =
      header?.innerHTML + certData  ;
      if(signatory?.value) {
        div.innerHTML += certSignatory.current?.innerHTML;
      }
    handleGeneratePdf(div);
  };
  const getSignatoryList = () => {
    const list = [];
    signatoryList?.map((item) => {
      list.push({ value: item?.employeeBadge, label: item?.fullname });
    });
    list.push({ value: "custom-signatory", label: "Other" });
    list.push({ value: "", label: "None" });
    return list;
  };
  return (
    <>
      <div ref={certRef} className="d-none showExport">
        <CertificateContent
          trainings={trainings}
          signatory={signatoryList?.find(
            (item) => item?.employeeBadge === signatory?.value
          )}
          isFacilitator={isFacilitator}
        />
      </div>

      <div ref={certHeaderRef} className="d-none">
        <div>
          <p>
            <span className="text-small">
              Knowles Electronics (Philippines) Corporation <br />
              Cebu Light Industrial Park (CLIP) <br />
              Basak, Lapu-Lapu City 6015 <br />
              Cebu, Philippines <br />
              Phone: +63 (32) 253-7111 &nbsp;&nbsp; Fax: +63 (32) 253-7112
            </span>
          </p>
          <p></p>
        </div>
      </div>
      <hr />
      <div className="px-3">
      <div ref={certHeaderTempRef}>
        <div className="d-flex px-2 mb-4 justify-content-between">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="d-none header-content showExport"></div>
          <div className="hideExport">
            <TextEditor
              defaultValue={certHeaderRef.current?.innerHTML}
              onChange={(e) => setCertHeader(e)}
            />
          </div>
        </div>
      </div>
      <TextEditor
        defaultValue={certRef.current?.innerHTML}
        onChange={(e) => setCertData(e)}
        showToolbar
      />
      <br />
      {signatory?.value && (
        <div ref={certSignatory} className="px-2">
          <p>
            <strong>
              {signatory?.value === "custom-signatory"
                ? customSignatory?.name?.toUpperCase()
                : selectedSignatory?.firstname?.toUpperCase() +
                  " " +
                  selectedSignatory?.lastname?.toUpperCase()}
            </strong>
          </p>
          <p>
            {signatory?.value === "custom-signatory"
              ? customSignatory?.title
              : selectedSignatory?.position}
          </p>
        </div>
      )}</div>
      <hr />
      <Row className="">
        
        <FormFieldItem
          label={"Signatory"}
          col={"col-md-4"}
          FieldComponent={
            <Select
              options={getSignatoryList()}
              value={signatory}
              onChange={(e) => setSignatory(e)}
               menuPlacement="top"
            />
          }
        />
        {signatory?.value === "custom-signatory" && (
          <>
            <FormFieldItem
              label={"Name"}
              col={"col-md-4"}
              FieldComponent={
                <input
                  value={customSignatory?.name}
                  className="form-control"
                  onChange={(e) =>
                    setCustomSignatory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              }
            />
            <FormFieldItem
              label={"Title"}
              col={"col-md-4"}
              FieldComponent={
                <input
                  value={customSignatory?.title}
                  className="form-control"
                  onChange={(e) =>
                    setCustomSignatory((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              }
            />
          </>
        )}

      </Row>
      <div className="text-end">
          <Button
            type="button"
            label="Export Certificate"
            icon="pi pi-download"
            onClick={generateCertificate}
          /></div>
    </>
  );
};
CertificateTemplate.propTypes = {
  trainings: proptype.array,
  signatoryList: proptype.array,
  isFacilitator: proptype.bool,
};
export default CertificateTemplate;
