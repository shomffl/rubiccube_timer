import React, { useState } from "react";
import "../App.css";
import TextForm from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkError, setCheckError] = useState<boolean>(false);

  const subumitLoginData = (e: any) => {
    const data = {
      username: userName,
      password: password,
    };
    e.preventDefault();
    axios.post("/register", data).then((res) => {
      setCheckError(res.data.check_error);
    });
  };

  return (
    <form onSubmit={subumitLoginData}>
      <TextForm
        error={checkError}
        name="username"
        label={checkError ? "Error" : "User Name"}
        onChange={(e) => {
          setUserName(e.target.value);
          setCheckError(false);
        }}
        helperText={checkError ? "既に登録されているユーザー名です" : ""}
      />
      <TextForm
        name="password"
        label="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
};
