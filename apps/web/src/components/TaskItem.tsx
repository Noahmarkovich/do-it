import { FaCheck } from "react-icons/fa6";
import type { Task } from "@/types/task.types";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

type TaskItemProps = {
  task: Task;
  categoryColor: string;
  onToggleComplete: (task: Task) => void;
  openTaskFormModal: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function TaskItem({
  task,
  categoryColor,
  onToggleComplete,
  openTaskFormModal,
  onDeleteTask,
}: TaskItemProps) {
  function formatDate(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();

    return `${weekday} — ${month}, ${day}`;
  }

  function onEditTask(task: Task) {
    openTaskFormModal(task);
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between group">
        <div className="flex gap-2">
          {task.isCompleted ? (
            <div
              onClick={() => onToggleComplete(task)}
              className="rounded-full w-5 h-5 flex items-center justify-center border-2 cursor-pointer mt-[2px]"
              style={{
                borderColor: categoryColor,
                backgroundColor: categoryColor,
              }}
            >
              <FaCheck color="white" />
            </div>
          ) : (
            <div
              onClick={() => onToggleComplete(task)}
              className="rounded-full w-5 h-5 flex items-center justify-center border-2 cursor-pointer mt-[2px]"
              style={{ borderColor: categoryColor }}
            >
              <div
                className="rounded-full w-5 h-5 flex items-center justify-center"
                style={{
                  backgroundColor: categoryColor,
                  filter: "opacity(0.3)",
                }}
              ></div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">{task.title}</h3>
            {task.description && (
              <p className="text-gray-500 text-sm">{task.description}</p>
            )}
            <div className="flex items-center gap-3">
              {task.isCompleted && (
                <div className="inter-tight flex items-center gap-1 text-violet-600 mt-1 bg-violet-100 rounded-lg p-[2px] pr-2">
                  <FaCheck className="text-violet-300" />
                  <p className="text-sm">Completed</p>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-1 text-violet-800 mt-1">
                  <BsClockFill className="text-sm" />
                  <p className="text-sm">{formatDate(task.dueDate)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2  opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onToggleComplete(task)}
            className="text-gray-500 border border-gray-300 rounded-lg p-1 hover:text-gray-700 h-8 w-8 flex items-center justify-center"
          >
            {task.isCompleted ? <FaTimes /> : <FaCheck />}
          </button>
          <button
            onClick={() => onEditTask(task)}
            className="text-gray-500 border border-gray-300 rounded-lg p-1 hover:text-gray-700 h-8 w-8 flex items-center justify-center"
          >
            <MdModeEditOutline />
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-gray-500 border border-gray-300 rounded-lg p-1 hover:text-gray-700 h-8 w-8 flex items-center justify-center"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
