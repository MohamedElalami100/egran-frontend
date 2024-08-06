import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function StatsCard({ title, value, icon, rectangle, card_style }) {
  return (
    <Card className={card_style}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle
          className="relative text-[24px] capitalize
         inline-block font-[manrope] text-[#006633] text-left"
        >
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex justify-between">
        {rectangle}
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
