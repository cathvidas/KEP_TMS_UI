import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RequestView from "./pages/Request_View";
import { NotFoundPage } from "./pages/Error";
import Login from "./pages/Login";
import NewRequest from "./pages/NewRequest";
function App() {
  return (
    <>
      <Routes>
        <Route path="/KEP_TMS" element={<Login />} />
        <Route path="/KEP_TMS/Dashboard" element={<Dashboard />} />
        <Route path="/KEP_TMS/Request_View" element={<RequestView />} />
        <Route path="/KEP_TMS/NewRequest" element={<NewRequest />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
