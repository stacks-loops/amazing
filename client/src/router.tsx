import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import NotFound from "./components/NotFound"
import LoginPage from "./components/LoginPage"
import SignupPage from './components/Signup'
import HomePage from "./components/HomePage"
import AddPatient from "./components/AddPatient"
import MyPatients from "./components/MyPatients"
import Navbar from "./components/Navbar"
import Providers from "./components/Providers"


function Router() {
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/spalla-home" element={<HomePage />} />
              <Route path="/add-patient" element={<AddPatient />} />
              <Route path="/my-patients" element={<MyPatients />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/test-login" element={<LoginPage />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    )
  }

export default Router;