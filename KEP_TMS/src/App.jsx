import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import TrainingRequestPage from "./pages/RequestPage";
import { NotFoundPage } from "./pages/Error";
import Login from "./pages/Login";
import NewRequest from "./pages/Request";
import RequestList from "./pages/RequestList";
import Trainings from "./pages/Trainings";
import ForApproval from "./pages/ForApproval";
import MasterList from "./pages/MasterList";
import CertificatesPage from "./pages/CertificatesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ApproveRequestPage from "./pages/ApproveRequest";
import TrainingPage from "./pages/TrainingPage";
import TrainerPage from "./pages/TrainerPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/KEP_TMS" />} />
        <Route path="/KEP_TMS" element={<Login />} />
        <Route path="/KEP_TMS/Dashboard" element={<Dashboard />} />
        <Route path="/KEP_TMS/TrainingRequest/:id/:page?" element={<TrainingRequestPage />} />
        <Route path="/KEP_TMS/Request/:type?/:id?" element={<NewRequest />} />
        <Route path="/KEP_TMS/RequestList/:type?" element={<RequestList />} />
        <Route path="/KEP_TMS/Trainings" element={<Trainings />} />
        <Route path="/KEP_TMS/AssignedTrainings" element={<TrainerPage />} />
        <Route path="/KEP_TMS/ForApproval" element={<ForApproval />} />
        <Route path="/KEP_TMS/MasterList/:category/:type?" element={<MasterList />} />
        <Route path="/KEP_TMS/CertificatesPage" element={<CertificatesPage />} />
        <Route path="/KEP_TMS/AnalyticsPage" element={<AnalyticsPage />} />
        <Route path="/KEP_TMS/ApproveRequest/:id" element={<ApproveRequestPage />} />
        <Route path="/KEP_TMS/Training/:id/:page?" element={<TrainingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
