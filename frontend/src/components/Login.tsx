import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextForm from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { UserNameContext } from "../provider/UserNameContext";

export const Login = () => {
  const { userName, setUserName } = useContext(UserNameContext);
  const [password, setPassword] = useState<string>("");
  const [checkError, setCheckError] = useState<boolean>(false);

  const navigate = useNavigate();

  const subumitUserData = (e: any) => {
    const data = {
      username: userName,
      password: password,
    };
    e.preventDefault();
    axios.post("/login", data).then((res) => {
      setCheckError(res.data.check_error);
      navigate(res.data.select_root);
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={subumitUserData}>
        <TextForm
          error={checkError}
          name="username"
          label={checkError ? "Error" : "User Name"}
          onChange={(e) => {
            setUserName(e.target.value);
            setCheckError(false);
          }}
          helperText={
            checkError ? "ユーザー名もしくはパスワードが違います" : ""
          }
        />
        <TextForm
          error={checkError}
          name="password"
          label={checkError ? "Error" : "password"}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setCheckError(false);
          }}
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};
