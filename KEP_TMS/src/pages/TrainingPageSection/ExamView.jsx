import proptype from "prop-types";
import { SectionHeading } from "../../components/General/Section";
import { useEffect, useState } from "react";
import ExamConfirmDialog from "../../components/Modal/ExamConfirmDialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Col, Row } from "react-bootstrap";
import cardHeaderImg from "../../img/examHeader.png";
import TraineeExamForm from "../../components/forms/ModalForms/TraineeExamForm";
import examHook from "../../hooks/examHook";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import { SessionGetEmployeeId } from "../../services/sessions";
import ExamDetails from "../../components/Exam/ExamDetails";
import { saveTraineeExamApi } from "../../api/examApi";
import getTraineeExamDetail from "../../services/common/getTraineeExamDetail";
const ExamView = ({ data }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [showExam, setShowExam] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const getUser = data?.trainingParticipants?.find(
    (item) => item.employeeBadge === SessionGetEmployeeId()
  );
  const [showTraineeExam, setShowTraineeExam] = useState(false);
  const examList = examHook.useAllTraineeExamByRequest(data?.id, trigger);
  useEffect(() => {
    const insertData = async () => {
      const examLog = JSON.parse(localStorage.getItem("examLog"));
      if (examLog) {
        const response = await saveTraineeExamApi(examLog);
        if (response.status === 1) {
          localStorage.removeItem("examLog");
        }
      }
    };
    insertData();
  }, []);
const getExamDetail =(data)=>{
  return getTraineeExamDetail(data, SessionGetEmployeeId())
}
  useEffect(() => {
    if (selectedExam?.examDetail?.id) {
      setSelectedExam(
        examList?.data?.find(
          (item) => item.examDetail?.id === selectedExam?.examDetail?.id
        )
      );
    }
  }, [examList?.data]);
  return (
    <>
      <SectionHeading title="Exams" icon={<i className="pi pi-box"></i>} />
      {showTraineeExam ? (
        <ExamDetails
          handleClose={() => {
            setShowTraineeExam(false);
            setSelectedExam({});
          }}
          traineeExam={getExamDetail(selectedExam)?.detail[0]}
          examDetail={selectedExam?.examDetail}
        />
      ) : showExam ? (
        <TraineeExamForm
          data={selectedExam?.examDetail}
          examCount={getExamDetail(selectedExam)?.detail?.length}
          closeForm={() => setShowExam(false)}
          handleRefresh={() => setTrigger((prev) => prev + 1)}
        />
      ) : (
        <>
          {examList?.loading ? (
            <SkeletonList />
          ) : (
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 ">
              {examList?.data?.map((item) => (
                <Col key={`ex${item?.examDetail?.id}`}>
                  <Card
                    className="h-100"
                    title={item?.examDetail?.title}
                    subTitle={`${item?.examDetail?.questionLimit} items`}
                    footer={
                      <div className="text-center">
                        {getUser?.id ? (
                          getExamDetail(item)?.submitted ? (
                            getExamDetail(item)?.detail?.length < 3 &&
                            !getExamDetail(item)?.isPassed ? (
                              <Button
                                label="Retake"
                                icon="pi pi-pencil"
                                size="small"
                                className="rounded"
                                onClick={() => {
                                  setShowDialog(true);
                                  setSelectedExam(item);
                                }}
                              />
                            ) : (
                              <Button
                                label="View Details"
                                severity="success"
                                icon="pi pi-eye"
                                size="small"
                                outlined
                                className="rounded theme-color"
                                onClick={() => {
                                  setShowTraineeExam(true);
                                  setSelectedExam(item);
                                }}
                              />
                            )
                          ) : (
                            <Button
                              type="button"
                              label="Take Exam"
                              size="small"
                              icon="pi pi-pen-to-square"
                              className="ms-2 rounded theme-bg"
                              onClick={() => {
                                setShowDialog(true);
                                setSelectedExam(item);
                              }}
                            />
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    }
                    header={
                      <div className="position-relative">
                        <img alt="Card" src={cardHeaderImg} />
                        {getExamDetail(item)?.submitted && (
                          <div
                            className={`position-absolute top-0 flex justify-content-center h1 w-100 h-100 bg-opacity-25 ${
                              getExamDetail(item)?.isPassed
                                ? "bg-success text-success"
                                : "bg-danger text-danger"
                            }  `}
                          >
                            {getExamDetail(item)?.isPassed
                              ? "PASSED"
                              : "FAILED"}
                          </div>
                        )}
                      </div>
                    }
                  ></Card>
                </Col>
              ))}
            </Row>
          )}
          <ExamConfirmDialog
            handleClose={() => setShowDialog(false)}
            handleShow={showDialog}
            handleOnclick={() => setShowExam(true)}
          />
        </>
      )}
    </>
  );
};
ExamView.propTypes = {
  data: proptype.object,
};
export default ExamView;
