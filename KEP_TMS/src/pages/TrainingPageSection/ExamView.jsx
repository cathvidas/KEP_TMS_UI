import proptype from "prop-types";
import { SectionHeading } from "../../components/General/Section";
import { useState } from "react";
import ExamConfirmDialog from "../../components/Modal/ExamConfirmDialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Row } from "react-bootstrap";
import cardHeaderImg from "../../img/examHeader.png";
import TraineeExamForm from "../../components/forms/ModalForms/TraineeExamForm";
import examHook from "../../hooks/examHook";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import { SessionGetEmployeeId } from "../../services/sessions";
import ExamDetails from "../../components/Exam/ExamDetails";
const ExamView = ({ data }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [selectedExam, setSelectedExam] = useState({})
  const exam = examHook.useExamByRequestId(data?.id)
  const getUser = data?.trainingParticipants?.find((item) => item.employeeBadge === SessionGetEmployeeId());
  const traineeExam = examHook.useTraineeExam(getUser?.traineeExamId)
  const [showTraineeExam, setShowTraineeExam] = useState(false);
  return (
    <>
      <SectionHeading title="Exams" icon={<i className="pi pi-box"></i>} />
      {showTraineeExam ?
    <ExamDetails handleClose={()=>setShowTraineeExam(false)} traineeExam={traineeExam?.data} examDetail={exam?.exams[0]}/>:
      showExam ? (
        <TraineeExamForm data={selectedExam} />
      ) : (
        <>
          {exam?.loading ? (
            <SkeletonList />
          ) : (
            exam?.exams?.map((item) => (
              <>
                <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 g-0">
                  <Card
                    title={item?.title}
                    subTitle={`${item?.questionLimit} items`}
                    footer={
                      <div className="text-center">
                        {getUser?.id ? traineeExam?.data?.examId === item?.id ? 
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
                        />:
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
                          />: <></>}
                      </div>
                    }
                    header={<img alt="Card" src={cardHeaderImg} />}
                    className="md:w-25rem"
                  ></Card>
                </Row>
              </>
            ))
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
