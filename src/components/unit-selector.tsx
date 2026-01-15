"use client";

interface UnitSelectorProps {
  isMilliseconds: boolean;
  onChange: (isMilliseconds: boolean) => void;
}

export function UnitSelector({ isMilliseconds, onChange }: UnitSelectorProps) {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => onChange(false)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${!isMilliseconds
          ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
      >
        sec
      </button>
      <button
        onClick={() => onChange(true)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${isMilliseconds
          ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
      >
        ms
      </button>
    </div>
  );
}
