import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import './App.css';
import WelcomePage from './pages/WelcomePage';
import Header from '../src/components/Header'
import About from "./pages/About";

function App() {
  return (
    
      <div className="App">
        <Router> 
        <Header/>
            <Routes>
              <Route path="/" element={<WelcomePage />}/> 
              <Route path="/About" element={<About />}/> 
            </Routes>
          </Router>
      </div>
    
  );
}

export default App;
