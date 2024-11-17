import { Card } from "react-bootstrap";
import { Badge } from "primereact/badge";
import { SectionTitle } from "../General/Section";
import { useState } from "react";
import { Button } from "primereact/button";
import proptype from "prop-types"
import { useNavigate } from "react-router-dom";
import { APP_DOMAIN } from "../../api/constants";
const PendingActionsSection = ({items}) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-4 mt-xl-0">
        <div className="flex">
          <SectionTitle title="Pending Activities" />
          {items.length > 0 && <Badge value={items.length} className="ml-2" />}
        </div>
        {/* <hr /> */}
        <div className="p-2 list">
          {items?.length > 0 ? (
            items?.map(
              (item, index) =>
                ((!showAll && index < 5) || showAll) && (
                  <>
                    <Card.Body onClick={()=>navigate(`${APP_DOMAIN}/${item?.link}`)} className="cursor-pointer border-bottom theme-hover-light p-2" >
                      <div className="flex">
                        <Card.Title
                          className="m-0"
                          style={{ fontSize: "1.2rem" }}
                        >
                          {item?.title}
                        </Card.Title>
                        {/* <Badge
                          value="Pending"
                          size="small"
                          style={{
                            fontSize: "0.75rem",
                            minWidth: "1rem",
                            minHeight: "1rem",
                            height: "unset",
                            lineHeight: "unse",
                          }}
                        /> */}
                      </div>
                      <div className="border-start ps-2 mb-1" style={{borderWidth: "5px"}}>
                      <small className=" mb-2 text-muted"><em>
                      {item?.program}</em>
                      </small></div>
                      <small>
                      {item?.detail}</small>
                    </Card.Body>
                  </>
                )
            )
          ) : (
            <p className="text-muted">No Pending Activites Available
            </p>
          )}
          {items?.length > 5 && (
            <div className="text-center">
              <Button
                label={showAll ? "View Less" : "View All"}
                text
                type="button"
                icon={`pi pi-angle-${showAll ? "up" : "down"}`}
                onClick={() => setShowAll(!showAll)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
PendingActionsSection.propTypes = {
  items: proptype.array
}
export default PendingActionsSection;
