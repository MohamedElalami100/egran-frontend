import React from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import AllFlightsTable from "@/components/Tables/AllFlightsTable";
import ColumnGroupingTable from "@/components/Tables/ColumnGroupingTable";

const Flights = ({ tableData, tableError, tableLoading }) => {
  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="Flights" />
      <main className="flex-1">
        <AllFlightsTable
          tableData={tableData}
          tableError={tableError}
          tableLoading={tableLoading}
        />
      </main>
    </div>
  );
};

export default Flights;
