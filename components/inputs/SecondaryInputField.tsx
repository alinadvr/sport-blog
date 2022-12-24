import React from "react";

interface SecondaryInputFieldProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

export function SecondaryInputField({
  value,
  onChange,
  type,
}: SecondaryInputFieldProps) {
  switch (type) {
    case "input":
      return (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={
            "w-full rounded-xl border-2 border-gray-200 pl-3 text-lg outline-none"
          }
        />
      );
    case "textarea":
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            "h-40 w-full resize-none rounded-xl border-2 border-gray-200 p-2 outline-none sm:h-80"
          }
        />
      );
    default:
      return <p>Input type not is valid</p>;
  }
}
