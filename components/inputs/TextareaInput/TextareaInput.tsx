import React from "react";
import { classNames } from "../../../utils/classNames";

interface TextareaInputProps {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  styleType: string;
  error?: string;
  placeholder?: string;
}

export const TextareaInput = ({
  title,
  value,
  onChange,
  styleType,
  error,
  placeholder,
}: TextareaInputProps) => {
  const styles: { [type: string]: string } = {
    post: "bg-gray-100 h-12 pl-3 pt-3 box-border outline-none focus:border-blue focus:border-2 focus:bg-white rounded-xl w-full h-64 resize-none",
    account:
      "border-2 border-gray-200 rounded-xl outline-none p-2 w-full sm:h-70 h-40 resize-none",
  };
  return (
    <>
      <label htmlFor={title}>{title}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classNames(
          styles[styleType],
          error ? "border-2 border-rose-500 bg-white focus:border-rose-500" : ""
        )}
        placeholder={placeholder}
      />
    </>
  );
};
