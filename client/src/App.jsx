import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home } from "./pages/Home";
import { LoginSignup } from "./pages/LoginSignup";
import { Dashboard } from "./pages/Dashboard";
import ProtectedRoute from "./app/utils/ProtectedRoute";
import { PredictForm } from "./pages/PredictForm.jsx";
import { DiseaseForm } from "./pages/DiseaseForm.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginSignup />} />
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/fertpredict" element={<PredictForm/>}/>
                        <Route path="/diseasepredict" element={<DiseaseForm/>}/>
                    </Route>
                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
