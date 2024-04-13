import { BrowserRouter, Route } from "react-router-dom"
import LandingPage from "./LandingPage"

const Router = () => {
  return (
    <BrowserRouter>
    
        <Route path="/" component={LandingPage} />
    
    </BrowserRouter>
  )
}

export default Router