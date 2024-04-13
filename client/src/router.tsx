import { BrowserRouter, Switch, Route } from "react-router-dom"

const router = () => {
  return (
    <BrowserRouter>
    <Switch>
        <Route path="/" component={LandingPage}/>
    </Switch>
    
    </BrowserRouter>
  )
}

export default router