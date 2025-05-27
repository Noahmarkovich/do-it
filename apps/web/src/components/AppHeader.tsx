import logo from "/photos/doIt-logo.png";
import { FaAngleDown } from "react-icons/fa6";
import { useContext, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { dropdownOptions } from "@/constants/app-header";

export default function AppHeader() {
  const { user } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  function onLogout() {
    sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <header className="border-b border-gray-200 pb-3">
      <div className="h-2 bg-linear-to-r from-violet-800 to-fuchsia-400"></div>
      <div className="m-auto px-5 md:px-[10%] lg:px-[20%] flex items-center justify-between h-full pt-2">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
        {user && (
          <div className="flex items-center justify-between gap-2 border border-gray-200 rounded-full p-1 pr-2">
            <div className="bg-gray-100 rounded-full p-1 w-10 h-10">
              <img
                className="rounded-full"
                src={
                  user && user.avatarUrl
                    ? user.avatarUrl
                    : "photos/no-user-icon.png"
                }
                alt="no user icon"
              />
            </div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-800"
            >
              <FaAngleDown />
            </button>
            <DropdownMenu
              options={dropdownOptions}
              selected={""}
              onChange={onLogout}
              isOpen={isDropdownOpen}
              setIsOpen={setIsDropdownOpen}
              align="right"
              mt="mt-6"
            />
          </div>
        )}
      </div>
    </header>
  );
}
