import React, { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

interface Props {
  boxList: number[];
  setBoxList: Dispatch<SetStateAction<number[]>>;
}

export const BoxList: React.FC<Props> = (props) => {
  const { boxList, setBoxList } = props;
  const [deleteKey, setDeleteKey] = useState<any>("undefiend");

  const onClickDelete = (e: any) => {
    console.log("key", deleteKey);
    const getUserName = localStorage.getItem("username");
    const data = {
      deleteKey: deleteKey,
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
          setDeleteKey(e.target.value);
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
