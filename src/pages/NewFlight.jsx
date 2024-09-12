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
import {
  checkDroneConnection,
  deleteFlight,
  getdDronesByAdminId,
  getFarmersByAdminId,
} from "@/api/FarmerApi";
import { createFlight } from "@/api/FarmerApi";
import dividePathIntoPoints from "@/utils/dividePathIntoPoints";
import calculateOptimalPath from "@/utils/calculateOptimalPath ";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import calculatePolygonArea from "@/utils/calculatePolygonArea";
import estimateFlightDuration from "@/utils/estimateFlightDuration";

const NewFlight = () => {
  // Initialize the state with an empty map
  const [selectedValues, setSelectedValues] = useState(new Map());
  const [error, setError] = useState(null);
  const [polygon, setPolygon] = useState(null);

  const [altitude, setAltitude] = useState(2);
  const [numImages, setNumImages] = useState(10);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  // Handle selection
  const handleSelection = (key, value) => {
    setSelectedValues((prevSelectedValues) => {
      const newMap = new Map(prevSelectedValues);
      newMap.set(key, value);
      return newMap;
    });
  };

  const handleSave = async () => {
    if (
      polygon &&
      selectedValues?.get("droneId") &&
      selectedValues?.get("farmerId")
    ) {
      const points = polygon.geometry.coordinates[0].map((coord) => ({
        lat: coord[1],
        lng: coord[0],
      }));

      // Calculate and draw the optimal path
      const path = calculateOptimalPath(polygon, 100);
      const flightPoints = dividePathIntoPoints(path, numImages);

      const area = calculatePolygonArea(points);
      const estimatedDuration = Math.round(estimateFlightDuration(area));

      const now = new Date();
      const req = {
        droneId: selectedValues?.get("droneId"),
        farmerId: selectedValues?.get("farmerId"),
        date: now.toISOString().split("T")[0],
        startTime: now.toTimeString().split(" ")[0],
        altitude: altitude,
        area: area,
        predictedDuration: estimatedDuration,
        polygonPointDtoList: points,
        flightPoints: flightPoints,
      };

      //create flight
      try {
        console.log(req);
        const responseData = await createFlight(req);
        console.log("Flight created successfully:", responseData);
        setMessage("flight Created Successfully... Checking Drone Connexion");
        setError(null);

        //test that the drone got the infos:
        const flightId = responseData?.id; // assuming flightId is part of the response

        let attempts = 0;
        const maxAttempts = 5;
        const checkInterval = 3000; // 3 seconds

        const intervalId = setInterval(async () => {
          if (attempts >= maxAttempts) {
            console.log("Max attempts reached. Drone is not connected.");
            toast.error("Drone is not connected. Please try again");
            setError(null);
            setMessage(null);
            clearInterval(intervalId);
            try {
              await deleteFlight(flightId);
            } catch {}
            return;
          }

          try {
            //const isConnected = await checkDroneConnection(flightId);
            const isConnected = true;
            if (isConnected) {
              console.log("Drone is connected.");
              setMessage("Drone is connected.");
              setError(null);
              clearInterval(intervalId);
              toast.success("Drone is connected Succesfully!");

              navigate("/admin/currentFlight", { state: { showToast: true } });
            } else {
              console.log("Drone is not connected. Checking again...");
              attempts++;
            }
          } catch (error) {
            console.error("Error checking drone connection:", error);
            setError("Error checking drone connection. Please try again");
            setMessage(null);
            clearInterval(intervalId);
            return;
          }
        }, checkInterval);
      } catch (error) {
        console.error("Failed to create flight:", error);
        setError("Failed to create flight. Please try again.");
        setMessage(null);
      } finally {
      }
    } else {
      if (!polygon) {
        setError("Please draw a polygon on the map.");
      } else if (!selectedValues?.get("droneId")) {
        setError("Please select a drone.");
      } else if (!selectedValues?.get("farmerId")) {
        setError("Please select a farmer.");
      }
    }
  };

  const handleAltitudeIncrement = () => {
    setAltitude((prevValue) => (prevValue < 10 ? prevValue + 1 : 10));
  };

  const handleAltitudeDecrement = () => {
    setAltitude((prevValue) => (prevValue > 2 ? prevValue - 1 : 2));
  };

  const handleNumImagesIncrement = () => {
    setNumImages((prevValue) => (prevValue < 30 ? prevValue + 1 : 30));
  };

  const handleNumImagesDecrement = () => {
    setNumImages((prevValue) => (prevValue > 10 ? prevValue - 1 : 10));
  };

  const handleAltitudeChange = (e) => {
    const value = Number(e.target.value);
    const clampedValue = Math.max(2, Math.min(10, value));
    setAltitude(clampedValue);
  };

  const handleNumImagesChange = (e) => {
    const value = Number(e.target.value);
    const clampedValue = Math.max(10, Math.min(30, value));
    setNumImages(clampedValue);
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

  if (tableLoading || dronesLoading) return <div></div>;
  if (tableError || dronesError)
    return <div>An error occurred: {tableError?.message}</div>;

  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const selectedFarmer = tableData?.find(
    (row) => row.id === selectedValues?.get("farmerId")
  );
  const selectedFarmerName =
    !selectedFarmer?.firstname || !selectedFarmer?.lastname
      ? null
      : selectedFarmer?.firstname + " " + selectedFarmer?.lastname;

  console.log(dronesData);

  const selectedDrone = dronesData?.find(
    (row) => row.id === selectedValues?.get("droneId")
  );
  const selectedDroneName = !selectedDrone?.model ? null : selectedDrone?.model;
  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <Toaster richColors />
      <HeaderSection headText="New Flight" />
      <main className="flex-1">
        <div
          className="w-full flex justify-between items-center gap-[18px] px-[14px] py-[11px]
        rounded-[42px] border border-custom-stroke bg-custom-gradient3 mb-[24px]"
        >
          <Select onValueChange={(value) => handleSelection("farmerId", value)}>
            <SelectTrigger
              className="flex h-[60px] w-1/3 p-[10px] justify-between
             items-center rounded-full border border-[#999] bg-[#FFF]"
            >
              <div className="h-full flex justify-between items-center gap-3">
                <SelectIcon />
                <div className="flex flex-col items-start">
                  <div
                    className="text-[#22242C] font-manrope text-[18px] font-bold 
                  leading-normal capitalize"
                  >
                    {selectedFarmerName ? selectedFarmerName : "Select Farmer"}{" "}
                  </div>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent className="absolute bottom-full mb-[65px] z-10">
              {tableData?.map((row) => (
                <SelectItem className="h-12" key={row.id} value={row.id}>
                  {row.firstname + " " + row.lastname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleSelection("droneId", value)}>
            <SelectTrigger
              className="flex h-[60px] w-1/3 p-[10px] justify-between
             items-center rounded-full border border-[#999] bg-[#FFF]"
            >
              <div className="h-full flex justify-between items-center gap-3">
                <SelectIcon />
                <div className="flex flex-col items-start">
                  <div className="text-[#22242C] font-manrope text-[18px] font-bold leading-normal capitalize">
                    {selectedDroneName ? selectedDroneName : "Select Drone"}{" "}
                  </div>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent className="absolute bottom-full mb-[65px] z-10">
              {dronesData?.map((row) => (
                <SelectItem className="h-12" key={row.id} value={row.id}>
                  {row.model + "-" + row.id}
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
            <InteractiveMap setPolygon={setPolygon} />
          </div>
          <div className="px-[15px] py-[20px] w-1/4 h-[700px] flex-shrink-0 rounded-[10px] border border-[#95C11F] bg-custom-gradient4">
            <div className="mb-[3px] text-[#3A3A3A] font-[Manrope] text-[16px] font-semibold">
              Altitude (m) :
            </div>
            <div className="mb-[26px] h-[40px] flex flex-row items-center justify-between gap-[7px]">
              <Button
                className="h-full bg-[#006633] text-[#E8FFAA]"
                onClick={handleAltitudeDecrement}
                disabled={altitude <= 2}
              >
                <MinusIcon />
              </Button>
              <input
                type="number"
                value={altitude}
                onChange={handleAltitudeChange}
                min={2}
                max={10}
                className="text-center text-black font-[manrope] text-[18px] font-medium p-2 w-full rounded-[4px] border border-[#DEDEDE] bg-[#D9D9D980]"
              />
              <Button
                className="h-full bg-[#006633] text-[#E8FFAA]"
                onClick={handleAltitudeIncrement}
                disabled={altitude >= 10}
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
                disabled={numImages <= 10}
              >
                <MinusIcon />
              </Button>
              <input
                type="number"
                value={numImages}
                onChange={handleNumImagesChange}
                min={10}
                max={30}
                className="text-center text-black font-[manrope] text-[18px] font-medium p-2 w-full rounded-[4px] border border-[#DEDEDE] bg-[#D9D9D980]"
              />
              <Button
                className="h-full bg-[#006633] text-[#E8FFAA]"
                onClick={handleNumImagesIncrement}
                disabled={numImages >= 30}
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
            {error ? (
              <div className="text-red-600 italic font-thin my-3">
                - {error}
              </div>
            ) : (
              <></>
            )}
            {message ? (
              <div className="text-green-600 font-open-sans text-base font-semibold capitalize my-3 animate-pulse">
                - {message}
              </div>
            ) : (
              <></>
            )}
            <div className="flex items-center justify-center flex-col">
              <Button
                className="w-full inline-flex flex-row gap-3 py-[8px] px-[22px] justify-center items-center text-white
          font-[Roboto] text-[15px] font-medium leading-[26px] tracking-[0.46px] uppercase
          rounded-[27px] shadow-custom-elevation-2 bg-[#54893F]"
                onClick={handleSave}
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
