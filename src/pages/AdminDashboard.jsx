import React, { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getFlightsInProgressByAdminId } from "@/api/FarmerApi";
import CurrentFlightMap from "@/components/Maps/CurrentFlightMap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Trash from "@/assets/Trash";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";

export function AdminDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const tableQueryKey = ["adminInProgress", 1];
  const tableQueryFn = () => getFlightsInProgressByAdminId(1);

  const {
    data: tableData,
    error: tableError,
    isLoading: tableLoading,
  } = useQuery({
    queryKey: tableQueryKey,
    queryFn: tableQueryFn,
  });

  //const location = useLocation();
  const location = useLocation();

  // Check if the toast should be shown
  useEffect(() => {
    console.log(location);
    if (location.state?.showToast) {
      console.log("haaaaaa");
      toast.success("Drone is connected successfully!");
    }
  }, [location.state]);

  if (tableLoading) return <div></div>;
  if (tableError) return <div>An error occurred: {tableError?.message}</div>;

  const currentFlight =
    tableData && tableData?.length > 0 ? tableData?.[0] : null;

  console.log(currentFlight);

  if (!currentFlight) {
    return (
      <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
        <Toaster richColors />
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
            title="Flight Altitude"
            value={currentFlight.altitude + " m"}
            icon={<Drone1 />}
            rectangle={<Rectangle1 />}
            card_style="lg:col-span-3 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card1 bg-opacity-10"
          />
          <StatsCard
            title="Predicted Duration"
            value={
              currentFlight.predictedDuration > 60
                ? Math.floor(currentFlight.predictedDuration / 60) +
                  " h " +
                  (currentFlight.predictedDuration % 60) +
                  " mins"
                : currentFlight.predictedDuration + " min"
            }
            icon={<Clock />}
            rectangle={<Rectangle2 />}
            card_style="lg:col-span-4 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card2 bg-opacity-10"
          />
          <StatsCard
            title="Area Covered"
            value={(currentFlight.area / 10000).toFixed(2) + " ha"}
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger>
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
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader className="flex flex-col items-start gap-4 self-stretch">
                  <div>
                    <Trash />
                  </div>
                  <div>
                    <DialogTitle className="font-[inter] text-[18px] font-semibold leading-[28px]">
                      Cancel flight
                    </DialogTitle>
                    <DialogDescription className="text-[#475467] font-[inter] text-[14px] font-normal leading-[20px]">
                      Are you sure you want to cancel this flight? This action
                      cannot be undone.
                    </DialogDescription>
                  </div>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-[#E000001A] bg-opacity-70 border-4 border-[#E00000B2] h-[41px] w-[131px] 
               rounded-[410px] gap-[8px]
              hover:bg-[#E00000B2] text-[#B3261E] hover:text-white"
                  >
                    <div className="text-center font-[Roboto] text-[14px] font-bold">
                      Confirm
                    </div>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {!isDialogOpen && (
          <div className="h-[540px] w-full bg-green-300 rounded-[11px]">
            <CurrentFlightMap
              images={currentFlight?.images}
              polygonPoints={currentFlight?.polygonPoints}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
