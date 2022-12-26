import { useRef } from "react";
import { useAppDispatch } from "../../../redux/store";
import {
  selectFilter,
  setFilterTitle,
} from "../../../redux/slices/filterSlice";
import { useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SearchInputFieldProps {
  styles?: string;
}

export const SearchInput = ({ styles }: SearchInputFieldProps) => {
  const dispatch = useAppDispatch();
  const searchInp = useRef<HTMLInputElement>(null);
  const { filterTitle } = useSelector(selectFilter);

  const handleClearClick = () => {
    dispatch(setFilterTitle(""));
    searchInp && searchInp.current && searchInp.current.focus();
  };

  return (
    <div className="relative">
      <input
        ref={searchInp}
        value={filterTitle}
        onChange={(event) => {
          dispatch(setFilterTitle(event.target.value));
        }}
        className={
          "h-10 rounded-lg border pl-3 outline-none transition-all focus:border-2 focus:border-blue-400 " +
          styles
        }
        placeholder="Search..."
      />
      <XMarkIcon
        className="absolute top-2 right-3 w-6 cursor-pointer text-gray-300 transition-colors hover:text-gray-600"
        onClick={handleClearClick}
      />
    </div>
  );
};
