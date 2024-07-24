import React, { useRef, useState } from "react";
import UserSideBar from "../UserSideBar";
import UserHeader from "../UserHeader/UserHeader";

const UserLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openSidebar = (p) => {
    setOpen(p);
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark ">
      <div className="flex h-screen overflow-hidden">
        <div className=" flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className=" w-full h-screen pt-[50px] ">
              <UserHeader open={open} setOpen={openSidebar} />
              <UserSideBar open={open} setOpen={openSidebar} />
              <div
                className={`h-full w-full ${
                  open ? "bg-black/[0.3] blur-sm pointer-events-none" : ""
                }`}
              >
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
