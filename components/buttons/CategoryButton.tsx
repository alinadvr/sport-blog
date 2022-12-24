import { classNames } from "../../utils/classNames";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import {
  selectFilter,
  setActiveCategory,
} from "../../redux/slices/filterSlice";

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
        "mr-1.5 rounded-full border-none bg-white py-1.5 px-4 text-gray-300 transition-all duration-300 hover:bg-blue hover:text-white",
        activeCategory === id ? "activeButton" : ""
      )}
    >
      {title}
    </button>
  );
};
