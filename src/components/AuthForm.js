import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";

import { login, signup } from "../reducers/userReducer";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const action = type === "signup" ? signup : login;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(action({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Please enter your credentials to {type}:</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          type="text"
          label="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        ></TextField>
        <TextField
          id="password"
          type="password"
          label="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        ></TextField>
        <Button variant="contained" color="primary" type="submit">
          {type}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
