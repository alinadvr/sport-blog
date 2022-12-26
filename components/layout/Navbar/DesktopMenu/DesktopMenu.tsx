import { AccountBlockButton } from "../../../buttons/AccountBlockButton/";

export const DesktopMenu = () => {
  return (
    <>
      <div className="absolute top-[4.7rem] z-20 h-6 w-6 rotate-45 border-2 border-r-0 border-b-0 bg-white"></div>
      <div className="absolute top-[5.4rem] z-10 grid w-60 gap-1.5 rounded-lg border-2 bg-white p-4">
        <AccountBlockButton type="link" to="/account" title="My account" />
        <AccountBlockButton type="link" to="/posts" title="My posts" />
        <AccountBlockButton type="link" to="/saved" title="Saved" />
        <AccountBlockButton type="link" to="/api/logout" title="Log Out" />
      </div>
    </>
  );
};
