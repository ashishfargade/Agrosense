import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {Home} from "./pages/Home";
import {LoginSignup} from "./pages/LoginSignup";

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <LoginSignup/> } />

          <Route path="*" element={ <Home/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
