import React from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import "../App.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFarmerById } from "@/api/FarmerApi";

const FarmerProfile = () => {
  const { farmerId } = useParams();

  // stats data
  const statsQueryKey = ["farmerProfile", farmerId];
  const statsQueryFn = () => getFarmerById(farmerId);

  const { data, error, isLoading } = useQuery({
    queryKey: statsQueryKey,
    queryFn: statsQueryFn,
  });

  //Combine loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error?.message}</div>;

  console.log(data);

  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="Farmer Profile" />
      <main className="flex-1 bg-white rounded-[10px]">
        <div class="h-[118px] w-full shrink-0 bg-custom-gradient rounded-t-[10px]"></div>

        <div className="my-[38px]">
          <div class="flex flex-col sm:gap-5 items-start lg:flex-row justify-between lg:items-center px-[150px]">
            <div className="flex flex-row gap-[13px] items-center">
              <Avatar className="w-[84px] h-[84px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-black font-poppins text-[20px] font-medium leading-normal">
                  Mohamed Elalami
                </div>
                <div className="text-black font-poppins text-[16px] font-normal leading-normal">
                  mohamed.elalami@gmail.com
                </div>
              </div>
            </div>

            <div>
              <Button className="w-[93px] h-[44px] flex-shrink-0 rounded-[8px] bg-[#063]">
                <div class="text-[var(--colors-secondry-1,#E8FFAA)] font-[poppins] text-[16px] font-normal leading-normal">
                  Edit
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="px-[125px]">
          <div class="text-[#95C11F] font-[poppins] text-[20px] font-medium leading-normal mb-[11px]">
            Farmer informations
          </div>

          <div className="flex mb-[26px] flex-col lg:flex-row justify-between gap-[32px]">
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-black font-poppins text-base font-normal leading-normal mb-[12px]">
                Full Name
              </div>
              <input
                type="text"
                value="Mohamed Elalami"
                disabled
                className="h-[52px] w-full shrink-0 rounded-[8px] bg-[#F9F9F9] text-gray-800 cursor-not-allowed opacity-50 p-2"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-black font-poppins text-base font-normal leading-normal mb-[12px]">
                Phone Number
              </div>
              <input
                type="text"
                value="+212777879789"
                disabled
                className="h-[52px] w-full shrink-0 rounded-[8px] bg-[#F9F9F9] text-gray-800 cursor-not-allowed opacity-50 p-2"
              />
            </div>
          </div>

          <div className="flex mb-[26px] flex-col lg:flex-row justify-between gap-[32px]">
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-black font-poppins text-base font-normal leading-normal mb-[12px]">
                Adress
              </div>
              <input
                type="text"
                value="Casablanca"
                disabled
                className="h-[52px] w-full shrink-0 rounded-[8px] bg-[#F9F9F9] text-gray-800 cursor-not-allowed opacity-50 p-2"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-black font-poppins text-base font-normal leading-normal mb-[12px]">
                Email adress
              </div>
              <input
                type="text"
                value="elalamiMohamed@gmail.com"
                disabled
                className="h-[52px] w-full shrink-0 rounded-[8px] bg-[#F9F9F9] text-gray-800 cursor-not-allowed opacity-50 p-2"
              />
            </div>
          </div>

          <div class="text-[#95C11F] font-[poppins] text-[20px] font-medium leading-normal mb-[11px]">
            Farm informations
          </div>

          <div className="flex mb-[26px] flex-col lg:flex-row justify-between gap-[32px]">
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-black font-poppins text-base font-normal leading-normal mb-[12px]">
                Farm Name
              </div>
              <input
                type="text"
                value="name"
                disabled
                className="h-[52px] w-full shrink-0 rounded-[8px] bg-[#F9F9F9] text-gray-800 cursor-not-allowed opacity-50 p-2"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-black font-poppins text-base font-normal leading-normal mb-[12px]">
                Farm Location
              </div>
              <input
                type="text"
                value="farm location"
                disabled
                className="h-[52px] w-full shrink-0 rounded-[8px] bg-[#F9F9F9] text-gray-800 cursor-not-allowed opacity-50 p-2"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerProfile;
