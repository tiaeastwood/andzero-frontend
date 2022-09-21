import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="ANDRed pt-3 pb-3 pl-2 pr-2 flex justify-center text-5xl">
			<Link to="/">
				<h1>
					<span className="font-bold">AND</span>zero
				</h1>
			</Link>
		</header>
	);
}

export default Header;
