import { NavLink } from "react-router-dom";

const NavLinkWrapper = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink to={to} className="p-1 m-1 w-2/5 text-center rounded-lg flex-1">
      {children}
    </NavLink>
  );
};

const Header = () => {
  return (
    <header className="w-full flex text-sky-200 justify-between items-center">
      <NavLink to="/" className="text-4xl sm:text-6xl p-1 m-2">
        CS411 Project
      </NavLink>
      <div className="m-1 p-1 text-md flex items-center flex-nowrap sm:text-2xl">
        <NavLinkWrapper to="/about">About</NavLinkWrapper>
        <NavLinkWrapper to="/mountains-near-me">
          Mountains Near Me
        </NavLinkWrapper>
        <NavLinkWrapper to="/profile">Profile</NavLinkWrapper>
      </div>
    </header>
  );
};

export default Header;
