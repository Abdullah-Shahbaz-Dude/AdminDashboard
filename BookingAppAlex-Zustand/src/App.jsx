import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import UserManagement from "./components/UserManagement";
import WorkbookDetail from "./components/WorkbookDetail";
import WorkbookViewer from "./components/WorkbookViewer";
import NewUser from "./components/NewUser";
import AssignWorkSheets from "./components/AssignWorkSheets";
import UserLink from "./components/UserLink";
import WorkBooks from "./components/WorkBooks";
import UserDashboard from "./components/UserDashboard";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/admin" replace />} />

          <Route
            path="/workbooks"
            element={
              <ProtectedRoute>
                <Layout>
                  <WorkBooks />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workbook/:id"
            element={
              <ProtectedRoute>
                <WorkbookDetail />
              </ProtectedRoute>
            }
          />
          <Route path="/user-dashboard/:token" element={<UserDashboard />} />
          <Route
            path="/user-dashboard/workbook/:token/:workbookId"
            element={<WorkbookViewer />}
          />
          {/*----------------------------------- user----------------------------------------------------------------- */}
          <Route
            path="/new-user"
            element={
              <ProtectedRoute>
                <Layout>
                  <NewUser />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/assign-workbooks/:userId"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssignWorkSheets />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-link/:userId"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserLink />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
