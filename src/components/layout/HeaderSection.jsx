import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GreenLine from "@/assets/GreenLine";
import DropDown from "@/assets/DropDown";
import NotificationIcon from "@/assets/NotificationIcon";

function HeaderSection({ headText }) {
  return (
    <header className="flex h-16 items-center justify-between mb-[35px] sm:px-6">
      <div>
        {/* <div className="text-[#000] font-[Panchang] text-[36px] font-bold capitalize not-italic">
          {headText}
        </div> */}
        <div className="text-[55px] font-bold leading-normal capitalize font-darker-grotesque text-primary">
          {headText}
        </div>
        <GreenLine />
      </div>
      <div className="flex flex-rox items-center gap-[33px]">
        <div className="cursor-pointer">
          <NotificationIcon />
        </div>
        <div className="w-[243px] h-[60px] px-[10px] flex-shrink-0 rounded-[16px] bg-opacity-10 bg-[#006633]">
          <DropdownMenu>
            <div className="h-full flex justify-between items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-[var(--Black-font, #303030)] font-manrope text-[14px] font-semibold not-italic">
                  Mohamed Elalami
                </div>
                <div className="text-[#006333] font-manrope text-[12px] font-medium not-italic">
                  Flights Admin
                </div>
              </div>
              <DropdownMenuTrigger asChild>
                <div className="pr-[16px] cursor-pointer">
                  <DropDown />
                </div>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="end" className="mt-6">
              <DropdownMenuLabel className="w-[243px] h-[60px] px-[10px] flex-shrink-0 rounded-[16px]">
                <div className="flex flex-col">
                  <div className="font-medium">Mohamed Elalami</div>
                  <div className="text-sm text-muted-foreground">
                    Flights Admin
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default HeaderSection;
