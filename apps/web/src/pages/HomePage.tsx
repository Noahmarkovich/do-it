import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  function onGetStartedClicked() {
    if (user) {
      navigate("/tasks");
    } else {
      navigate("/login");
    }
  }
  console.log("check");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-6 w-[350px] gap-4">
        <h1 className="text-4xl font-bold">👩‍💻</h1>
        <h2 className="text-xl font-bold">Welcome to DoIt</h2>
        <p className="text-gray-400 text-center">
          Sign In to add new assignments and projects to complete.
        </p>
        <button
          onClick={onGetStartedClicked}
          className="bg-[#7446EA] hover:bg-violet-700 text-white px-4 py-2 rounded-md"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
