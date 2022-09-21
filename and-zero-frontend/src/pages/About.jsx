import { Link } from "react-router-dom";


function About() {
  return (
		<>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: `url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2813&q=80")`,
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">About</h1>
						<div className="mb-5">
							<p className="mb-4">
								{" "}
								Here at AND we are always trying to find more ways to become
								sustainable.{" "}
							</p>
							<p className="mb-4">
								{" "}
								Through this app and short questionnaire, we can measure how you
								can improve your sustainability and the impact you can have,
								purely through pledging to use a reusable coffee cup.
							</p>
							<p className="mb-4">
								{" "}
								If you’re ready to find out how big an impact you can have, hit
								continue!{" "}
							</p>{" "}
						</div>
						<div className="flex flex-col">
							<Link to="/FormPage">
								{" "}
								<button
									id="continueBtn"
									className="btn btn-primary ANDRed mb-6"
								>
									Continue
								</button>{" "}
							</Link>
						</div>
						<p className="mb-5">
							Alternatively if you have already contributed you can log into
							your area below to view your stats.
						</p>
						<Link to="Stats">
							<button id="skipBtn" className="btn btn-primary ANDRed ">
								Log In{" "}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
