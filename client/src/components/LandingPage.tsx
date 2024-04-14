import { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";

function LandingPage() {
  const [user, setUser] = useState<User | null>(null);
  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/"
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");

        setUser(resp.data);
      } catch (error) {
        console.log("User was not authenticated");
      }
    })();
  }, []);

  return (
    <div>
      <h1>Welcome to Spalla</h1>
      {user != null ? (
        <div>
          <h2>You are Signed In</h2>
          <h3>Email: {user.email}</h3>
          <h3>ID: {user.id}</h3>

          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default LandingPage;
