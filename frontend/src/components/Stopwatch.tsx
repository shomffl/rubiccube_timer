import React, { useState, Dispatch, SetStateAction } from "react";

export const Stopwatch: React.FC<{
  time: any;
  setTime: Dispatch<SetStateAction<any>>;
}> = (props) => {
  const [start, setStart] = useState<number>(0);
  const { time, setTime } = props;
  const onClickStart = () => {
    const startTime = performance.now();
    setStart(startTime);
  };

  const onClickStop = () => {
    const endTime = performance.now();
    const cul = (endTime - start) / 1000;
    setTime(cul.toFixed(3));
    console.log(typeof Number(time));
  };

  return (
    <div>
      <h1>{time}</h1>
      <button onClick={onClickStart}>start</button>
      <button onClick={onClickStop}>stop</button>
    </div>
  );
};
