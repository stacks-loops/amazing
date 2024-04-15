import { useState } from "react";
import httpClient from "../httpClient";
import { useUserContext } from "./UserContext"

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUserId } = useUserContext();

  const loginUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("//localhost:5000/login", {
        email,
        password,
      });
      
      // good login takes you to this page
      if (resp.status == 200){
        //THIS is how you store the uder_id for later use
        setUserId(resp.data.user_id);
        sessionStorage.setItem("user_id", resp.data.user_id)
        window.location.href = "/spalla-home"
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
        <button type="button" onClick={() => loginUser()}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
