import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    if (username.length < 5) {
      alert("Username should be more than 5 character");
      return;
    }
    if (password.length < 6) {
      alert("password should be greater than 6 character");
      return;
    }

    console.log(event);
    let user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/signin");
  }

  return (
    <div>
      <h1 className="text-light">Signup</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={function (event) {
            setUserName(event.target.value);
          }}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={onPasswordChange}
        />
        <br />
        <button>Signup</button>
      </form>
      <p>
        Already have an account? <a href="/signin">Login</a>
      </p>
    </div>
  );
}
