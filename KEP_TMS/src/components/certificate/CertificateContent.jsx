import proptype from "prop-types";
import {
  GenerateTrainingDates,
  getMonthInString,
} from "../../utils/datetime/Formatting";
const CertificateContent = ({ trainings, isFacilitator, userDetail }) => {
  const getDateToday = () => {
    const today = new Date();
    let dayString = "";
    switch (today.getDate()) {
      case 0:
        dayString = "st";
        break;
      case 1:
        dayString = "nd";
        break;
      case 2:
        dayString = "rd";
        break;
      default:
        dayString = "th";
    }
    return `${today.getDate()}${dayString} day of ${getMonthInString(
      today.getMonth() + 1
    )}, ${today.getFullYear()}`;
  };
  return (
    <>
      <div>
        <center>
          <h4 style={{ textAlign: "center" }}>TRAINING CERTIFICATION</h4>
        </center>
        <p></p>
        <p>To whom It may Concern:</p>
        <p></p>
        <p>
          This is to certify that <strong>{userDetail?.fullname ?? "Trainee Name"}</strong> has {isFacilitator ? "facilitated" : "undergone"} the following training programs in the company:
        </p>
        {trainings?.length > 0 ? (
          <>
            <table
              className=" table-bordered "
              style={{
                verticalAlign: "middle",
                padding: " 1px",
                background: " transparent",
                borderColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <thead>
                <tr>
                  <th>
                    <p
                      style={{
                        verticalAlign: "middle",
                        padding: "10px",
                      }}
                    >
                      Training Title
                    </p>
                  </th>
                  <th 
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "10px",
                      }}>
                      Training Provider
                  </th>
                  <th 
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "10px",
                      }}>
                      Training Date
                  </th>
                  <th
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "10px",
                      }}>
                      Training Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {trainings?.map((training) => (
                  <tr key={training.id}>
                  <td style={{ padding: "10px" }}>
                    {training.trainingProgram?.name}
                  </td>
                    <td style={{ padding: "10px" }}>
                      {training?.trainingProvider?.name ?? "Knowles Electronics (Philippines) Corporation"}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {GenerateTrainingDates(training.trainingDates)}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <p
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        {training.durationInHours} {training.durationInHours > 1 ? "hours" : "hour"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            {" "}
            <br />
            <p style={{ textAlign: "center" }}>
              <span
                style={{
                  color: "grey",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                There are no trainings yet.
              </span>
            </p>
            <br />
          </>
        )}{" "}
        <p>
          This certification is made upon the request of{" "}
          <strong>
            <u>Requestor Name</u>
          </strong>{" "}
          as [<i>Purpose of Certification</i>].
          <br />
          <br /> Done in Lapu-lapu City, Cebu, Philippines this {getDateToday()}
          .
        </p>
        <br />
        <span className="signatory-container"></span>
        <br />
      </div>
    </>
  );
};
CertificateContent.propTypes = {
  trainings: proptype.array,
  userDetail: proptype.object,
  isFacilitator: proptype.bool, 
};
export default CertificateContent;
