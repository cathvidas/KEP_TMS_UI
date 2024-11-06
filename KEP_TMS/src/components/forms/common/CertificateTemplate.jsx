import proptype from "prop-types";
import { GenerateTrainingDates } from "../../../utils/datetime/Formatting";
const CertificateTemplate = ({ trainings }) => {
  return (
    <>
      <div className="p-5">
        <h4 className="text-uppercase text-center">Training Certification</h4>
        <p>To whom It may Concern</p>
        <p>
          This is to certify that Ms. Name has undergone the following training
          programs in the company
        </p>

        <table
          className="table table-bordered "
          style={{ verticalAlign: "middle" }}
        >
          <thead>
            <tr className="text-center" style={{ verticalAlign: "middle" }}>
              <th>Training Title</th>
              <th>Training Date</th>
              <th>Training Hours</th>
            </tr>
          </thead>
          <tbody>
            {trainings?.map((training) => (
              <tr key={training.id}>
                <td>{training.trainingProgram?.name}</td>
                <td>{GenerateTrainingDates(training.trainingDates)}</td>
                <td className="text-center">
                  {training.durationInHours} hours
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
