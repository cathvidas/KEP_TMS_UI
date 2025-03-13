import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import proptype from "prop-types";
import examHook from "../../hooks/examHook";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import cardHeaderImg from "../../img/examHeader.png";
import { Card } from "primereact/card";
import ExamForm from "../../components/forms/ExamForm";
import { SectionHeading } from "../../components/General/Section";
import trainingDetailsService from "../../services/common/trainingDetailsService";

const ExamSection = ({ data }) => {
  const [trigger, setTrigger] = useState(0);
  const { exams, loading } = examHook.useExamByRequestId(data.id, trigger);
  const [showForm, setShowForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const refreshData = () => {
    setTrigger((prev) => prev+1);
    setShowForm(false);
    setSelectedExam(null);
  };
  return (
    <>
      <SectionHeading
        title="Exam/Questionnaire"
        icon={<i className="pi pi-list-check"></i>}
      />
      {!showForm && (
        <>
          <span className="d-flex mb-2 justify-content-between">
            <span className="text-muted">{exams.length} exams</span>
            <Button
              type="button"
              icon="pi pi-plus"
              size="small"
              className="theme-btn rounded py-1"
              label="Add New"
              onClick={() => {
                setShowForm(true);
                setSelectedExam(null);
              }}
            />
          </span>
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {exams?.map((item) => (
              <>
                <Col>
                  <Card
                    title={item?.title}
                    subTitle={`${item?.examQuestions?.length} Questions`}
                    footer={
                      <div className="text-center">
                        <Button
                          type="button"
                          label="View Details"
                          size="small"
                          icon="pi pi-pen-to-square"
                          className="ms-2 rounded theme-bg"
                          onClick={() => {
                            setShowForm(true);
                            setSelectedExam(item);
                          }}
                        />
                      </div>
                    }
                    header={<img alt="Card" src={cardHeaderImg} />}
                    className="md:w-25rem"
                  ></Card>
                </Col>
              </>
            ))}
          </Row>
        </>
      )}
      {showForm && (
        <ExamForm
          defaultData={selectedExam ?? null}
          handleRefresh={refreshData}
          reqId={data.id}
          closeForm={() => setShowForm(false)}
          readOnly={(trainingDetailsService.checkTrainingScheduleStatus(data)?.isUpcoming || !selectedExam)? false : true}
        />
      )}
      {loading ? <SkeletonList /> : <></>}
    </>
  );
};
ExamSection.propTypes = {
  data: proptype.object,
};
export default ExamSection;
