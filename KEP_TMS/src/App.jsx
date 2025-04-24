import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NewRequest from "./pages/Request";
import RequestList from "./pages/RequestList";
import Trainings from "./pages/Trainings";
import CertificatesPage from "./pages/CertificatesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import TrainerPage from "./pages/TrainerPage";
import ApproverPage from "./pages/ApproverPage";
import UserPage from "./pages/UsersPage";
import MasterListPage from "./pages/MasterListPage";
import TrainingDetailPage from "./pages/TrainingDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingPage from "./pages/SettingPage";
import DocumentsPage from "./pages/DocumentsPage";
import SessionTimeout from './components/General/SessionTimeout';  
import OldTrainingDetailPage from "./pages/OldTrainingDetailPage";
import PreviousUrlProvider from "./components/General/PreviousUrlProvider";
import ProfilePage from "./pages/ProfilePage";
import { APP_DOMAIN } from "./api/constants";
function App() {
  return (
    <>
      <SessionTimeout />
      <PreviousUrlProvider>
      <Routes>
        <Route path="/" element={<Navigate to={APP_DOMAIN} />} />
        <Route path={APP_DOMAIN} element={<Login />} />
        <Route path={`${APP_DOMAIN}/Dashboard`} element={<Dashboard />} />
        <Route path={`${APP_DOMAIN}/Request/:type?/:id?`} element={<NewRequest />} />
        <Route path={`${APP_DOMAIN}/RequestList/:type?`} element={<RequestList />} />
        <Route path={`${APP_DOMAIN}/Trainings/:page?`} element={<Trainings />} />
        <Route path={`${APP_DOMAIN}/FacilitatedTrainings`} element={<TrainerPage />} />
        <Route path={`${APP_DOMAIN}/List/:type/:page?`} element={<ApproverPage />} />
        <Route path={`${APP_DOMAIN}/MasterList/:category?/:type?`} element={<MasterListPage />} />
        <Route path={`${APP_DOMAIN}/Certificates`} element={<CertificatesPage />} />
        <Route path={`${APP_DOMAIN}/AnalyticsPage`} element={<AnalyticsPage />} />
        <Route path={`${APP_DOMAIN}/TrainingDetail/:id/:page?/:section?`} element={<TrainingDetailPage />} />
        <Route path={`${APP_DOMAIN}/OldTrainingDetail/:type/:id/:page?/:section?`} element={<OldTrainingDetailPage />} />
        <Route path={`${APP_DOMAIN}/Users/:page?/:id?`} element={<UserPage />} />
        <Route path={`${APP_DOMAIN}/Setting`} element={<SettingPage />} />
        <Route path={`${APP_DOMAIN}/Videos`} element={<DocumentsPage />} />
        <Route path={`${APP_DOMAIN}/Profile`} element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </PreviousUrlProvider>
    </>
  );
}
export default App;
