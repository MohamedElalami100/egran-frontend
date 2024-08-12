import React from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import StatsCard from "@/components/Dashboard/StatsCard";
import Clock from "@/assets/Clock";
import Drone1 from "@/assets/Drone1";
import Drone2 from "@/assets/Drone2";
import Rectangle1 from "@/assets/Rectangle1";
import Rectangle3 from "@/assets/Rectangle3";
import Rectangle2 from "@/assets/Rectangle2";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import ArtBoard from "../assets/Artboard.png";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const navigate = useNavigate();

  const currentFlightExists = true;

  if (currentFlightExists) {
    return (
      <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
        <HeaderSection headText="Current Flight" />
        <main className="flex-1 w-full h-full flex flex-col justify-center items-center">
          <img src={ArtBoard} alt="artBoard" />
          <div className="text-[#818181] font-[Nunito] text-[24px] not-italic font-semibold mt-[10px] mb-[10px]">
            You don’t have any flight yet
          </div>
          <Button
            onClick={() => {
              navigate("/admin/currentFlight/new");
            }}
            className="inline-flex flex-row gap-3 py-2 px-5 justify-center items-center text-white
          font-[Roboto] text-[15px] font-medium leading-[26px] tracking-[0.46px] uppercase
          rounded-[10px] shadow-custom-elevation-2"
          >
            <FaPlus />
            Add New Flight
          </Button>
        </main>
      </div>
    );
  }
  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="Current Flight" />
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-12 mb-5">
          <StatsCard
            title="Current Altitude"
            value={3}
            icon={<Drone1 />}
            rectangle={<Rectangle1 />}
            card_style="lg:col-span-3 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card1 bg-opacity-10"
          />
          <StatsCard
            title="Area Covered"
            value={35 + "m"}
            icon={<Clock />}
            rectangle={<Rectangle2 />}
            card_style="lg:col-span-4 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card2 bg-opacity-10"
          />
          <StatsCard
            title="Flight Predicted Duration"
            value={12 + "min"}
            icon={<Drone2 />}
            rectangle={<Rectangle3 />}
            card_style="lg:col-span-5 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card3 bg-opacity-10"
          />
        </div>

        <div className="flex flex-row justify-beetwen w-full mb-[26px]">
          <div className="flex gap-4">
            <Button
              className="bg-[#E6E6E6] bg-opacity-70 h-[41px] w-[131px] 
              flex flex-row justify-center items-center flex-1 self-stretch rounded-[410px] gap-[8px]
              hover:bg-[#006633] text-[#006633] hover:text-white"
            >
              <div className="w-[24px] h-[24px] p-0 font-bold flex justify-center items-center">
                <IoMdMore />
              </div>
              <div className="text-center font-[Roboto] text-[14px] font-bold ">
                General Info
              </div>
            </Button>
            <Button
              className="bg-[#E000001A] bg-opacity-70 border-4 border-[#E00000B2] h-[41px] w-[131px] 
              flex flex-row justify-center items-center flex-1 self-stretch rounded-[410px] gap-[8px]
              hover:bg-[#E00000B2] text-[#B3261E] hover:text-white"
            >
              <div className="w-[24px] h-[24px] p-0 font-bold flex justify-center items-center">
                <MdOutlineCancel />
              </div>
              <div className="text-center font-[Roboto] text-[14px] font-bold ">
                Cancel Flight
              </div>
            </Button>
          </div>
        </div>

        <div className="h-[540px] w-full bg-green-300 rounded-[11px]"></div>
      </main>
    </div>
  );
}

export default AdminDashboard;
