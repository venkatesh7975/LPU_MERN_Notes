
import React, { useState, useEffect } from "react";

export default function Fetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
 
      (async function fetchData() {
        const response = await fetch("http://localhost:3001/");
        const data = await response.json();
        setData(data);
        console.log("hello");
      })();
    
  }, []);

  return <div>{data}</div>;
}
