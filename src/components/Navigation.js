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
  const isLoggedIn = user.token;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isLoggedIn && (
          <Button color="inherit" component={Link} to="/messages">
            Messages
          </Button>
        )}
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          {isLoggedIn && (
            <div>
              logged in as: {user.displayname}
              <Button
                color="secondary"
                id="logout"
                type="submit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
