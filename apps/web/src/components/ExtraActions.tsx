import { FaCheckCircle, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Loader from "./Loader";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

type ExtraActionsProps = {
  completedTasks: number;
  totalTasks: number;
  search: string;
  setSearch: (search: string) => void;
  openCategoryMenu: () => void;
  isLoading: boolean;
};

export default function ExtraActions({
  completedTasks,
  totalTasks,
  search,
  setSearch,
  openCategoryMenu,
  isLoading,
}: ExtraActionsProps) {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
      <div className="basis-full md:basis-auto">
        <h1 className="text-3xl font-semibold">Hello, {user?.name}</h1>
        <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
          You have{" "}
          <span className="text-violet-800 font-semibold flex items-center">
            <FaCheckCircle className="mr-1" />
            {completedTasks}/{totalTasks}
          </span>{" "}
          completed tasks
        </p>
      </div>
      <div className="flex items-center gap-2 basis-full md:basis-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-38 focus:w-64 transition-all duration-300 ease-in-out border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <IoMdClose className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={openCategoryMenu}
          className="bg-violet-700 text-white px-4 py-2 rounded-md hover:bg-violet-900 transition-colors"
        >
          {isLoading ? <Loader size="sm" color="white" /> : <span>Create</span>}
        </button>
      </div>
    </div>
  );
}
