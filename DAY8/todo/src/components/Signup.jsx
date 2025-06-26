import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
      alert("Username should be more than 5 characters");
      return;
    }
    if (password.length < 6) {
      alert("Password should be greater than 6 characters");
      return;
    }

    let user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful!");
    navigate("/signin");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div
        className="bg-secondary p-5 rounded shadow"
        style={{ minWidth: "350px" }}
      >
        <h1 className="text-light text-center mb-4">
          <i className="fas fa-user-plus me-2"></i>Signup
        </h1>

        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              onChange={function (event) {
                setUserName(event.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={onPasswordChange}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            <i className="fas fa-user-plus me-2"></i>Signup
          </button>
        </form>

        <p className="text-light text-center mt-3">
          Already have an account?{" "}
          <a href="/signin" className="text-warning text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
