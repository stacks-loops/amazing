import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import NotFound from "./components/NotFound"

const Router: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router