import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout";
import UserLayout from "../../../Components/User/UserLayout";
import { deleteAddress, getAddresses } from "../../../Api";
import CircleLoder from "../../../Components/Loder/CircleLoder";
import { setAddress } from "../../../Reducer/Address";
import { useNavigate } from "react-router-dom";

function UserAddress() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) {
    getAddresses()
      .then((res) => {
        setLoading(false);
        // console.log(res.data.data[0]);
        dispatch(
          setAddress({
            data: res.data.data[0],
            loading: false,
            error: "",
          })
        );
      })
      .catch((err) => {});
  }
  const { userAddress } = useSelector((state) => state.userAddress);
  const removeAddress = () => {
    deleteAddress(userAddress._id).then((res) => {
      setLoading(true);
      dispatch(
        setAddress({
          data: null,
          loading: false,
          error: "",
        })
      );
    });
  };

  return (
    <UserLayout>
      <div className="w-full h-full  flex">
        <div className="w-[256px] h-full hidden md:block"></div>
        <div className="h-full flex-1 flex justify-center items-center">
          {loading && <CircleLoder />}
          {!loading &&
            (userAddress ? (
              <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 ">
                <div className="px-6 py-4">
                  <div className="flex items-start flex-col">
                    <div className="font-bold text-xl mb-2">
                      Address Details
                    </div>
                    <p className="text-gray-700 text-base mb-2">
                      <span className="text-xl text-gray-800">Street: </span>
                      {userAddress.street}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      <span className="text-xl text-gray-800">City: </span>
                      {userAddress.city}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      <span className="text-xl text-gray-800">State: </span>
                      {userAddress.state}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      <span className="text-xl text-gray-800">Pincode: </span>
                      {userAddress.pincode}
                    </p>
                  </div>
                </div>

                {
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => {
                      removeAddress();
                    }}
                  >
                    <svg
                      className="w-[20px] h-[25px] "
                      fill="#ff0000"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </button>
                }
              </div>
            ) : (
              <div>
                <div className="flex justify-center flex-col items-center gap-4 w-60">
                  <img src="src/images/13447748-removebg-preview.png" alt="" />
                  <div>
                    <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
                      There’s no address here
                    </h2>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          navigate("/address/adress-from");
                        }}
                        className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 rounded-full text-white text-xs font-semibold leading-4"
                      >
                        {" "}
                        add address now{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </UserLayout>
  );
}

export default UserAddress;
