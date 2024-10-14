// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const data = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

// const CustomTick = (props) => {
//   const { x, y, payload } = props;
//   return (
//     <text
//       x={x}
//       y={y}
//       fill="#D4D4D4"
//       fontFamily="Open Sans"
//       fontSize={10}
//       fontStyle="normal"
//       fontWeight={400}
//       textAnchor="middle"
//       dy={16}
//       dx={-5}
//     >
//       {payload.value}
//     </text>
//   );
// };

// function LineChartSection() {
//   return (
//     <Card className="w-full">
//       <CardHeader className="h-1/4 px-[31px]">
//         <div className="flex justify-between">
//           <CardTitle className="text-[#666] font-manrope text-[16px] font-semibold not-italic capitalize">
//             Insects Detected
//           </CardTitle>
//           <Select defaultValue="currentYear">
//             <SelectTrigger className="w-36 h-[32.66px] flex-shrink-0 rounded-[10px] border border-[#D4D4D4]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem
//                 value="currentYear"
//                 className="text-[#999] font-open-sans text-[10px] font-normal leading-normal"
//               >
//                 Current Year
//               </SelectItem>
//               <SelectItem
//                 value="lastYear"
//                 className="text-[#999] font-open-sans text-[10px] font-normal leading-normal"
//               >
//                 Last Year
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardHeader>
//       <CardContent className="h-3/4">
//         <div className="h-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
//               data={data}
//               margin={{
//                 top: 10,
//                 right: 30,
//                 left: 0,
//                 bottom: 0,
//               }}
//             >
//               <defs>
//                 <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#063" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#063" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" tick={<CustomTick />} />
//               <YAxis tick={<CustomTick />} />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="desktop"
//                 stroke="#063"
//                 fill="url(#colorDesktop)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default LineChartSection;

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data1 = [
  { month: "Jan", tuta: 26, oidium: 40 },
  { month: "Feb", tuta: 23, oidium: 32 },
  { month: "Mar", tuta: 14, oidium: 30 },
  { month: "Apr", tuta: 10, oidium: 25 },
  { month: "May", tuta: 6, oidium: 27 },
  { month: "Jun", tuta: 8, oidium: 22 },
  { month: "Jul", tuta: 10, oidium: 20 },
  { month: "Aug", tuta: 8, oidium: 21 },
  { month: "Sep", tuta: 5, oidium: 18 },
];

const data2 = [
  { month: "Jan", tuta: 26, oidium: 40 },
  { month: "Feb", tuta: 23, oidium: 32 },
  { month: "Mar", tuta: 14, oidium: 30 },
  { month: "Apr", tuta: 10, oidium: 25 },
  { month: "May", tuta: 6, oidium: 27 },
  { month: "Jun", tuta: 8, oidium: 22 },
  { month: "Jul", tuta: 18, oidium: 29 },
  { month: "Aug", tuta: 24, oidium: 35 },
  { month: "Sep", tuta: 22, oidium: 31 },
  { month: "Oct", tuta: 16, oidium: 26 },
  { month: "Nov", tuta: 19, oidium: 28 },
  { month: "Dec", tuta: 12, oidium: 20 },
];

const CustomTick = (props) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      fill="#D4D4D4"
      fontFamily="Open Sans"
      fontSize={10}
      fontStyle="normal"
      fontWeight={400}
      textAnchor="middle"
      dy={16}
      dx={-5}
    >
      {payload.value}
    </text>
  );
};

function LineChartSection() {
  const [data, setData] = useState(data1);

  return (
    <Card className="w-full">
      <CardHeader className="h-1/4 px-[31px]">
        <div className="flex justify-between">
          <CardTitle className="text-[#666] font-manrope text-[16px] font-semibold not-italic capitalize">
            Insects Detected
          </CardTitle>
          <Select
            defaultValue="currentYear"
            onValueChange={(value) => {
              if (value === "currentYear") {
                setData(data1);
              } else if (value === "lastYear") {
                setData(data2);
              }
            }}
          >
            {" "}
            <SelectTrigger className="w-36 h-[32.66px] flex-shrink-0 rounded-[10px] border border-[#D4D4D4]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="currentYear"
                className="text-[#999] font-open-sans text-[10px] font-normal leading-normal"
              >
                Current Year
              </SelectItem>
              <SelectItem
                value="lastYear"
                className="text-[#999] font-open-sans text-[10px] font-normal leading-normal"
              >
                2023
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-3/4">
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                {/* Gradient for Tuta Absoluta (red) */}
                <linearGradient id="colorTuta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4A55" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF4A55" stopOpacity={0} />
                </linearGradient>
                {/* Gradient for Oidium (orange) */}
                <linearGradient id="colorOidium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFA500" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={<CustomTick />} />
              <YAxis tick={<CustomTick />} />
              <Tooltip />
              {/* Area for Tuta Absoluta (red) */}
              <Area
                type="monotone"
                dataKey="tuta"
                stroke="#FF4A55"
                fill="url(#colorTuta)"
                name="Tuta Absoluta"
              />
              {/* Area for Oidium (orange) */}
              <Area
                type="monotone"
                dataKey="oidium"
                stroke="#FFA500"
                fill="url(#colorOidium)"
                name="Oidium"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default LineChartSection;
