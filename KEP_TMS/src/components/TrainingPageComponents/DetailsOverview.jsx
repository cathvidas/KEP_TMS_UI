import { Col, Row } from "react-bootstrap";
import DetailItem from "./DetailItem";
import proptype from "prop-types";
import { formatCurrency, formatDateOnly } from "../../utils/datetime/Formatting";
import { formatTotalTime } from "../../utils/datetime/FormatDateTime";
import calculateTotalHours from "../../utils/datetime/calculateTotalHours";
const DetailsOverview = ({ data }) => {
  return (
    <div>
      <Row className="g-0 border-top  border-end border-bottom">
        <Col className="col-12 col-md-4">
          <DetailItem
            label="Program"
            value={data?.trainingProgram?.name ?? "N/A"}
          />
        </Col>
        <Col className="col-12 col-md-4">
          <DetailItem
            label="Category"
            value={data?.trainingCategory?.name ?? "N/A"}
          />
        </Col>
        <Col className="col-12 col-md-4">
          <DetailItem
            label="Provider"
            value={data?.trainingProvider?.name ?? "N/A"}
          />
        </Col>
        <Col className="col-12">
          <DetailItem
            label="Objective"
            value={data?.trainingObjectives ?? "N/A"}
            textStyle=" "
          />
        </Col>
        <Col className="col-12 col-md-3">
          <DetailItem label="Venue" value={data?.venue ?? "N/A"} />
        </Col>
        <Col className="col-12 col-md-3">
          <DetailItem
            label="Start Date"
            value={formatDateOnly(data?.trainingStartDate)}
          />
        </Col>
        <Col className="col-12 col-md-3">
          <DetailItem
            label="End Date"
            value={formatDateOnly(data?.trainingEndDate)}
          />
        </Col>
        <Col className="col-12 col-md-3">
          <DetailItem
            label="Total Hours"
            value={formatTotalTime(calculateTotalHours(data?.trainingDates))}
          />
        </Col>
        <Col className="col-6 col-md-3">
          <DetailItem
            label="Training Fee"
            value={formatCurrency(data?.trainingFee)}
          />
        </Col>
        <Col className="col-6 col-md-3">
          <DetailItem
            label="Total Training Cost"
            value={formatCurrency(data?.totalTrainingFee)}
          />
        </Col>
        <Col className="col-6 col-md-3">
          <DetailItem
            label="Discounted Rate"
            value={formatCurrency(data?.discountedRate)}
          />
        </Col>
        <Col className="col-6 col-md-3">
          <DetailItem
            label="Cut-off Date"
            value={formatDateOnly(data?.cutOffDate)}
          />
        </Col>
      </Row>
    </div>
  );
};
DetailsOverview.propTypes = {
  id: proptype.number,
  data: proptype.object,
};
export default DetailsOverview;
