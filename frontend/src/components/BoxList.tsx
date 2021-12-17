import React, { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

interface Props {
  boxList: number[];
  setBoxList: Dispatch<SetStateAction<number[]>>;
  selectKey: string;
  setSelectKey: Dispatch<SetStateAction<string>>;
}

export const BoxList: React.FC<Props> = (props) => {
  const { boxList, setBoxList, selectKey, setSelectKey } = props;

  const onClickDelete = (e: any) => {
    console.log("key", selectKey);
    const getUserName = localStorage.getItem("username");
    const data = {
      deleteKey: selectKey,
      username: getUserName,
    };
    axios.post("/delete_box", data).then((res) => {
      setBoxList(res.data.box_list);
    });
  };
  return (
    <>
      <select
        onChange={(e: any) => {
          setSelectKey(e.target.value);
        }}
      >
        {boxList.map((box, index) => (
          <option key={box}>{index + 1}</option>
        ))}
      </select>
      <button onClick={onClickDelete}>delete</button>
    </>
  );
};
