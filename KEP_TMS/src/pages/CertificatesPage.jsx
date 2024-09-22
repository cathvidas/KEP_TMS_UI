
import Layout from '../components/General/Layout'
import ScalarMeasurement from '../components/General/ScalarMeasurement';
const CertificatesPage=() =>{

    const conteneBody =()=> (
      <><ScalarMeasurement/></>
    )
    return (
      <Layout BodyComponent={conteneBody} header={{title: "Storage"}}/>
    )
}

export default CertificatesPage;

        