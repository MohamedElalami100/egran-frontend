import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import SelectIcon from "@/assets/SelectIcon";
import RoundedGreen from "@/assets/RoundedGreen";
import CustomButtonGroup from "@/components/Reports/CustomButtonGroup";
import reportImg2 from "../assets/reportImg2.png";
import LeafletMap from "@/components/Maps/LeafletMap";
import { useQuery } from "@tanstack/react-query";
import { getFlightById } from "@/api/FarmerApi";
import { useNavigate, useParams } from "react-router-dom";
import PieChartSection from "@/components/Dashboard/PieChartSection";
import AiTextAnimation from "@/components/Reports/AiTextAnimation";
import HeatMap from "@/components/Maps/TutaHeatMap";
import map from "@/assets/map.png";
import TutaHeatMap from "@/components/Maps/TutaHeatMap";
import OidiumHeatMap from "@/components/Maps/OidiumHeatMap";

const Reports = ({ tableData, tableError, tableLoading }) => {
  const { flightId } = useParams();
  const navigate = useNavigate();

  //api calls:
  // flight data
  const flightQueryKey = ["flightData", flightId];
  const flightQueryFn = () => getFlightById(flightId);

  const {
    data: flightData,
    error: flightError,
    isLoading: flightLoading,
  } = useQuery({
    queryKey: flightQueryKey,
    queryFn: flightQueryFn,
  });
  const [selectedKey, setSelectedKey] = useState(flightId);
  const [selectedValue, setSelectedValue] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [mapMode, setMapMode] = useState(0);

  useEffect(() => {
    // Find the corresponding value based on the selected key
    const selectedItem = tableData?.find((row) => row.id == selectedKey);
    console.log(selectedItem);
    if (selectedItem) {
      setSelectedValue(
        `${selectedItem.startTime ? selectedItem.startTime : ""}-${
          selectedItem.endTime ? selectedItem.endTime : ""
        }`
      );
    } else {
      setSelectedValue(selectedKey);
    }
  }, [selectedKey, tableData]);

  const handleValueChange = (value) => {
    setSelectedKey(value);

    //redirect to the new flight:
    navigate(`/reports/flight/${value}`);
  };

  console.log(flightData);
  if (flightLoading || tableLoading) return <div>Loading...</div>;
  if (flightError || tableError)
    return (
      <div>
        An error occurred: {flightError?.message || tableError?.message}
      </div>
    );
  if (!selectedImage) {
    setSelectedImage(flightData?.images[0]);
  }

  const getImageByType = (type) =>
    selectedImage?.filter((image) => image.type == type)?.[0]?.url;

  const output = selectedImage?.filter((image) => image.type == "OUTPUT")?.[0];
  const aiInsight = output?.aiInsight
    ? "  Based on recent pest detections in this area, here are the recommended actions to effectively manage the pests and optimize crop health.<br>" +
      output?.aiInsight
    : "";

  console.log(selectedImage);
  const insectsCount = {
    tuta: output?.tutaCount,
    oidium: output?.oidiumCount,
  };

  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="Reports" />
      <main className="flex-1">
        <div className=" px-4 grid grid-cols-2 gap-[35px] sm:grid-cols-1 lg:grid-cols-2 mb-5">
          <div>
            <Select value={selectedKey} onValueChange={handleValueChange}>
              <SelectTrigger
                className="flex h-[66px] w-[467px] p-[10px] justify-between
             items-center rounded-full border border-[#999] bg-[#FFF]"
              >
                <div className="h-full flex justify-between items-center gap-3">
                  <SelectIcon />
                  <div className="flex flex-col items-start">
                    <div className="text-[#22242C] font-manrope text-[18px] font-bold leading-normal capitalize">
                      Select Flight
                    </div>
                    <div className="text-[#8E8EA1] font-inter text-[14px] font-normal leading-normal">
                      {selectedValue}
                    </div>
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {tableData?.map((row) => (
                  <SelectItem key={row.id} value={row.id}>
                    {row.startTime + "-" + row.endTime}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-[40px] mb-[30px] flex flex-row items-center gap-3">
              <RoundedGreen />
              <div className="text-[#000] font-manrope text-[18px] font-semibold leading-normal capitalize">
                Map Mode Selection
              </div>
            </div>

            <CustomButtonGroup mapMode={mapMode} setMapMode={setMapMode} />

            <div className="mt-[40px] flex flex-row items-center gap-3">
              <RoundedGreen />
              <div className="text-[#000] font-manrope text-[18px] font-semibold leading-normal capitalize">
                Cité El Massira Agadir 80000
              </div>
            </div>
            <div className="text-gray-600 ml-5 font-manrope text-[14px] font-semibold leading-normal capitalize">
              {selectedImage ? selectedImage[0]?.lat : ""},{" "}
              {selectedImage ? selectedImage[0]?.lng : ""}
            </div>

            <div className="mt-[31px] h-[147px] w-full flex md:justify-between gap-[17px]">
              <img
                src={getImageByType("RGB_630")}
                alt="rgb"
                className="w-1/2 rounded-[14px]"
              />
              <img
                src={getImageByType("NIR_980")}
                alt="nir"
                className="w-1/2 rounded-[14px]"
              />
            </div>

            <div className="mt-[20px] flex flex-row items-center gap-3">
              <RoundedGreen />
              <div className="text-[#000] font-manrope text-[18px] font-semibold leading-normal capitalize">
                Insects Detection
              </div>
            </div>

            <div className="mt-[31px] h-[187px] w-full flex md:justify-center">
              <img
                src={getImageByType("OUTPUT")}
                alt="rgb"
                className="w-3/4 rounded-[14px]"
              />
            </div>

            <div className="mt-[20px] flex flex-row items-center gap-3">
              <RoundedGreen />
              <div className="text-[#000] font-manrope text-[18px] font-semibold leading-normal capitalize">
                Insects Distribution
              </div>
            </div>

            <div className="mt-[31px] h-[187px] w-full flex md:justify-center">
              <div className="w-1/2">
                <PieChartSection values={insectsCount} withTitle={false} />
              </div>
            </div>

            <div className="mt-[20px] flex flex-row items-center gap-3">
              <RoundedGreen />
              <div className="text-[#000] font-manrope text-[18px] font-semibold leading-normal capitalize">
                Images used by the Ai model to detect the insects
              </div>
            </div>

            <div className="mt-[31px] h-[147px] w-full flex md:justify-between gap-[17px]">
              <img
                src={getImageByType("RGB_630")}
                alt="rgb"
                className="w-1/2 rounded-[14px]"
              />
              <img
                src={getImageByType("NIR_980")}
                alt="nir"
                className="w-1/2 rounded-[14px]"
              />
            </div>

            <div className="mt-[31px] h-[147px] w-full flex md:justify-between gap-[17px]">
              <img
                src={getImageByType("RGB_460")}
                alt="rgb"
                className="w-1/2 rounded-[14px]"
              />
              <img
                src={getImageByType("RGB_540")}
                alt="nir"
                className="w-1/2 rounded-[14px]"
              />
            </div>
          </div>

          <div className="h-[750px] rounded-[20px] border-[5px] border-[rgba(0,0,0,0.20)]">
            {mapMode == 0 ? (
              <LeafletMap
                images={flightData.images}
                polygonPoints={flightData.polygonPoints}
                setSelectedImage={setSelectedImage}
              />
            ) : // <img src={map} className="h-full w-full" />
            mapMode == 1 ? (
              <TutaHeatMap
                images={flightData.images}
                polygonPoints={flightData.polygonPoints}
              />
            ) : (
              <OidiumHeatMap
                images={flightData.images}
                polygonPoints={flightData.polygonPoints}
              />
            )}

            <div className="mt-[40px] flex flex-row items-center gap-3">
              <RoundedGreen />
              <div className="text-[#000] font-manrope text-[18px] font-semibold leading-normal capitalize">
                Ai Insights In This Area
              </div>
            </div>

            <AiTextAnimation text={aiInsight} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
