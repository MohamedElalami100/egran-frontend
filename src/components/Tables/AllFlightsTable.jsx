import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import SearchIcon from "@/assets/SearchIcon";

const columns = [
  "Flight ID",
  "Departure Time",
  "Arrival Time",
  "Duration",
  "Status",
];

function AllFlightsTable({ tableData, tableError, tableLoading }) {
  if (tableLoading) return <div>Loading...</div>;
  if (tableError) return <div>An error occurred: {tableError?.message}</div>;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(tableData);
  console.log(tableData);

  const handleSearchChange = () => {
    const value = searchTerm.toLowerCase();
    const filtered = tableData.filter((row) => {
      console.log(row.name.toLowerCase());
      return (
        row.id.toLowerCase().includes(value) ||
        row.startTime.toLowerCase().includes(value) ||
        row.endTime.toLowerCase().includes(value) ||
        row.duration.toLowerCase().includes(value) ||
        row.status.toLowerCase().includes(value)
      );
    });
    console.log(filtered);
    setFilteredData(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchChange();
    }
  };

  return (
    <Card className="rounded-[20px] border border-[#0000001A] bg-[#FFF]">
      <CardHeader className="px-12">
        <div className="flex justify-end items-center">
          <div className="flex w-[350px] h-[40px] p-[10px] pl-[27px] justify-between items-center shrink-0 rounded-[129px] border border-[#999] bg-[#FFF]">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow bg-transparent outline-none"
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={() => handleSearchChange()} className="">
              <SearchIcon />
            </button>
          </div>
          <div className="flex items-center gap-4"></div>
        </div>
        <CardTitle className="text-[#666] font-manrope text-[16px] font-bold normal-case mt-4">
          All Flights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="rounded-[59px] border-none px-7 text-[#999] h-[40px] font-open-sans text-[12px] font-normal leading-normal">
          <TableHeader className="rounded-[59px] bg-[#FAFAFA]">
            <TableRow className="rounded-[59px]">
              {columns.map((column) => (
                <TableHead key={column} className="h-[40px]">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AllFlightsTable;
