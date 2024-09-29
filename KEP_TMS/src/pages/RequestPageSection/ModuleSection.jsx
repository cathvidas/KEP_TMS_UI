import { useState } from "react";
import { FormFieldItem } from "../../components/trainingRequestFormComponents/FormElements";
import { SectionHeading } from "../../components/General/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import { ModalContainer } from "../../components/Modal/ModalContainer";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import { ButtonGroup } from 'primereact/buttongroup';
import UploadModuleForm from "../../components/forms/UploadModuleForm";
import proptype from "prop-types";

const ModuleSection = ({data}) => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const ModalContent = (
    <>
    <FormFieldItem
      label={"Title"}
      FieldComponent={
        <input type="text" className="form-control" placeholder="Title" />
      }
    />
    <FormFieldItem
      label={"Content"}
      FieldComponent={
        <textarea type="text" className="form-control" placeholder="Description or Content"  rows={3}></textarea>
      }
    />
      <br />
      <FormFieldItem
        label={"Attachment"}
        FieldComponent={
          <>
            <input type="file" className="form-control" multiple />
          </>
        }
      />
    </>
  );
  var list = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <SectionHeading
        title="Modules"
        icon={<FontAwesomeIcon icon={faNoteSticky} />}
      />
      <span className="d-flex mb-2 justify-content-between">
        <span className="text-muted">{list.length} modules</span>

        <Button
          type="button"
          icon="pi pi-plus"
          size="small"
          className="theme-btn rounded py-1"
          label="Add New"
          onClick={() => setShowModal(true)}
        />
      </span>
      <Row className="row-cols-lg-2 g-2 row-cols-1">
        {list.map((x) => {
          return (
            <Col key={x}>
              <div className="shadow-sm overflow-hidden card">
                <div className="theme-bg-light p-2 px-3 d-flex align-items-center justify-content-between">
                <small className="text-muted fw-bold text-uppercase">
                  Introduction
                </small>
                <ButtonGroup>
                <Button type="button" text size="small" icon="pi pi-pencil" severity="secondary" className="p-0 rounded"/>
                <Button type="button" text size="small" severity="danger" icon="pi pi-trash" className="p-0 rounded"/>
                </ButtonGroup> </div>
                <div className="px-4 ">
                  <Button
                    type="button"
                    icon="pi pi-link"
                    text
                    label="FileName"
                  />
                  <Button
                    type="button"
                    icon="pi pi-link"
                    text
                    label="FileName"
                  />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <br />
      <EmptyState
        placeholder="No modules added yet, please click to add"
        action={() => setShowModal(true)}
      />
  <UploadModuleForm showForm={showForm} reqId={data?.id}/>
    </>
  );
};

ModuleSection.propTypes = {
  data: proptype.object,
};
export default ModuleSection;
