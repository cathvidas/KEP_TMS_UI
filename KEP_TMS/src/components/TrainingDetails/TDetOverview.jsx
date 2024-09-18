import { useEffect, useState } from "react";
import { DetailItem, Heading } from "./DetailItem";
import proptype from "prop-types";
import { getTrainingProgramById, getTrainingCategoryById,getTrainingProviderById } from "../../services/trainingServices";
import { getTrainingTypeById } from "../../services/MasterListServices";
const TDOverview = ({ id , formData}) => {
  const [option, setOption] = useState({ program: "", category: ""});

  useEffect(() => {
    const getData = async () => {
      const program = await getTrainingProgramById(formData.trainingProgramId);
      const category = await getTrainingCategoryById(formData.categoryId);
      const provider = await getTrainingProviderById(formData.trainingProviderId);
      setOption({ program: program.data.name, category: category.name , provider: provider.name});
    };
    getData();
  }, []);
  return (
    <div>
      <Heading value="Details" />
      <DetailItem
        label="Request Type"
        value={getTrainingTypeById(formData.trainingTypeId ?? +localStorage.getItem("request-type")) ?? "N/A"}
      />
      <DetailItem
        label="Program"
        value={option.program?? "N/A"}
      />
      <DetailItem
        label="Category"
        value={option.category ?? "N/A"}
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
        value={option?.provider ?? "N/A"}
      />
    </div>
  );
};
TDOverview.propTypes = {
  id: proptype.number,
  formData: proptype.object,
};
export default TDOverview;
