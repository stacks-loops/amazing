import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from "./Router.tsx"
import 'bootstrap/dist/css/bootstrap.css'
import { UserProvider } from './components/UserContext'
// import AddPatientForm from './components/AddPatient'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <Router />
    </UserProvider>
  </React.StrictMode>,
  
)
