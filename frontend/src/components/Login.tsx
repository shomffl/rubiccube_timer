import React, { useState } from "react";
import TextForm from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkError, setCheckError] = useState<boolean>(false);

  const subumitUserData = (e: any) => {
    const data = {
      username: userName,
      password: password,
    };
    e.preventDefault();
    axios.post("/login", data).then((res) => {
      setCheckError(res.data.check_error);
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
          name="password"
          label="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};
