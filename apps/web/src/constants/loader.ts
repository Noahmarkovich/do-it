export const sizeClasses = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-24 h-24",
};

export type sizeClassesType = keyof typeof sizeClasses;

export const colorClasses = {
  indigo: "text-violet-600",
  white: "text-white",
  gray: "text-gray-400",
  black: "text-black",
};

export type colorClassesType = keyof typeof colorClasses;
