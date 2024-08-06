import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

function RecentFlightsTable({ data }) {
  return (
    <Card className="rounded-[20px] border border-[#0000001A] bg-[#FFF]">
      <CardHeader className="flex flex-row justify-between px-12">
        <CardTitle className="text-[#666] font-manrope text-[16px] font-bold normal-case">
          Recent Flights
        </CardTitle>
        <div className="text-[#999] font-manrope font-medium leading-normal cursor-pointer">
          View all
        </div>
      </CardHeader>
      <CardContent>
        <Table className="rounded-[59px] border-none px-7 text-[#999] h-[40px] font-open-sans text-[12px] font-normal leading-normal">
          <TableHeader className="rounded-[59px] bg-[#FAFAFA]">
            <TableRow className="rounded-[59px]">
              <TableHead className="h-[40px]">Flight ID</TableHead>
              <TableHead className="h-[40px]">Departure Time</TableHead>
              <TableHead className="h-[40px]">Arrival Time</TableHead>
              <TableHead className="h-[40px]">Duration</TableHead>
              <TableHead className="h-[40px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.endTime}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  <div
                    className={`w-[104.828px] h-[22px] shrink-0 rounded-[24px] ${
                      row.status === "COMPLETED"
                        ? "bg-[#E8FFF8] text-[#21BDCA]"
                        : row.status === "on process"
                        ? "bg-[#FEE] text-[#FF9F24]"
                        : "bg-[#FFEBEB] text-[#FF6243]"
                    } font-open-sans text-[10px] font-semibold flex justify-center items-center`}
                  >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </div>
                </TableCell>
              </TableRow>
            ))}{" "}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentFlightsTable;
