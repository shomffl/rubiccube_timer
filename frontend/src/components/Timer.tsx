import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stopwatch } from "./Stopwatch";

export const Timer = () => {
  const [scrambleCode, setScrambleCode] = useState<string>("");
  const [time, setTime] = useState<any>(0);

  useEffect(() => {
    axios.get("/get_code").then((res) => {
      setScrambleCode(res.data.code);
    });
  }, []);
  return (
    <div>
      <h1>{scrambleCode}</h1>
      <Stopwatch time={time} setTime={setTime} />
    </div>
  );
};
