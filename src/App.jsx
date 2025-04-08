import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ProductsPage } from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";
import AdminNavbar from "./components/AdminNavbar";
import { useEffect, useState } from "react";
import HomePage from "./pages/users/HomePage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import UsersNavbar from "./components/UsersNavbar";
import CartContext from "./context/CartContext";
import CartPage from "./pages/users/CartPage";
import { getUserInfo } from "./util";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    wrapperGetUserInfo();
  }, []);

  const wrapperGetUserInfo = async () => {
    const userFromStorage = JSON.parse(localStorage.getItem("current-user"));

    if (userFromStorage) {
      const userData = await getUserInfo(userFromStorage.user.uid);

      if (!userData) {
        navigate("/login");
      }

      if (userData.admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/users/home");
      }

      setUser(userData);
    }
  }

  return (
    <div>
      <CartContext.Provider value={{ cartData, setCartData }}>
        {user && user.admin ? <AdminNavbar /> : null}

        {user && !user.admin ? <UsersNavbar user={user} /> : null}
        <Routes>
          <Route element={<SignupPage />} path="/signup" />
          <Route element={<LoginPage />} path="/login" />

          {/* Admin Paths */}
          <Route element={<DashboardPage />} path="/admin/dashboard" />
          <Route element={<ProductsPage />} path="/admin/products" />
          <Route element={<UsersPage />} path="/admin/users" />

          {/* User Paths */}
          <Route element={<HomePage />} path="/users/home" />
          <Route element={<CartPage />} path="/users/cart" />
        </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
