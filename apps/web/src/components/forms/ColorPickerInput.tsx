import React, { useState, useRef } from "react";

export default function ColorPickerInput({
  value = "#FF5CAA",
  onChange,
  label = "Color",
  className = "",
  error = "",
}: {
  value: string | undefined;
  onChange: (color: string) => void;
  label: string;
  className: string;
  error?: string;
}) {
  const [selectedColor, setSelectedColor] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (onChange) onChange(newColor);
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <span className="text-sm text-gray-500">{label}</span>}

      <div className="relative">
        <button
          type="button"
          className="w-full border border-gray-200 rounded-lg p-2 py-2 flex items-center justify-between bg-white focus:outline-none focus:ring focus:ring-violet-600 focus:border-violet-600"
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: selectedColor }}
            ></div>
            <span className="text-gray-800">{selectedColor.toUpperCase()}</span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          className="absolute w-0 h-0 opacity-0"
          aria-label={`Choose a color (current: ${selectedColor})`}
        />
        {error && <p className="mt-2 text-sm text-gray-400">{error}</p>}
      </div>
    </div>
  );
}
