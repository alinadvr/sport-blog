import React from "react";

import { CategoriesDataType } from "../../lib/getReformattedData";

interface Props {
  options: CategoriesDataType[];
  defaultValue?: number;
  title?: string;
  onChange: (value: number) => void;
}

export const SelectInput = ({
  options,
  defaultValue,
  title,
  onChange,
}: Props) => {
  return (
    <>
      {title && <label htmlFor={title}>{title}</label>}
      <select
        className="box-border h-10 w-full rounded-xl bg-gray-100 pl-3 outline-none focus:border-2 focus:border-blue focus:bg-white"
        defaultValue={defaultValue || 0}
        onChange={(event) => onChange(parseInt(event.target.value))}
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
