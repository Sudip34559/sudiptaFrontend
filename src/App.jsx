import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";

import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ProductAdd from "./Pages/Admin/ProductAdd";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";

import AllProduct from "./Pages/Admin/AllProduct";

//Category
import AllCetegory from "./Pages/Admin/Category";
import EditProduct from "./Pages/Admin/EditProduct/index.jsx";

// slice
import { login } from "./Reducer/Auth";
import AddCategory from "./Pages/Admin/Category/AddCategory";
import Cart from "./Pages/Cart/Cart.jsx";
import UserProfile from "./Pages/User/UserProfile/UserProfile.jsx";
import UserLayout from "./Components/User/UserLayout/index.jsx";
import Orders from "./Pages/User/Orders/Orders.jsx";
import Notification from "./Pages/User/Notification/Notification.jsx";
import Logout from "./Pages/User/Logout/Logout.jsx";
import ForgetPasswored from "./Pages/Login/ForgetPasswored.jsx";
import ResetPasswored from "./Pages/Login/ResetPasswored.jsx";
import RegistrationForm from "./Pages/Registretion/index.jsx";
import ProductView from "./Pages/ProductView/index.jsx";
import AddressForm from "./Pages/User/Adress/AdressFrom.jsx";
import UserAddress from "./Pages/User/Adress/Adress.jsx";

const App = () => {
  const [loading, setLoading] = useState(false);
  //  const {loading}= useLoadingWithRefresh()
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userdata"));
    console.log(userDetails, "userDetails");
    if (userDetails) {
      dispatch(login(userDetails));
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <h1>lodding</h1>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route
                path="/login"
                element={
                  <ProtectedRoute navigetion={"/dashboard"}>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/addProduct"
                element={
                  <AdminProtectedRoute>
                    <ProductAdd />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/allProduct"
                element={
                  <AdminProtectedRoute>
                    <AllProduct />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/productEdit"
                element={
                  <AdminProtectedRoute>
                    <EditProduct />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/allCetegory"
                element={
                  <AdminProtectedRoute>
                    <AllCetegory />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/addCetegory"
                element={
                  <AdminProtectedRoute>
                    <AddCategory />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute navigetion={"/profile"}>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute navigetion={"/orders"}>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/address"
                element={
                  <ProtectedRoute navigetion={"/address"}>
                    <UserAddress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute navigetion={"/notifications"}>
                    <Notification />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/logout"
                element={
                  <ProtectedRoute navigetion={"/logout"}>
                    <Logout />
                  </ProtectedRoute>
                }
              />
              <Route path="/forget-password" element={<ForgetPasswored />} />
              <Route path="/reset-password" element={<ResetPasswored />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/address/adress-from" element={<AddressForm />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
