import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import type { Category } from "@/types/category.type";

export default function CategorySelect({
  categories,
  category,
  updateSelectedCategory,
  error,
}: {
  categories: Category[];
  category?: Category;
  updateSelectedCategory: (category: Category) => void;
  error?: string;
}) {
  const [selected, setSelected] = useState(category || categories[0]);
  const [open, setOpen] = useState(false);

  function openMenu(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setOpen(!open);
  }

  function handleSelectCategory(
    e: React.MouseEvent<HTMLLIElement>,
    newCategory: Category,
  ) {
    e.preventDefault();
    setSelected(newCategory);
    updateSelectedCategory(selected);
    setOpen(false);
  }

  return (
    <div className="relative text-sm flex flex-col gap-1 basis-full md:basis-1/3">
      <label className="text-sm text-gray-500">Category</label>
      <button
        className={`border border-gray-200 rounded-md p-2 px-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-violet-500 gap-2 ${error ? "border-red-600" : ""}`}
        onClick={openMenu}
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-5 h-5 rounded-full`}
            style={{ backgroundColor: selected.color }}
          ></span>
          <span className="text-base text-[#303030]">{selected.name}</span>
        </div>
        {open ? (
          <IoChevronUp className="text-gray-500" />
        ) : (
          <IoChevronDown className="text-gray-500" />
        )}
      </button>

      {open && (
        <ul className="absolute z-10 mt-18 w-full bg-white border border-gray-200 rounded-md shadow-md">
          {categories.map((category) => (
            <li
              key={category.name}
              className="flex items-center justify-between px-3 py-4 hover:bg-gray-100 cursor-pointer"
              onClick={(e) => {
                handleSelectCategory(e, category);
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full`}
                  style={{ backgroundColor: category.color }}
                ></span>
                <span className="text-base text-[#303030]">
                  {category.name}
                </span>
              </div>
              {category.name === selected.name && (
                <FaCheck className="text-gray-400 w-4 h-4" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
