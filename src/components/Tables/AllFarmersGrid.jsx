import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const AllFarmersGrid = ({ tableData, tableError, tableLoading }) => {
  const navigate = useNavigate();
  if (tableLoading) return <div>Loading...</div>;
  if (tableError) return <div>An error occurred: {tableError?.message}</div>;
  return (
    <div
      className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-[30px] grid-cols-2
     sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5"
    >
      {tableData?.map((row) => (
        <div
          onClick={() => {
            navigate("/admin/farmers/" + row.id);
          }}
          className="flex flex-col mb-12 md:mb-[40px] justify-center items-center h-[142px] flex-shrink-0 
        rounded-[27px] border border-[#E8E3DC] bg-white hover:cursor-pointer"
        >
          <Avatar className="relative -mt-[95px] w-[110px] h-[110px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-black text-center font-[manrope] text-[20px] font-medium leading-normal">
            {row.firstname + " " + row.lastname}
          </div>
          <div className="text-[#909090] text-center font-[inter] text-[14px] font-normal leading-[22.4px]">
            {row.email}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFarmersGrid;
