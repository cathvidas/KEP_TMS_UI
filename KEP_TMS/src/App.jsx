import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import RequestView from "./pages/Request_View";
import { NotFoundPage } from "./pages/Error";
import Login from "./pages/Login";
import NewRequest from "./pages/NewRequest";
import RequestList from "./pages/RequestList";
import Trainings from "./pages/Trainings";
import ForApproval from "./pages/ForApproval";
import MasterList from "./pages/MasterList";
import CertificatesPage from "./pages/CertificatesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/KEP_TMS" />} />
        <Route path="/KEP_TMS" element={<Login />} />
        <Route path="/KEP_TMS/Dashboard" element={<Dashboard />} />
        <Route path="/KEP_TMS/Request_View/:id" element={<RequestView />} />
        <Route path="/KEP_TMS/NewRequest" element={<NewRequest />} />
        <Route path="/KEP_TMS/RequestList" element={<RequestList />} />
        <Route path="/KEP_TMS/Trainings" element={<Trainings />} />
        <Route path="/KEP_TMS/ForApproval" element={<ForApproval />} />
        <Route path="/KEP_TMS/MasterList" element={<MasterList />} />
        <Route path="/KEP_TMS/CertificatesPage" element={<CertificatesPage />} />
        <Route path="/KEP_TMS/AnalyticsPage" element={<AnalyticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
