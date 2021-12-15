import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stopwatch } from "./Stopwatch";
import { UserNameContext } from "../provider/UserNameContext";

export const Timer = () => {
  const [scrambleCode, setScrambleCode] = useState<string>("");
  const [time, setTime] = useState<any>(0);
  const [boxList, setBoxList] = useState<any[]>([]);
  const { userName } = useContext(UserNameContext);
  console.log(userName);

  useEffect(() => {
    axios.get("/get_code").then((res) => {
      setScrambleCode(res.data.code);
    });
  }, []);

  useEffect(() => {
    const getUserName = localStorage.getItem("username");
    const data = { username: getUserName };
    axios
      .post("/get_box_list", data)
      .then((res) => setBoxList(res.data.box_list));
  }, []);

  const onClickCreateBox = () => {
    const getUserName = localStorage.getItem("username");
    console.log(getUserName);
    const data = { username: getUserName };
    axios.post("/create_box", data).then((res) => {
      setBoxList(res.data.box_list);
    });
  };

  return (
    <div>
      <h1>{scrambleCode}</h1>
      <button onClick={onClickCreateBox}>create box</button>
      <Stopwatch time={time} setTime={setTime} />

      <select>
        {boxList.map((box) => (
          <option key={box}>{box}</option>
        ))}
      </select>
    </div>
  );
};
