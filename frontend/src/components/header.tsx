import { NavLink } from "react-router-dom";

const NavLinkWrapper = ({ to, children }: { to: string; children: React.ReactNode }) => {
	return (
		<NavLink to={to} className="p-1 m-2">
			{children}
		</NavLink>
	);
};

const Header = () => {
	return (
		<header className="w-full flex text-sky-200 justify-between items-center">
			<NavLink to="/" className="text-6xl p-1 m-2">
				CS411 Project
			</NavLink>
			<div className="m-1 p-2 text-2xl">
				<NavLinkWrapper to="/about">About</NavLinkWrapper>
				<NavLinkWrapper to="/mountains-near-me">Mountains Near Me</NavLinkWrapper>
			</div>
		</header>
	);
};

export default Header;
