import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface DropdownProps {
  options: { label: string; value: string; icon?: React.ReactNode }[];
  selected: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  align?: "right" | "left";
  mt?: string;
}

export default function DropdownMenu({
  options,
  selected,
  onChange,
  isOpen,
  setIsOpen,
  align = "left",
  mt = "mt-2",
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {isOpen && (
        <ul
          className={`absolute z-10 ${mt} bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto transition-all duration-200 w-40 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-[#303030] ${
                selected === option.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {option.icon}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
