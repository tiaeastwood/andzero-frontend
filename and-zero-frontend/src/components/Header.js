import { Link } from "react-router-dom";
import AndLogo from "../images/and.png";

function Header() {
	return (
		<header className="ANDRed pt-3 pb-3 pl-2 pr-2 flex justify-center text-5xl">
			<Link to="/">
				{/* <h1>
					<span className="font-bold">AND</span>zero
				</h1> */}
				<img src={AndLogo} alt="and logo" />
			</Link>
		</header>
	);
}

export default Header;
