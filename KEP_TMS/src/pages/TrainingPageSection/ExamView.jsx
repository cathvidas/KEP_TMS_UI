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
const ExamView = ({ data }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [selectedExam, setSelectedExam] = useState({})
  const exam = examHook.useExamByRequestId(data?.id)
  console.log(exam)
  return (
    <>
      <SectionHeading title="Exams" icon={<i className="pi pi-box"></i>} />
      
      {showExam ? (
        <TraineeExamForm data={selectedExam} />
      ):
      <>
      <Row className="row-cols-1 row-cols-md-2 g-0">
        {exam?.loading ? <SkeletonList/>:
        exam?.exams?.map(item =>
          <>
        <Card
          title={item?.title}
          subTitle={`${item?.examQuestion?.length} Questions`}
          footer={
            <div className="text-end">
              <Button
                label="View Details"
                severity="secondary"
                icon="pi pi-eye"
                size="small"
                text
                className="rounded"
              />
              <Button
                type="button"
                label="Take Exam"
                size="small"
                icon="pi pi-pen-to-square"
                className="ms-2 rounded theme-bg"
                onClick={() => {setShowDialog(true);
                  setSelectedExam(item)
                }}
              />
            </div>
          }
          header={<img alt="Card" src={cardHeaderImg} />}
          className="md:w-25rem"
        >
        
        </Card>
          </>
        )
        }
      </Row>
      <ExamConfirmDialog
        handleClose={() => setShowDialog(false)}
        handleShow={showDialog}
        handleOnclick={()=>setShowExam(true)}
      />
      </>}
    </>
  );
};
ExamView.propTypes = {
  data: proptype.object,
};
export default ExamView;
