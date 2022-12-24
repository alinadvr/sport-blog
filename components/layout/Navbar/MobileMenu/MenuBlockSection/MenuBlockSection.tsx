import { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

export const MenuBlockSection = ({ title, children }: Props) => {
  return (
    <section className="mx-auto grid w-5/6 gap-1.5">
      <h1 className="text-center text-xl font-medium">{title}</h1>
      {children}
      <div className="my-3 h-0.5 w-full bg-gray-200"></div>
    </section>
  );
};
