import { CategoriesDataType } from "../../../lib/getReformattedData";
import { CategoryButton } from "../../buttons/CategoryButton";

interface FilterProps {
  categories: CategoriesDataType[];
}

export const Filter = ({ categories }: FilterProps) => {
  return (
    <div className="hidden justify-center gap-1.5 overflow-auto sm:flex">
      {categories.map((category) => (
        <CategoryButton key={category.id} {...category} />
      ))}
    </div>
  );
};
