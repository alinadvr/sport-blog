import { classNames } from "../../../utils/classNames";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import {
  selectFilter,
  setActiveCategory,
} from "../../../redux/slices/filterSlice";

interface Props {
  id: number;
  title: string;
}

export const CategoryButton = ({ id, title }: Props) => {
  const dispatch = useAppDispatch();
  const { activeCategory } = useSelector(selectFilter);

  return (
    <button
      onClick={() => dispatch(setActiveCategory(id))}
      className={classNames(
        "hover:bg-blue rounded-full py-1.5 px-4 transition-all duration-300 hover:bg-blue-400 hover:text-white",
        activeCategory === id
          ? "bg-blue-400 text-white"
          : "bg-white text-gray-400"
      )}
    >
      {title}
    </button>
  );
};
