import React from "react";
import HeaderSection from "@/components/layout/HeaderSection";
import StatsCard from "@/components/Dashboard/StatsCard";
import LineChartSection from "@/components/Dashboard/LineChartSection";
import PieChartSection from "@/components/Dashboard/PieChartSection";
import RecentFlightsTable from "@/components/Dashboard/RecentFlightsTable";
import Clock from "@/assets/Clock";
import Drone1 from "@/assets/Drone1";
import Drone2 from "@/assets/Drone2";
import Rectangle1 from "@/assets/Rectangle1";
import Rectangle3 from "@/assets/Rectangle3";
import Rectangle2 from "@/assets/Rectangle2";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/api/FarmerApi";

export function Dashboard({ tableData, tableError, tableLoading }) {
  // stats data
  const statsQueryKey = ["farmerId", 1];
  const statsQueryFn = () => getDashboardStats(1);

  const {
    data: statsData,
    error: statsError,
    isLoading: statsLoading,
  } = useQuery({
    queryKey: statsQueryKey,
    queryFn: statsQueryFn,
  });

  //Combine loading and error states
  if (statsLoading || tableLoading) return <div>Loading...</div>;
  if (statsError || tableError)
    return (
      <div>An error occurred: {statsError?.message || tableError?.message}</div>
    );

  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="Dashboard" />
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-12 mb-5">
          <StatsCard
            title="Drones Used"
            value={statsData?.totalDrones}
            icon={<Drone1 />}
            rectangle={<Rectangle1 />}
            card_style="lg:col-span-3 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card1 bg-opacity-10"
          />
          <StatsCard
            title="Total Hours"
            value={statsData?.totalHours + "h"}
            icon={<Clock />}
            rectangle={<Rectangle2 />}
            card_style="lg:col-span-4 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card2 bg-opacity-10"
          />
          <StatsCard
            title="Total Flights"
            value={statsData?.totalFlights}
            icon={<Drone2 />}
            rectangle={<Rectangle3 />}
            card_style="lg:col-span-5 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card3 bg-opacity-10"
          />
        </div>
        <div className="grid grid-cols-1 gap-[19px] md:grid-cols-10 mb-5">
          <div className="md:col-span-6 flex h-[307px]">
            <LineChartSection className="w-full h-full" />
          </div>
          <div className="md:col-span-4 h-[307px] shrink-0">
            <PieChartSection withTitle={true} className="w-full h-full" />
          </div>
        </div>

        <RecentFlightsTable data={tableData} />
      </main>
    </div>
  );
}

export default Dashboard;
