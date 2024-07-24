import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const userDashboardManue = [
  {
    name: " Profile",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 "
        fill="currentColor"
        viewBox="0 0 448 512"
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
    ),
    href: "/profile",
  },
  {
    name: " Orders",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 448 512"
      >
        <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
      </svg>
    ),
    href: "/orders",
  },
  {
    name: "Address",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 576 512"
      >
        <path d="M302.8 312C334.9 271.9 408 174.6 408 120C408 53.7 354.3 0 288 0S168 53.7 168 120c0 54.6 73.1 151.9 105.2 192c7.7 9.6 22 9.6 29.6 0zM416 503l144.9-58c9.1-3.6 15.1-12.5 15.1-22.3V152c0-17-17.1-28.6-32.9-22.3l-116 46.4c-.5 1.2-1 2.5-1.5 3.7c-2.9 6.8-6.1 13.7-9.6 20.6V503zM15.1 187.3C6 191 0 199.8 0 209.6V480.4c0 17 17.1 28.6 32.9 22.3L160 451.8V200.4c-3.5-6.9-6.7-13.8-9.6-20.6c-5.6-13.2-10.4-27.4-12.8-41.5l-122.6 49zM384 255c-20.5 31.3-42.3 59.6-56.2 77c-20.5 25.6-59.1 25.6-79.6 0c-13.9-17.4-35.7-45.7-56.2-77V449.4l192 54.9V255z" />
      </svg>
    ),
    href: "/address",
  },
  {
    name: "notifications",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 "
        fill="currentColor"
        viewBox="0 0 448 512"
      >
        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
      </svg>
    ),
    href: "/notifications",
  },
  {
    name: " Logout",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 "
        fill="currentColor"
        viewBox="0 0 512 512"
      >
        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
      </svg>
    ),
    href: "/logout",
  },
];

const UserSideBar = ({ open, setOpen }) => {
  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-[50px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0
         ${open ? "translate-x-0" : "-translate-x-full"} 
        `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 relative">
          <ul className="space-y-2 font-medium pt-7  flex flex-col items-center gap-3 ">
            {userDashboardManue.map((item) => (
              <li
                key={item.name}
                className="w-full flex items-center justify-center"
              >
                <NavLink
                  className={({ isActive }) =>
                    `w-[200px] rounded-xl  p-1 pl-2 flex gap-2 items-center  hover:bg-gray-800 hover:text-gray-100 dark:hover:bg-gray-50 dark:hover:text-gray-800 ${
                      isActive
                        ? "dark:text-gray-800 dark:bg-gray-50 text-gray-100 bg-gray-800 "
                        : "dark:bg-gray-800 bg-gray-100 dark:text-gray-50 text-gray-800"
                    }
                    
                    `
                  }
                  to={item.href}
                >
                  <span>{item.svg}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {open && (
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="absolute  top-2 right-2 w-[20px] h-[20px] rounded-full flex justify-center items-center dark:text-white text-2xl  text-gray-800"
            >
              ×
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default UserSideBar;
