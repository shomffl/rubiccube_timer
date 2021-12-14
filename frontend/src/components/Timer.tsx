import React, { useState, useEffect } from "react";
import axios from "axios";

export const Timer = () => {
  const [scrambleCode, setScrambleCode] = useState<string>("");
  useEffect(() => {
    axios.get("/get_code").then((res) => {
      setScrambleCode(res.data.code);
    });
  }, []);
  return (
    <div>
      <h1>{scrambleCode}</h1>
    </div>
  );
};
