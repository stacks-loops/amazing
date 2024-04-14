import { useState } from "react";
import httpClient from "../httpClient";

function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createUser = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/signup", {
        email,
        password,
      });

      // good login takes you to this page
      if (resp.status == 200) {
        window.location.href = "/";
      }

      // console.log(resp.data)
      // bad login error handling
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid, please enter username and password again");
      }
    }
  };
  // Forms for login
  return (
    <div>
      <h1>Join the Spalla Network</h1>
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
        <button type="button" onClick={() => createUser()}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
