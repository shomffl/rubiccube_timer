import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stopwatch } from "./Stopwatch";
import { UserNameContext } from "../provider/UserNameContext";
import { BoxList } from "./BoxList";

export const Timer = () => {
  const [scrambleCode, setScrambleCode] = useState<string>("");
  const [time, setTime] = useState<any>(0);
  const [boxList, setBoxList] = useState<number[]>([]);
  const { userName } = useContext(UserNameContext);

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

      <BoxList boxList={boxList} setBoxList={setBoxList} />
    </div>
  );
};
