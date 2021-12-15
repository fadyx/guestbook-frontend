import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../reducers/userReducer";
import { AppBar, Button, IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => dispatch(onLogout());

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user.token && (
          <Button color="inherit" component={Link} to="/messages">
            Messages
          </Button>
        )}
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          {user.token && <p>logged in as: {user.displayname}</p>}
          {user.token && (
            <Button
              color="secondary"
              id="logout"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
          {!user.token && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {!user.token && (
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
