import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import NotFound from "./components/NotFound"
import LoginPage from "./components/LoginPage"
import SignupPage from './components/Signup'
import HomePage from "./components/HomePage"
import AddPatient from "./components/AddPatient"

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/spalla-home" element={<HomePage />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/test-login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router