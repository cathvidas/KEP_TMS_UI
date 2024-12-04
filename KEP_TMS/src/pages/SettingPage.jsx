import { UserTypeValue } from "../api/constants"
import ApproverPendingsEmailTemplate from "../components/email/ApproverPendingsEmailTemplate";
import Layout from "../components/General/Layout";
import { SessionGetRole } from "../services/sessions"
import NotFoundPage from "./NotFoundPage";
import EmailIntervalSetting from "./SettingPageSection/EmailIntervalSetting";

const SettingPage = () => {
  const content = () => {
    return <div className="p-3"><EmailIntervalSetting />
    <ApproverPendingsEmailTemplate/></div> 
  };
  return SessionGetRole() === UserTypeValue.ADMIN ? (
    <Layout
      navReference="Setting"
      header={{ title: "Settings", icon: <i className="pi pi-cog"></i>, hide:true }}
      BodyComponent={content}
    />
  ) : (
    <NotFoundPage />
  );
};
export default SettingPage;