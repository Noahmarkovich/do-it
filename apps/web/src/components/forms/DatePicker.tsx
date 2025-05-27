import { useState, useRef, useEffect } from "react";
import { BsClockFill } from "react-icons/bs";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type DatePickerProps = {
  value: Date | string | null;
  onChange: (date: Date | null) => void;
  format?: string;
  allowClear?: boolean;
};

export default function DatePicker(props: DatePickerProps) {
  const {
    value = null,
    onChange,
    format = "MMMM, D",
    allowClear = true,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null,
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate || new Date(),
  );
  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(
    function () {
      if (value) {
        const date = new Date(value);
        setSelectedDate(date);
        setCurrentMonth(date);
      } else {
        setSelectedDate(null);
      }
    },
    [value],
  );

  function formatDate(date: Date): string {
    if (!date) return "";

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    return format
      .replace("MMMM", monthName)
      .replace("MM", String(monthIndex + 1).padStart(2, "0"))
      .replace("M", String(monthIndex + 1))
      .replace("DD", String(day).padStart(2, "0"))
      .replace("D", String(day));
  }

  function getDaysInMonth(
    year: number,
    month: number,
  ): Array<{ date: Date; isCurrentMonth: boolean }> {
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay() || 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = startingDayOfWeek - 1; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i + 1),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }

  function handleDateSelect(date: Date): void {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
    setIsOpen(false);
  }

  function handleClear(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    setSelectedDate(null);
    if (onChange) {
      onChange(null);
    }
  }

  function goToPreviousMonth(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  }

  function goToNextMonth(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  }

  function isSelectedDate(date: Date): boolean {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  }

  function isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];
  const days = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
  );

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`group inline-flex items-center gap-2 rounded-lg border hover:text-violet-800 ${
          selectedDate
            ? "border-violet-500 bg-violet-50 text-[#7446EA] font-semibold"
            : "border-none"
        } px-3 py-2 text-sm font-medium cursor-pointer`}
      >
        <BsClockFill className="text-[#7446EA] group-hover:text-violet-800" />
        {selectedDate ? (
          formatDate(selectedDate)
        ) : (
          <span className="text-[#7446EA] font-semibold group-hover:text-violet-800">
            Add time
          </span>
        )}
        {selectedDate && allowClear && (
          <button
            onClick={handleClear}
            className="ml-1 text-[#7446EA] hover:text-violet-800"
            aria-label="Clear date"
          >
            <FiX />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute z-10 bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={goToNextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(function (day, index) {
              return (
                <div
                  key={index}
                  className="text-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map(function (day, index) {
              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day.date)}
                  className={`
                    px-2 py-1.5 text-center rounded-full text-sm
                    ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-900"}
                    ${isSelectedDate(day.date) ? " bg-[#7446EA] text-white" : ""}
                    ${isToday(day.date) && !isSelectedDate(day.date) ? "border border-[#7446EA]" : ""}
                    ${day.isCurrentMonth && !isSelectedDate(day.date) ? "hover:bg-gray-100" : ""}
                  `}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-4 gap-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 basis-1/2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedDate) {
                  handleDateSelect(selectedDate);
                } else {
                  const today = new Date();
                  handleDateSelect(today);
                }
              }}
              className="px-4 py-2 text-white rounded-md bg-[#7446EA] hover:bg-violet-800 basis-1/2"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
