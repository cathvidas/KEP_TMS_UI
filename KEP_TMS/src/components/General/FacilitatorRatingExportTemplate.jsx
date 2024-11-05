import { TabPanel, TabView } from "primereact/tabview";
import RateFieldItem from "../forms/common/RateFieldItem";
import proptype from "prop-types";
const FacilitatorRatingExportTemplate = ({
  facilitators,
  facilitatorRating,
}) => {
  return (
    <>
      {facilitators?.map((faci, index) => {
        return (
          <TabView className="custom-tab faciRatings" key={faci?.id}>
            <TabPanel header={faci?.fullname} className="active">
              <RateFieldItem
                label="Clarity of Presentation (delivery, platform skills, etc.)"
                value={facilitatorRating[index]?.frOne}
                readOnly
              />
              <RateFieldItem
                label="Mastery of subject matter"
                value={facilitatorRating[index]?.frTwo}
                readOnly
              />
              <RateFieldItem
                label="Managing discussions"
                value={facilitatorRating[index]?.frThree}
                readOnly
              />
              <RateFieldItem
                label="Motivates learning"
                value={facilitatorRating[index]?.frFour}
                readOnly
              />
              <RateFieldItem
                label="Motivates learning"
                value={facilitatorRating[index]?.frFive}
                readOnly
              />
              <RateFieldItem
                label="Balanced theory w/ real life applications/examples"
                value={facilitatorRating[index]?.frSix}
                readOnly
              />
              <RateFieldItem
                label="Clear & well organized lectures/activities (time management) 5"
                value={facilitatorRating[index]?.frAverage}
                readOnly
              />
            </TabPanel>
          </TabView>
        );
      })}
    </>
  );
};
FacilitatorRatingExportTemplate.propTypes = {
  facilitatorRating: proptype.array,
  facilitators: proptype.array,
};
export default FacilitatorRatingExportTemplate;
