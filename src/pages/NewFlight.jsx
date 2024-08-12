import HeaderSection from "@/components/layout/HeaderSection";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import SelectIcon from "@/assets/SelectIcon";
import InteractiveMap from "@/components/Maps/InteractiveMap";
import { Button } from "@/components/ui/button";
import HelpTipsIcon from "@/assets/HelpTipsIcon";
import { MinusIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getdDronesByAdminId, getFarmersByAdminId } from "@/api/FarmerApi";

const NewFlight = () => {
  const [altitude, setAltitude] = useState(0);
  const [numImages, setNumImages] = useState(0);

  const handleAltitudeIncrement = () => {
    setAltitude((prevValue) => prevValue + 1);
  };

  const handleAltitudeDecrement = () => {
    setAltitude((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const handleNumImagesIncrement = () => {
    setNumImages((prevValue) => prevValue + 1);
  };

  const handleNumImagesDecrement = () => {
    setNumImages((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const tableQueryKey = ["adminFarmers", 1];
  const tableQueryFn = () => getFarmersByAdminId(1);

  const {
    data: tableData,
    error: tableError,
    isLoading: tableLoading,
  } = useQuery({
    queryKey: tableQueryKey,
    queryFn: tableQueryFn,
  });

  const dronesQueryKey = ["adminDrones", 1];
  const dronesQueryFn = () => getdDronesByAdminId(1);

  const {
    data: dronesData,
    error: dronesError,
    isLoading: dronesLoading,
  } = useQuery({
    queryKey: dronesQueryKey,
    queryFn: dronesQueryFn,
  });

  if (tableLoading || dronesLoading) return <div>Loading...</div>;
  if (tableError || dronesError)
    return <div>An error occurred: {tableError?.message}</div>;

  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="New Flight" />
      <main className="flex-1">
        <div
          className="w-full flex justify-between items-center gap-[18px] px-[14px] py-[11px]
        rounded-[42px] border border-custom-stroke bg-custom-gradient3 mb-[24px]"
        >
          <Select>
            <SelectTrigger
              className="flex h-[60px] w-1/3 p-[10px] justify-between
             items-center rounded-full border border-[#999] bg-[#FFF]"
            >
              <div className="h-full flex justify-between items-center gap-3">
                <SelectIcon />
                <div className="flex flex-col items-start">
                  <div className="text-[#22242C] font-manrope text-[18px] font-bold leading-normal capitalize">
                    Farmer
                  </div>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent>
              {tableData?.map((row) => (
                <SelectItem
                  key={row.id}
                  value={row.model + "-" + row.serialNumber}
                >
                  {row.firstname + " " + row.lastname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger
              className="flex h-[60px] w-1/3 p-[10px] justify-between
             items-center rounded-full border border-[#999] bg-[#FFF]"
            >
              <div className="h-full flex justify-between items-center gap-3">
                <SelectIcon />
                <div className="flex flex-col items-start">
                  <div className="text-[#22242C] font-manrope text-[18px] font-bold leading-normal capitalize">
                    Drone Name
                  </div>
                  <div className="text-[#37AF23] flex flex-row items-center gap-2 font-[Inter] text-[14px] font-normal">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#37AF23]" />
                    Connected
                  </div>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent>
              {dronesData?.map((row) => (
                <SelectItem
                  key={row.id}
                  value={row.model + "-" + row.serialNumber}
                >
                  {row.model + "-" + row.serialNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="w-1/3 flex flex-row items-center justify-center gap-[16px]">
            <div className="text-[rgba(1,1,1,0.50)] font-[Manrope] text-[16px] font-normal capitalize">
              Agadir, Sous Massa
            </div>
            <div className="text-[#49454F] font-[Manrope] text-[20px] font-bold capitalize">
              {hours + ":" + minutes} Am
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-[18px]">
          <div className="w-3/4 h-[685px] rounded-[10px] border-[3px] border-[var(--stroke,#E8E3DC)]">
            <InteractiveMap />
          </div>
          <div className="px-[15px] py-[20px] w-1/4 h-[500px] flex-shrink-0 rounded-[10px] border border-[#95C11F] bg-custom-gradient4">
            <div className="mb-[3px] text-[#3A3A3A] font-[Manrope] text-[16px] font-semibold">
              Altitude (m) :
            </div>
            <div className="mb-[26px] h-[40px] flex flex-row items-center justify-between gap-[7px]">
              <Button
                className="h-full bg-[#006633] text-[#E8FFAA]"
                onClick={handleAltitudeDecrement}
              >
                <MinusIcon />
              </Button>
              <input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(Number(e.target.value))}
                className="text-center text-black font-[manrope] text-[18px] font-medium p-2 w-full rounded-[4px] border border-[#DEDEDE] bg-[#D9D9D980]"
              />
              <Button
                className="h-full bg-[#006633] text-[#E8FFAA]"
                onClick={handleAltitudeIncrement}
              >
                <PlusIcon />
              </Button>
            </div>

            <div className="mb-[3px] text-[#3A3A3A] font-[Manrope] text-[16px] font-semibold mt-[25px]">
              Number of images :
            </div>
            <div className="mb-[38px] h-[40px] flex flex-row items-center justify-between gap-[7px]">
              <Button
                className="h-full bg-[#006633] text-[#E8FFAA]"
                onClick={handleNumImagesDecrement}
              >
                <MinusIcon />
              </Button>
              <input
                type="number"
                value={numImages}
                onChange={(e) => setNumImages(Number(e.target.value))}
                className="text-center text-black font-[manrope] text-[18px] font-medium p-2 w-full rounded-[4px] border border-[#DEDEDE] bg-[#D9D9D980]"
              />
              <Button
                className="h-full bg-[#006633] text-[#E8FFAA]"
                onClick={handleNumImagesIncrement}
              >
                <PlusIcon />
              </Button>
            </div>
            <div className="flex flex-row items-center gap-1 text-gray-600 font-open-sans text-base font-semibold capitalize">
              <HelpTipsIcon />
              Help Tips
            </div>
            <ul className="list-disc mb-[70px] pl-5 text-gray-500 font-open-sans text-sm font-normal">
              <li>Ensure the selected drone is fully charged </li>
              <li>Draw the flight path accurately to cover the desired area</li>
            </ul>

            <div className="flex items-center justify-center flex-col">
              <Button
                className="w-full inline-flex flex-row gap-3 py-[8px] px-[22px] justify-center items-center text-white
          font-[Roboto] text-[15px] font-medium leading-[26px] tracking-[0.46px] uppercase
          rounded-[27px] shadow-custom-elevation-2 bg-[#54893F]"
              >
                Start Flight
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className="bg-transparent hover:bg-transparent text-[#666] font-manrope text-[13px] font-medium leading-[26px] tracking-[0.46px] lowercase"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewFlight;
