import { VscEmptyWindow } from "react-icons/vsc";

export default function EmptyBoardBanner() {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md p-4 gap-2 mt-4">
      <VscEmptyWindow className="text-gray-500 text-4xl" />
      <h1 className="text-xl font-semibold"> Create your first project</h1>
      <p className="text-gray-500">
        Start creating your first project by clicking the Create button above.
      </p>
      <p className="text-gray-500">
        You can create multiple projects and tasks to organize your work
      </p>
    </div>
  );
}
