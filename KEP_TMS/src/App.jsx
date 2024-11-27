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
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/KEP_TMS" />} />
        <Route path="/KEP_TMS" element={<Login />} />
        <Route path="/KEP_TMS/Dashboard" element={<Dashboard />} />
        <Route path="/KEP_TMS/Request/:type?/:id?" element={<NewRequest />} />
        <Route path="/KEP_TMS/RequestList/:type?" element={<RequestList />} />
        <Route path="/KEP_TMS/Trainings/:page?" element={<Trainings />} />
        <Route path="/KEP_TMS/FacilitatedTrainings" element={<TrainerPage />} />
        <Route path="/KEP_TMS/List/:type/:page?" element={<ApproverPage />} />
        <Route path="/KEP_TMS/MasterList/:category?/:type?" element={<MasterListPage />} />
        <Route path="/KEP_TMS/Certificates" element={<CertificatesPage />} />
        <Route path="/KEP_TMS/AnalyticsPage" element={<AnalyticsPage />} />
        <Route path="/KEP_TMS/TrainingDetail/:id/:page?/:section?" element={<TrainingDetailPage />} />
        <Route path="/KEP_TMS/Users/:page?/:id?" element={<UserPage />} />
        <Route path="/KEP_TMS/Setting" element={<SettingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
