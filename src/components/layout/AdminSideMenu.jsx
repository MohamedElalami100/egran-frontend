import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Profile } from "@/assets/Profile";
import Statistic from "@/assets/Statistic";
import DashIcon1 from "@/assets/DashIcon1";
import ProfileIcon2 from "@/assets/ProfileIcon2";
import Statistic2 from "@/assets/Statistic2";
import DashIcon2 from "@/assets/DashIcon2";
import NavDrone1 from "@/assets/NavDrone1";
import NavDrone2 from "@/assets/NavDrone2";
import { Logout } from "@/assets/Logout";
import HelpIcon from "@/assets/HelpIcon";
import LogoFull from "@/assets/LogoFull";
import LogoMini from "@/assets/LogoMini";
import LeftShort from "@/assets/LeftShort";

const AdminSideMenu = ({ open, setOpen }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="w-full flex justify-center pt-[51px] relative">
          <div
            className={`w-2/3 transition-all duration-300 smart-animate ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <LogoFull />
          </div>
          <div
            className={`w-2/3 absolute transition-all duration-300 smart-animate ${
              open ? "opacity-0" : "opacity-100"
            }`}
          >
            <LogoMini />
          </div>
        </div>

        <div className="flex items-center">
          <hr className="flex-grow border-0 border-t-[1px] border-[#D4E5DD]" />

          <div
            className={`cursor-pointer relative -mr-[15px] flex items-center 
          justify-center w-[30px] h-[30px] bg-[#063] rounded-full
          ${!open && "rotate-180 "}`}
            onClick={() => setOpen(!open)}
          >
            <LeftShort />
          </div>
        </div>

        <div className="w-full flex flex-col items-end mt-[41px] gap-[20px]">
          {[
            {
              to: "/admin/dashboard",
              label: "Curren Flight",
              icon1: <DashIcon1 />,
              icon2: <DashIcon2 />,
            },
            {
              to: "/admin/flights",
              label: "Flights",
              icon1: <NavDrone1 />,
              icon2: <NavDrone2 />,
            },
            {
              to: "/admin/farmers",
              label: "Farmers",
              icon1: <Statistic />,
              icon2: <Statistic2 />,
            },
            {
              to: "/profile",
              label: "Profile",
              icon1: <Profile />,
              icon2: <ProfileIcon2 />,
            },
          ].map(({ to, label, icon1, icon2 }) => (
            <div key={to} className="w-[88%]">
              <NavLink
                to={to}
                className="w-full"
                isActive={(match, location) =>
                  match && location.pathname === to
                }
              >
                {({ isActive }) => (
                  <div className="flex flex-row items-center h-9">
                    {isActive && (
                      <div className="w-2 h-5/6 bg-[#063] mr-1 rounded-xl" />
                    )}
                    <Button
                      className={`flex items-center w-full gap-3 rounded-r-none p-1 ${
                        isActive
                          ? "bg-[#063] text-[#E8FFAA] font-[manrope] text-base font-medium leading-normal"
                          : "bg-transparent text-[#063] text-right font-[nunito] text-base font-semibold leading-normal hover:bg-[#E8FFAA]"
                      }
                      ${open ? "justify-start" : "justify-center"}  `}
                    >
                      {isActive ? icon2 : icon1}
                      {open && label}
                    </Button>
                  </div>
                )}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-end mt-[89px] gap-[20px]">
          <div className="w-[88%]">
            <Button
              className={`flex items-center w-full gap-3 rounded-r-none p-1 bg-transparent
           text-[#063] text-right font-[nunito] text-base font-semibold leading-normal hover:bg-[#E8FFAA]
           ${open ? "justify-start" : "justify-center"}`}
            >
              <Logout />
              {open && "Log out"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-[50px]">
        {open ? (
          <div
            className="relative flex flex-col items-center justify-center gap-[17px]
        w-[204px] h-[125px] flex-shrink-0 rounded-[8px] border border-[rgba(0, 102, 51, 0.16)] bg-[#EDFDF6]"
          >
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 mt-2">
              <HelpIcon />
            </div>
            <div className="text-[#818181] font-[manrope] text-sm font-medium">
              you have a question ?
            </div>
            <button className="w-[166px] h-[40px] flex-shrink-0 rounded-[156px] bg-[#063] text-white">
              <div className="text-white font-[manrope] text-sm font-semibold leading-normal">
                help center
              </div>
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default AdminSideMenu;
