import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stopwatch } from "./Stopwatch";

export const Timer = () => {
  const [scrambleCode, setScrambleCode] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectKey, setSeleteKey] = useState<any>("undefiend");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/get_code").then((res) => {
      setScrambleCode(res.data.code);
    });
  }, []);

  const onClickCreateBox = () => {
    const getUserName = localStorage.getItem("username");
    const data = { username: getUserName };
    axios.post("/create_box", data).then((res) => {
    });
  };

  const onClickSend = () => {
    const data = {
      time: time,
      scrambleCode: scrambleCode,
      averageID: selectKey,
    };
    axios.post("/add_time_data", data);
  };

  return (
    <div>
      <h1>{scrambleCode}</h1>
      <button onClick={onClickCreateBox}>create box</button>
      <Stopwatch time={time} setTime={setTime} />
      <button onClick={(e) => navigate("/box")}>send</button>
    </div>
  );
};
