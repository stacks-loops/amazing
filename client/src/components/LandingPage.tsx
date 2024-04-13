import React from 'react'


const LandingPage: React.FC = () => {
  return (
    <div>
        <h1>Welcome to Spalla</h1>
        <p>Please Login to continue</p>
        <a href="/login">
            <button>Login</button></a>
        <a href="/register">
            <button>Create Account</button></a>
        
    </div>
  )
}

export default LandingPage