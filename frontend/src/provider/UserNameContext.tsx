import React from "react";

export const UserNameContext = React.createContext(
  {} as {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
  }
);
