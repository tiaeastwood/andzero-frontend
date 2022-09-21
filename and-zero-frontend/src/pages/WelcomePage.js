import {Link} from "react-router-dom";

function WelcomePage() {
    return (
        <>
            <div className="hero min-h-screen" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2813&q=80")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                            <p className="mb-5">Are you ready to see how you can improve your sustainability?</p>
                            <div className="flex flex-col">
                            <Link to="/About"> <button id="welcomePageBtn" className="btn btn-primary ANDRed">Get Started</button> </Link>
                                
                             </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default WelcomePage