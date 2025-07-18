import React, { useState } from "react";
import { signInWithGoogle } from "../firebaseConfig";

export default function Google({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle();
      console.log(result)
      onLogin(result.user); // pass user info up
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login with Google"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
