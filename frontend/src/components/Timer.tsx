import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stopwatch } from "./Stopwatch";

export const Timer = () => {
  const [scrambleCode, setScrambleCode] = useState<string>("");
  const [time, setTime] = useState<string>("0000");
  const [selectKey, setSeleteKey] = useState<any>("undefiend");
  console.log(localStorage.getItem("box_id"));

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/get_code").then((res) => {
      setScrambleCode(res.data.code);
    });
  }, []);

  const onClickSend = () => {
    const data = {
      time: time,
      scrambleCode: scrambleCode,
      averageID: localStorage.getItem("box_id"),
    };
    axios.post("/add_time_data", data);
  };

  return (
    <div>
      <h1>{scrambleCode}</h1>
      <Stopwatch time={time} setTime={setTime} />
      <button onClick={onClickSend}>send</button>
      <button onClick={(e) => navigate("/box")}>back</button>
    </div>
  );
};
