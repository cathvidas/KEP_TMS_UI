import { TabPanel, TabView } from "primereact/tabview";
import RateFieldItem from "../forms/common/RateFieldItem";
import proptype from "prop-types";
import userHook from "../../hooks/userHook";
import externalFacilitatorHook from "../../hooks/externalFacilitatorHook";
import oldTrainingsHook from "../../hooks/oldTrainingsHook";
const FacilitatorRatingExportTemplate = ({
  facilitators,
  facilitatorRating,
  oldSystem
}) => {
  const getFaciRating = (faci, fieldName) =>{
    const faciId = faci.facilitatorBadge ?? faci.externalFacilitatorId;
    const rating = facilitatorRating.find((faci)=> faci.facilitatorBadge === faciId?.toString());
    return rating ? rating[fieldName] : null;
  }
  return (
    <>
      {facilitators?.map((faci) => {
        return (
          <TabView className="custom-tab faciRatings" key={faci?.id}>
            <TabPanel
              header={oldSystem ? oldTrainingsHook.useOldSystemFacilitator(faci?.externalFacilitatorId)?.data?.fullname :
                !faci?.isExternal
                  ? userHook.useUserById(faci?.facilitatorBadge)?.data?.fullname
                  : externalFacilitatorHook?.useExternalFacilitatorById(
                      faci?.externalFacilitatorId
                    )?.data?.name
              }
              className="active"
            >
              <RateFieldItem
                label="Clarity of Presentation (delivery, platform skills, etc.)"
                value={getFaciRating(faci, "frOne")}
                readOnly
              />
              <RateFieldItem
                label="Mastery of subject matter"
                value={getFaciRating(faci, "frTwo")}
                readOnly
              />
              <RateFieldItem
                label="Managing discussions"
                value={getFaciRating(faci, "frThree")}
                readOnly
              />
              <RateFieldItem
                label="Motivates learning"
                value={getFaciRating(faci, "frFour")}
                readOnly
              />
              <RateFieldItem
                label="Balanced theory w/ real life applications/examples"
                value={getFaciRating(faci, "frFive")}
                readOnly
              />
              <RateFieldItem
                label="Clear & well organized lectures/activities (time management)"
                value={getFaciRating(faci, "frSix")}
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
  oldSystem: proptype.bool,
};
export default FacilitatorRatingExportTemplate;
