import React from "react";
import UserLayout from "../../../Components/User/UserLayout";
import { useSelector } from "react-redux";

function UserProfile() {
  const { userData } = useSelector((store) => store.auth);
  // console.log("ss", userData);
  return (
    <UserLayout>
      <div className="w-full h-full  flex">
        <div className="w-[256px] h-full hidden md:block"></div>
        <div className="h-full flex-1 text-3xl text-black">
          <div className="flex items-center h-screen w-full justify-center">
            <div className="max-w-xs">
              <div className=" shadow-xl rounded-lg py-3 w-[300px] bg-green-200 dark:bg-green-400">
                <div className="photo-wrapper p-2 ">
                  <img
                    className="w-32 h-32 rounded-full mx-auto"
                    src={"src/images/profileimage.png"}
                    alt="John Doe"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {userData.name}
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>{userData.role}</p>
                  </div>
                  <table className="text-xs my-3 w-full flex justify-center">
                    <tbody>
                      <tr className="">
                        <td className="px-2 py-2  ">{userData.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default UserProfile;
