import { icon } from "@fortawesome/fontawesome-svg-core";
import Layout from "../components/General/Layout";
import TRequestTable from "../components/General/TRequestTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";

const CertificatesPage = () => {
  const content =()=> (

    <TRequestTable/>
  )
  return (
    <>
      <Layout 
      header={{title: "Certificates", icon: <FontAwesomeIcon icon={faAward}/>}}
      BodyComponent={content
      }/>
    </>
  );
};
export default CertificatesPage;
