import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ForgetPassword from "./pages/forget-password";
import NewPassword from "./pages/newPassword";
import Verfiy from "./pages/verfiy";
import Layout from "./pages/dashboard/layout";
import DashboardHome from "./pages/dashboard/dashboardHome";
import PhotoVideo from "./pages/dashboard/photoVideo";
import ProtectedRoute from "./pages/ProtectedRoute";
import FileManagementTable from "./pages/dashboard/Filling";
import TablePage from "./pages/dashboard/webfiling";
import Documentation from "./pages/dashboard/Documentation";
import SubAdminPage from "./pages/dashboard/SubAdmin";
import ChangePassword from "./pages/dashboard/ChangePassword";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-lightGrey">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/verify" element={<Verfiy />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="photo" element={<PhotoVideo />} />
              <Route path="filing" element={<FileManagementTable />} />              
              <Route path="webfiling" element={<TablePage />} />
              <Route path="documentation" element={<Documentation />} />
              <Route path="subadmin" element={<SubAdminPage />} />
              <Route path="password" element={<ChangePassword />} />

            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
