import Layout from "../components/General/Layout";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";
import CertificatesList from "../components/certificate/CertificatesList";
import SkeletonList from "../components/Skeleton/SkeletonList";
const CertificatesPage = () => {
  const { data, loading } = trainingRequestHook.useUserTrainingsSummary(
    SessionGetEmployeeId()
  );

  const contentBody = () => (
    <>
      {loading ? (
        <SkeletonList />
      ) : (
        <div className="px-3">
          <CertificatesList
            userId={SessionGetEmployeeId()}
            trainings={data?.attended}
          />
        </div>
      )}
    </>
  );
  return (
    <Layout
      navReference="Certificates"
      BodyComponent={contentBody}
      header={{
        title: "Training Certificates",
        icon: <i className="pi pi-trophy"></i>,
      }}
    />
  );
};

export default CertificatesPage;
