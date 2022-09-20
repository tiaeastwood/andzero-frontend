import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import './App.css';
import WelcomePage from './pages/WelcomePage';
import Header from '../src/components/Header'
import About from "./pages/About";
import FormPage from "./pages/FormPage"

function App() {
  return (
		<div className="App">
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<WelcomePage />} />
					<Route path="/About" element={<About />} />
					<Route path="/FormPage" element={<FormPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
