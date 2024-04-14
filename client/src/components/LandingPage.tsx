import React from "react";

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Spalla</h1>
        <div>
          <p>Please Login to continue</p>
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Create Account</button>
            </a>
          </div>
        </div>
    </div>
  );
};

export default LandingPage;
