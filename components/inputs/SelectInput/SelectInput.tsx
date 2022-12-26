import React, { useState } from "react";

import { CategoriesDataType } from "../../../lib/getReformattedData";
import { classNames } from "../../../utils/classNames";

interface SelectInputProps {
  options: CategoriesDataType[];
  defaultValue?: number;
  title?: string;
  onChange: (value: number) => void;
}

export const SelectInput = ({
  options,
  defaultValue = 0,
  title,
  onChange,
}: SelectInputProps) => {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <>
      {title && <label htmlFor={title}>{title}</label>}
      <select
        className={classNames(
          "h-10 w-full rounded-xl bg-gray-100 pl-3 outline-none transition-all focus:border-2 focus:border-blue-400 focus:bg-white",
          selected === 0 ? "text-gray-400" : ""
        )}
        defaultValue={defaultValue}
        onChange={(event) => {
          setSelected(+event.target.value);
          onChange(parseInt(event.target.value));
        }}
      >
        <option value={0} hidden disabled>
          Category
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  );
};
