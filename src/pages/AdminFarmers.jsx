import React from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import { getFarmersByAdminId } from "@/api/FarmerApi";
import { useQuery } from "@tanstack/react-query";
import AllFarmersGrid from "@/components/Tables/AllFarmersGrid";

const AdminFarmers = () => {
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
  );
};

export default AdminFarmers;
