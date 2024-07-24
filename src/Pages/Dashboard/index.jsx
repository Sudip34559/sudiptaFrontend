import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../Config";
// import { useCookies } from "react-cookie";
import Cart from "../Cart/Cart";
import UserSideBar from "../../Components/User/UserSideBar";
import UserLayout from "../../Components/User/UserLayout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const [cookies, removeCookie] = useCookies([]);
  // const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  // console.log(role)
  const clickbutton = async () => {
    try {
      const res = await api.get(`${baseUrl}/auth/allUser`);
      // console.log(res,'dat')
      // if (res) {
      //   // dispatch(login(res.data.data))
      // }else{
      // // dispatch(logout())
      // console.log("first")
      // }

      // setLoading(false)
      navigate("/");
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message)
      // setLoading(false)
      navigate("/");
    }
  };
  useEffect(() => {
    // const accessTokenValue = cookies.accessToken;
    //   console.log(cookies, 'accessToken from cookies');
    //   // Alternatively, you can also access it using document.cookie
    //   // const documentCookieAccessToken = document.cookie
    //   //   .split('; ')
    //   //   .find((row) => row.startsWith('accessToken'))
    //   //   .split('=')[1];
    //   console.log(document.cookie, 'accessToken from document.cookie');
  }, []);

  return (
    <>
      <div>
        Dashboard {role}
        <button onClick={clickbutton} className="bg-black text-blue-50">
          click
        </button>
      </div>
    </>
  );
};

export default Dashboard;
