import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Google from "./Google";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onLogin = (user) => {
    setUser(user);
    console.log(user);
    navigate("/weather")
  
  };

  return (
    <div>
      <h1>Home Page</h1>
      {!user && <Google onLogin={onLogin} />}
    </div>
  );
}
