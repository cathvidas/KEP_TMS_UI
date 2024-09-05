import { useState } from "react";
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
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Request_View" element={<RequestView />} />
        <Route path="/NewRequest" element={<NewRequest />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
