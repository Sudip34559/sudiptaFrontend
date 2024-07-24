import React from "react";
import { useNavigate } from "react-router-dom";

function UserHeader({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <header className=" h-[50px] fixed top-0 left-0 right-0  border-b-[1px] bg-gray-200  border-b-black ">
      <div className="w-full h-full flex items-center gap-4 ">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-[50px] h-[50px] flex justify-center items-center  text-xl text-gray-800"
        >
          ←
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className={`inline-flex items-center p-2  text-sm text-gray-800 rounded-lg md:hidden   ${
            open ? " hidden" : "block"
          }`}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default UserHeader;
