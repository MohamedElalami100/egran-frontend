import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pie, PieChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import DoughnatChart from "./DoughnatChart";
// import Pie from "@/assets/Pie";

function PieChartSection() {
  return (
    <Card className="w-full h-full border border-black bg-opacity-10 border-opacity-10 bg-[#95C11F]">
      <CardHeader>
        <CardTitle className="text-[#063] font-manrope text-[18px] font-semibold capitalize">
          Distribution Des Maladie
        </CardTitle>
      </CardHeader>
      <CardContent className="h-4/5">
        <div className="flex flex-row h-full">
          <div className="w-1/2 h-full flex flex-col justify-end pb-[25px]">
            <div className="flex items-center mb-[5px]">
              <div className="w-4 h-4 rounded-full bg-[#FF4A55]" />
              <span
                className="ml-2
                 text-black font-manrope text-base font-medium leading-normal capitalize"
              >
                Malade
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#30D887]" />
              <span
                className="ml-2
                text-black font-manrope text-base font-medium leading-normal capitalize"
              >
                Non malade
              </span>
            </div>
          </div>

          <div className="w-1/2">
            <DoughnatChart />
          </div>
        </div>

        {/* <ChartContainer
            config={{
              visitors: { label: "Visitors" },
              chrome: { label: "Chrome", color: "hsl(var(--chart-2))" },
              safari: { label: "Safari", color: "hsl(var(--chart-1))" },
            }}
            className=" aspect-square h-[210px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={[
                  {
                    browser: "chrome",
                    visitors: 275,
                    fill: "var(--color-chrome)",
                  },
                  {
                    browser: "safari",
                    visitors: 200,
                    fill: "var(--color-safari)",
                  },
                ]}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer> */}
        {/* <Pie /> */}
      </CardContent>
    </Card>
  );
}

export default PieChartSection;
