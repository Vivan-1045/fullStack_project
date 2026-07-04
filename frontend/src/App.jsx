import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/protectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";

import UserStores from "./pages/user/UserStores";
import StoresPage from "./pages/admin/StoresPage";
import UsersPage from "./pages/admin/UsersPage";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <StoresPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stores"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserStores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-password"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER", "OWNER"]}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
