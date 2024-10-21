import { Card } from "react-bootstrap";
import ActivityLog from "../../components/General/ActivityLog";
import proptype from "prop-types";
import { useState } from "react";
import { Button } from "primereact/button";
const ActivityLogView = ({ logs }) => {
    const [isDescending, setIsDescending] = useState(true);

  return (
    <>
      <Card>
        <Card.Body>
            <div className="flex">
            <h6 className="m-0">Activity Logs</h6>
            <Button type="button" size="small" className="py-0 rounded" text icon={`pi ${isDescending ? 'pi-sort-amount-down-alt': 'pi-sort-amount-up-alt'}`}  onClick={() => setIsDescending(!isDescending)} />
            </div>
        <ActivityLog items={logs} isDescending={isDescending}/>
        </Card.Body>
      </Card>
    </>
  );
};
ActivityLogView.propTypes = {
  logs: proptype.array,
};
export default ActivityLogView;
