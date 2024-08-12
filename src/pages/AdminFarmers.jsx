import React from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import { getFarmersByAdminId } from "@/api/FarmerApi";
import { useQuery } from "@tanstack/react-query";
import AllFarmersGrid from "@/components/Tables/AllFarmersGrid";
import AddFarmerIcon from "@/assets/AddFarmerIcon";
import { useNavigate } from "react-router-dom";

const AdminFarmers = () => {
  const navigate = useNavigate();
  //api calls:
  // table data
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

  return (
    <div className="relative">
      <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
        <HeaderSection headText="Farmers" />
        <main className="flex-1">
          <AllFarmersGrid
            tableData={tableData}
            tableError={tableError}
            tableLoading={tableLoading}
          />
        </main>
      </div>
      {/* <div
        className="fixed bottom-0 w-full h-[445px] bg-gradient-to-b from-transparent
       to-white flex items-end justify-end pr-6 pb-6"
      ></div> */}
      <div
        onClick={() => navigate("/admin/farmers/new")}
        className="fixed bottom-[80px] right-[100px] z-10 cursor-pointer"
      >
        <AddFarmerIcon />
      </div>
    </div>
  );
};

export default AdminFarmers;
