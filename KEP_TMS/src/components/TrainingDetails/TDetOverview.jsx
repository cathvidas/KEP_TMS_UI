import { useEffect, useState } from "react";
import { DetailItem, Heading } from "./DetailItem";
import proptype from "prop-types";
import { getTrainingProgramById, getTrainingCategoryById,getTrainingProviderById } from "../../api/trainingServices";
import { getTrainingTypeById } from "../../services/MasterListServices";
const TDOverview = ({ id , formData}) => {
  const [option, setOption] = useState({ program: "", category: ""});
console.log(formData)
  return (
    <div>
      <DetailItem
        label="Program"
        value={formData?.trainingProgram?.name?? "N/A"}
      />
      <DetailItem
        label="Category"
        value={formData?.trainingCategory?.name ?? "N/A"}
      />
      <DetailItem
        label="Objective"
        value={formData?.trainingObjectives?? "N/A"}
      />
      <DetailItem
        label="Venue"
        value={formData?.venue ??  "N/A"}
      />
      <DetailItem
        label="Provider"
        value={formData?.trainingProvider?.name ?? "N/A"}
      />
    </div>
  );
};
TDOverview.propTypes = {
  id: proptype.number,
  formData: proptype.object,
};
export default TDOverview;
