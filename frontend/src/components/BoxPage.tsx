import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const BoxPage = () => {
  const [boxList, setBoxList] = useState<String[]>([]);
  const [selectKey, setSelectKey] = useState<String>();
  const [boolList, setBoolList] = useState<boolean[]>([]);
  const [openGo, setOpenGo] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserName = localStorage.getItem("username");
    const data = { username: getUserName };
    axios.post("/get_box_list", data).then((res) => {
      setBoxList(res.data.box_list);
      setBoolList([...Array(res.data.box_num)].map(() => true));
    });
  }, []);

  const onClickCreate = (e: any) => {
    const getUserName = localStorage.getItem("username");
    const data = { username: getUserName };
    axios.post("/create_box", data).then((res) => {
      setBoxList(res.data.box_list);
      setBoolList([...Array(res.data.box_num)].map(() => true));
    });
  };

  const onClickDelete = (e: any) => {
    const getUserName = localStorage.getItem("username");
    const data = {
      deleteKey: selectKey,
      username: getUserName,
    };
    axios.post("/delete_box", data).then((res) => {
      setBoxList(res.data.box_list);
      setBoolList([...Array(res.data.box_num)].map(() => true));
      setOpenGo(true);
    });
  };

  return (
    <div>
      <button onClick={onClickCreate}>create box</button>
      <button onClick={(e) => navigate("/timer")} disabled={openGo}>
        go
      </button>
      <table>
        <tbody>
          {boxList.map((box, index) => (
            <tr key={index} id={box[0]}>
              <td>{index + 1}</td>
              <td>{box[1]}</td>
              <td>
                <button
                  onClick={(e) => {
                    setSelectKey(box[0]);
                    boolList[index] = false;
                    localStorage.setItem("box_id", box[0]);
                    setOpenGo(false);
                  }}
                >
                  選択
                </button>
              </td>
              <td>
                <button onClick={onClickDelete} disabled={boolList[index]}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
