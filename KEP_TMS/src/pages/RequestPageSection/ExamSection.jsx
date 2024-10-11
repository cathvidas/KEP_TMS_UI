import { useEffect, useState } from "react";
import { FormFieldItem } from "../../components/trainingRequestFormComponents/FormElements";
import { Col, Modal, Row } from "react-bootstrap";
import { SectionHeading } from "../../components/General/Section";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";
import TrainingExamForm from "../../components/forms/TrainingExamForm";
import proptype from "prop-types";
import { SessionGetEmployeeId } from "../../services/sessions";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import examService from "../../services/examService";
import examHook from "../../hooks/examHook";
import SkeletonList from "../../components/Skeleton/SkeletonList"
import { useNavigate } from "react-router-dom";

const ExamSection = ({ data }) => {
  const [examData, setExamData] = useState({});
  const [examList, setExamList] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [modalDetail, setModalDetail] = useState({showModal: false, buttonFunction: null});
  const [formDetail, setFormDetail] = useState({showModal: false, buttonFunction: null});
  const [defaultData, setDefaultData] = useState(null);
  const { exams, error, loading } = examHook.useExamByRequestId(data.id);
  const [isLocal, setIsLocal] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    refreshData();
  }, [exams]);
  const refreshData = () => {
    if(exams?.length > 0) {
      setExamList(exams);
      setIsLocal(false)
    }else{
      setIsLocal(true)
      const details = JSON?.parse(localStorage.getItem("examDetails"));
      let updatedList = [];
      if(details){
       updatedList = [details];}
       setExamList(updatedList);
      setModalDetail({...modalDetail, buttonFunction: saveInitialDetail})

    }
  };
  const saveInitialDetail = () => {
    if (examTitle != null) {
      const data = { ...examData, title: examTitle };
      localStorage.setItem("examDetails", JSON.stringify(data));
      setFormDetail({...formDetail, showModal: true})
      refreshData();
    }
  };
  const removeInitialDetail = () =>{
    localStorage.removeItem("examDetails");
    refreshData();
  }
  const removeExamQuestion = (index) => {
    const examQuestions = examData?.examQuestion ?? [];
    examQuestions?.splice(index, 1);
    localStorage.setItem(
      "examDetails",
      JSON.stringify({ ...examData, examQuestion: examQuestions })
    );
    refreshData();
  };
  const uploadExam = (index) => {
    const savedData = JSON.parse(localStorage.getItem("examDetails"));
    const updatedData = {
      ...savedData,
      trainingRequestId: data.id,
      createdBy: SessionGetEmployeeId(),
    };
    confirmAction({
      title: "Upload Exam",
      text: "Are you sure you want to upload this exam?",
      onConfirm: () => {
        handleResponseAsync(
          () => examService.createExam(updatedData),
          (e) => {
            actionSuccessful("Success!", e?.message)
          },
          (e) => actionFailed("Error!", e.message),
          () => {
            localStorage.removeItem("examDetails");
            navigate(`/KEP_TMS/TrainingRequest/${data?.id}/Exams`);
          }
        );
      },
    });
  };
  const updateExamQuestion = (data)=>{
    console.log(data)
  }
  return (
    <>
      {loading ? (
        <SkeletonList />
      ) : (
        <>
          <SectionHeading
            title="Questionnaire"
            icon={<i className="pi pi-question-circle"></i>}
          />
          {examList?.length > 0 ? (
            examList?.map((item, index) => {
              return (
                <div
                  key={item}
                  className="rounded shadow-sm card border overflow-hidden"
                >
                  <h4 className="theme-bg2 p-2 px-3">{item?.title}</h4>
                  {item?.examQuestion?.length > 0 ? (
                    <>
                      <span className="flex  px-3 justify-content-between">
                        <span className="text-muted">
                          {`${item?.examQuestion?.length} items`}{" "}
                        </span>
                        <Button
                          type="button"
                          icon="pi pi-plus"
                          size="small"
                          className="theme-btn rounded py-1"
                          label="Add question"
                          onClick={() => setFormDetail({...formDetail, showModal: true})}
                        />
                      </span>
                      <Row className="row-cols-lg-2  p-3 g-2 row-cols-1">
                        {item?.examQuestion?.map((x, index) => {
                          return (
                            <Col key={`item-${index}`}>
                              <div className="overflow-hidden border rounded">
                                <div className="theme-bg-light p-2 px-3 d-flex align-items-center justify-content-between">
                                  <small className="text-muted fw-bold text-uppercase">
                                    Question #{index + 1}
                                  </small>
                                  <ButtonGroup>
                                    <Button
                                      type="button"
                                      text
                                      size="small"
                                      icon="pi pi-pencil"
                                      severity="secondary"
                                      className="p-0 rounded"
                                      style={{ width: "1.5rem" }}
                                      onClick={() => {
                                        setFormDetail({...formDetail, showForm: true, buttonFunction: updateExamQuestion});
                                        setDefaultData({
                                          index: index,
                                          defaultData: x,
                                        });
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      text
                                      size="small"
                                      severity="danger"
                                      icon="pi pi-trash"
                                      className="p-0 rounded"
                                      style={{ width: "1.5rem" }}
                                      onClick={() => removeExamQuestion(index)}
                                    />
                                  </ButtonGroup>{" "}
                                </div>
                                <div className="px-3 py-2">
                                  <p className="m-0">{x.content}</p>
                                  {x?.answerOptions?.map((y, i) => {
                                    return (
                                      <div key={i} className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={y.isCorrect}
                                          disabled
                                        />
                                        <label className="">{y.content}</label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </>
                  ) : (
                      <EmptyState
                        placeholder="No Questions added yet, please click to add"
                        action={() => setFormDetail({...formDetail, showModal: true})}
                      />
                    
                  )}
                  {isLocal &&
                  <div className="text-end p-3 border-top">
                    <Button
                      icon="pi pi-trash"
                      label="Delete"
                      severity="danger"
                      className="rounded py-1"
                      type="button"
                      onClick={()=>removeInitialDetail()}
                    />
                    <Button
                      icon="pi pi-pen-to-square"
                      label={isLocal ?"Upload Exam": "Edit Questionnaire"}
                      className="rounded ms-2 py-1"
                      type="button"
                      onClick={uploadExam}
                      // onClick={() => {
                      //   setModalDetail({
                      //     ...modalDetail,
                      //     showModal: true,
                      //     buttonFunction: "",
                      //     modalTitle: "Edit Exam Title",
                      //   });
                      //   setExamTitle(item.title);
                      // }}
                    />
                  </div>}
                </div>
              );
            })
          ) : (
            <EmptyState
              placeholder="No Exam added yet, please click to Add."
              action={() =>
                setModalDetail({
                  ...modalDetail,
                  showModal: true,
                  buttonFunction: saveInitialDetail,
                  modalTitle: "Add Exam Title",
                })
              }
            />
          )}

        </>
      )}

      <TrainingExamForm
        reqId={data?.id}
        handleOnChange={refreshData}
        defaultData={defaultData}
        setDefaultData={() => setDefaultData(null)}
        formDetail={formDetail}
        setFormDetail={(e)=>setFormDetail(e)}
      />

      <Modal
        show={modalDetail.showModal}
        onHide={() => setModalDetail({ ...modalDetail, showModal: false })}
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>
            {modalDetail.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">
          <FormFieldItem
            label={"Exam Title"}
            FieldComponent={
              <>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                />
              </>
            }
          />
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            type="button"
            label="Cancel"
            onClick={() => setModalDetail({ ...modalDetail, showModal: false })}
            className="p-button-text rounded"
          />
          <Button
            type="button"
            label="Save"
            icon="pi pi-save"
            onClick={()=>{
              saveInitialDetail();
              setModalDetail({...modalDetail, showModal: false});}}
            className="rounded"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
ExamSection.propTypes = {
  data: proptype.object,
};
export default ExamSection;
