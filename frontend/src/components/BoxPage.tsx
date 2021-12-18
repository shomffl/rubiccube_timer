import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const BoxPage = () => {
  const [boxList, setBoxList] = useState<string[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const getUserName = localStorage.getItem("username");
    const data = { username: getUserName };
    axios
      .post("/get_box_list", data)
      .then((res) => setBoxList(res.data.box_list));
  }, []);

  


  return (
    <div>
      <button onClick={(e) => navigate("/timer")}>back</button>
      <table cellSpacing="10vw">
        <tr><td>番号</td><td>平均</td></tr>
        {boxList.map((box, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{box[1]}</td>
            <button>選択</button>
            <button >削除</button>
          </tr>
        ))}
      </table>
    </div>
  );
};
