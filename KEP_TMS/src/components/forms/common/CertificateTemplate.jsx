import proptype from "prop-types";
import { GenerateTrainingDates } from "../../../utils/datetime/Formatting";
const CertificateTemplate = ({ trainings }) => {
  return (
    <>
      <div className="p-5">
        <center>
        <h4 style={{textAlign: "center"}}>TRAINING CERTIFICATION</h4></center>
        <p>To whom It may Concern</p>
        <p>
          This is to certify that Ms. Name has undergone the following training
          programs in the company
        </p>

        <table
          className="table table-bordered "
          style={{ verticalAlign: "middle", textAlign: "center"}}
        >
          <thead>
            <tr >
              <th><p style={{ verticalAlign: "middle" , textAlign: "center"}}>Training Title</p></th>
              <th><p style={{ verticalAlign: "middle" , textAlign: "center"}}>Training Date</p></th>
              <th><p style={{ verticalAlign: "middle" , textAlign: "center"}}>Training Hours</p></th>
            </tr>
          </thead>
          <tbody>
            {trainings?.map((training) => (
              <tr key={training.id}>
                <td>{training.trainingProgram?.name}</td>
                <td>{GenerateTrainingDates(training.trainingDates)}</td>
                <td><p style={{ verticalAlign: "middle" , textAlign: "center"}}>
                  {training.durationInHours} hours</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          This certification is made upon the request of Ms. Bentillo as a
          requirement of her application for the Expanded Tertiary Education and
          Accreditition Program (ETEEAP) with the University of San Jose -
          Recoletos. Done in Lapu-lapu City, Cebu, Philippines this 10th day of
          January, 2023.
        </p>
      </div>
    </>
  );
};
CertificateTemplate.propTypes = {
  trainings: proptype.array,
};
export default CertificateTemplate;
