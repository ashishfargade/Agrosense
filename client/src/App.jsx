import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {Home} from "./pages/Home";
import {LoginSignup} from "./pages/LoginSignup";
import { Dashboard } from './pages/Dashboard';

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <LoginSignup/> } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={ <Home/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
