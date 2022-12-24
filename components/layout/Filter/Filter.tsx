import React from "react";

import { CategoriesDataType } from "../../../lib/getReformattedData";
import { CategoryButton } from "../../buttons/CategoryButton";

interface FilterProps {
  categories: CategoriesDataType[];
}

export const Filter = ({ categories }: FilterProps) => {
  return (
    <div className="hidden justify-center overflow-auto sm:flex">
      {categories.map((category) => (
        <CategoryButton key={category.id} {...category} />
      ))}
    </div>
  );
};
