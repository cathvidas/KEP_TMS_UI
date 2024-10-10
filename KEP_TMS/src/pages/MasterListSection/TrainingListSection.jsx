import { SectionBanner } from "../../components/General/Section";
import trainingRequestHook from "../../hooks/trainingRequestHook";

const TrainingListSection = ({trainingType}) => {
    const {data, error, loading} = trainingRequestHook.useAllTrainingRequests(0, trainingType)
    console.log(data)
    return (<>
    <SectionBanner title="Training List"/>

    </>)
}
export default TrainingListSection;