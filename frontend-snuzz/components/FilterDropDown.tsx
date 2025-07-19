"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterDropDownProps {
  title: string;
  _icon: React.ReactNode;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function FilterDropDown({
  title,
  _icon,
  options,
  selected,
  onChange,
}: FilterDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full sm:flex-1">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-white border-2 border-gray-200 transition-colors h-14 flex justify-between"
          >
            <div className="flex items-center">
              <span className="mr-2">{_icon}</span>
              <span className="font-semibold">{title}</span>
              {selected.length > 0 && (
                <span className="ml-2 bg-[#3AF0F7] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selected.length}
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[240px]">
          {options.map(option => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={selected.includes(option)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([...selected, option]);
                } else {
                  onChange(selected.filter(item => item !== option));
                }
              }}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
