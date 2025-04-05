import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ProductsPage } from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";
import AdminNavbar from "./components/AdminNavbar";
import { useEffect, useState } from "react";

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("current-user"));
    setUser({
      isUserAuthenticated: userFromStorage ? true: false,
      user: {
        name: userFromStorage && userFromStorage.user.displayName,
        email: userFromStorage && userFromStorage.user.email
      }
    })
    if (!userFromStorage) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
       {user?.isUserAuthenticated ? <AdminNavbar /> : null}
      
      <Routes>
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />

        {/* Admin Paths */}
        <Route element={<DashboardPage />} path="/admin/dashboard" />
        <Route element={<ProductsPage />} path="/admin/products" />
        <Route element={<UsersPage />} path="/admin/users" />
      </Routes>
    </div>
  );
}

export default App;
