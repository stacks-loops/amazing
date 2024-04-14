import React, { useState } from "react";
import httpClient from "../httpClient"

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async () => {
    console.log(email, password)


    try {
      const resp = await httpClient.post("//localhost:5000/login", {
      email,
      password,
    })
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid login")
      }
      
    }


  }
  // Forms for login
  return (
    <div>
      <h1>Login to your account</h1>
      <form>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id=""
          />
        </div>
        <button type="button" onClick={() => loginUser()}>Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
