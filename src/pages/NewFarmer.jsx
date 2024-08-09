import React from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import "../App.css";
import { Button } from "@/components/ui/button";

const NewFarmer = () => {
  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="New Farmer" />
      <main className="flex-1 bg-white rounded-[10px]">
        <div class="h-[118px] w-full shrink-0 bg-custom-gradient rounded-t-[10px]"></div>

        <div className="px-[125px]">
          <div class="text-[#95C11F] font-[poppins] text-[20px] font-medium leading-normal mb-[11px] mt-[11px]">
            Farmer informations
          </div>

          <div className="flex mb-[26px] flex-col lg:flex-row justify-between gap-[32px]">
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-[#006633] font-[montserrat] text-[16px] font-bold leading-normal">
                Full Name
              </div>
              <input
                type="text"
                className="h-[52px] w-full shrink-0 rounded-[8px] border border-[#D1D5DB] bg-white
                text-black font-montserrat text-[16px] italic font-normal leading-normal p-2"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-[#006633] font-[montserrat] text-[16px] font-bold leading-normal">
                Phone Number
              </div>
              <input
                type="text"
                className="h-[52px] w-full shrink-0 rounded-[8px] border border-[#D1D5DB] bg-white
                text-black font-montserrat text-[16px] italic font-normal leading-normal p-2"
              />
            </div>
          </div>

          <div className="flex mb-[26px] flex-col lg:flex-row justify-between gap-[32px]">
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-[#006633] font-[montserrat] text-[16px] font-bold leading-normal">
                Adress
              </div>
              <input
                type="text"
                className="h-[52px] w-full shrink-0 rounded-[8px] border border-[#D1D5DB] bg-white
                text-black font-montserrat text-[16px] italic font-normal leading-normal p-2"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-[#006633] font-[montserrat] text-[16px] font-bold leading-normal">
                Email adress
              </div>
              <input
                type="text"
                className="h-[52px] w-full shrink-0 rounded-[8px] border border-[#D1D5DB] bg-white
                text-black font-montserrat text-[16px] italic font-normal leading-normal p-2"
              />
            </div>
          </div>

          <div class="text-[#95C11F] font-[poppins] text-[20px] font-medium leading-normal mb-[11px]">
            Farm informations
          </div>

          <div className="flex mb-[26px] flex-col lg:flex-row justify-between gap-[32px]">
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-[#006633] font-[montserrat] text-[16px] font-bold leading-normal">
                Farm Name
              </div>
              <input
                type="text"
                className="h-[52px] w-full shrink-0 rounded-[8px] border border-[#D1D5DB] bg-white
                text-black font-montserrat text-[16px] italic font-normal leading-normal p-2"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start">
              <div class="text-[#006633] font-[montserrat] text-[16px] font-bold leading-normal">
                Farm Location
              </div>
              <input
                type="text"
                className="h-[52px] w-full shrink-0 rounded-[8px] border border-[#D1D5DB] bg-white
                 text-black font-montserrat text-[16px] italic font-normal leading-normal p-2"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-end my-[24px] gap-[40px]">
            <Button className="flex w-[176px] h-[56px] p-[8px_0px] justify-center items-center rounded-[8px] border bg-white hover:bg-slate-100">
              <div className="text-black text-center font-[montserrat] text-[14px] font-bold leading-[21px]">
                Cancel
              </div>
            </Button>
            <Button className="flex w-[176px] h-[56px] p-[8px_0px] justify-center items-center rounded-[8px] border border-[#54893F] bg-[#54893F]">
              <div className="text-white text-center font-[montserrat] text-[14px] font-bold leading-[21px]">
                Save Farmer
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewFarmer;
