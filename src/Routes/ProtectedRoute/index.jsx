import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, Outlet, redirect } from "react-router-dom";
import { logout } from "../../Reducer/Auth";

const ProtectedRoute = ({
  navigetion = "/dashboard",
  children,
  authentication = true,
  role,
}) => {
  // console.log(authentication,"authentication")

  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const authrole = useSelector((state) => state.auth.role);
  //console.log(authStatus,"authentication",authentication,authrole)
  useEffect(() => {
    if (authStatus && authrole === "user") {
      navigate(navigetion);
    } else {
      if (authStatus && authrole === "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    }

    setLoader(false);
  }, [authStatus, authrole, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <> {children}</>;
};
export default ProtectedRoute;
