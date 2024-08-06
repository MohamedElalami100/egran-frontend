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

export function Dashboard() {
  return (
    <div className="p-4 lg:pl-[90px] lg:pr-[100px] lg:pt-[54px] flex min-h-screen flex-col bg-background gap-5">
      <HeaderSection headText="Dashboard" />
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-12 mb-5">
          <StatsCard
            title="Drones Used"
            value={3}
            icon={<Drone1 />}
            rectangle={<Rectangle1 />}
            card_style="lg:col-span-3 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card1 bg-opacity-10"
          />
          <StatsCard
            title="Total Hours"
            value={35 + "h"}
            icon={<Clock />}
            rectangle={<Rectangle2 />}
            card_style="lg:col-span-4 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card2 bg-opacity-10"
          />
          <StatsCard
            title="Total Flights"
            value={12}
            icon={<Drone2 />}
            rectangle={<Rectangle3 />}
            card_style="lg:col-span-5 h-[180px] flex-shrink-0 rounded-[20px]
     border-opacity-10 border-black bg-card3 bg-opacity-10"
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
