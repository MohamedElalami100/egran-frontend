import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pie, PieChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import DoughnatChart from "./DoughnatChart";
import BarChart from "../Reports/BarChart";
// import Pie from "@/assets/Pie";

function PieChartSection({ withTitle, values }) {
  console.log(values);
  return (
    <Card
      className={
        "h-full border border-black  border-opacity-10 " +
        (withTitle
          ? "w-full bg-[#95C11F] bg-opacity-10"
          : "w-fit bg-background")
      }
    >
      {withTitle ? (
        <CardHeader>
          <CardTitle className="text-[#063] font-manrope text-[18px] font-semibold capitalize">
            Distribution Des Maladie
          </CardTitle>
        </CardHeader>
      ) : (
        <div className="h-0"></div>
      )}
      <CardContent className={withTitle ? "h-4/5" : "h-full"}>
        <div className="flex flex-row h-full">
          {withTitle ? (
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
          ) : (
            <></>
          )}

          {withTitle ? (
            <div className="w-1/2">
              {" "}
              <DoughnatChart />{" "}
            </div>
          ) : (
            <div className="w-full">
              <BarChart values={values} />{" "}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PieChartSection;
