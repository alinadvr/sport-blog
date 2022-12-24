import { classNames } from "../../../utils/classNames";

interface TextInputFieldProps {
  type: string;
  title?: string;
  value: string;
  onChange: (value: string) => void;
  styleType: "post" | "login" | "account";
  error?: string;
  placeholder?: string;
}

export const TextInput = ({
  type,
  title,
  value,
  onChange,
  styleType,
  error,
  placeholder,
}: TextInputFieldProps) => {
  const styles: { [type: string]: string } = {
    post: "rounded-xl w-full h-12 pl-3 box-border outline-none focus:border-blue focus:border-2 focus:bg-white",
    login:
      "rounded-full w-full h-12 pl-3 box-border outline-none focus:border-blue focus:border-2 focus:bg-white",
    account: "w-full text-xl border-2 rounded-xl outline-none pl-3 py-0.5",
  };

  return (
    <>
      <label htmlFor={title}>{title}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={classNames(
          styles[styleType],
          error
            ? "border-2 border-rose-500 bg-white focus:border-rose-500"
            : styleType === "account"
            ? "bg-white"
            : "bg-gray-100"
        )}
        placeholder={placeholder}
      />
    </>
  );
};
