import { classNames } from "../../utils/classNames";
import React from "react";

interface PrimaryInputFieldProps {
  type: string;
  placeholder: string;
  styleType: string;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  value?: string;
}

export const PrimaryInputField = ({
  type,
  placeholder,
  styleType,
  onValueChange,
  error,
  value,
}: PrimaryInputFieldProps) => {
  const defaultStyles =
    "bg-gray-100 my-1 h-12 pl-3 box-border outline-none focus:border-blue focus:border-2 focus:bg-white";
  let styles;
  switch (styleType) {
    case "post":
      styles = defaultStyles + " rounded-xl w-full";
      break;
    case "login":
    case "signup":
      styles = defaultStyles + " rounded-full sm:w-1/3 w-full";
      break;
    default:
      styles = "";
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classNames(
        styles,
        error ? "border-2 border-rose-600 focus:border-rose-600" : ""
      )}
      onChange={(event) => {
        onValueChange(event.target.value);
      }}
      value={value}
    />
  );
};
