import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";

import { initializeMessages } from "./reducers/messageReducer";
import { onAlreadyLogged } from "./reducers/userReducer";

import Message from "./components/Message";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import AuthForm from "./components/AuthForm";
import Navigation from "./components/Navigation";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.token) dispatch(initializeMessages());
  }, [dispatch, user.token]);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedMessageUser");
    if (userJSON) dispatch(onAlreadyLogged(JSON.parse(userJSON)));
  }, [dispatch]);

  return (
    <Container>
      <Navigation />
      <Notification />

      {!user.token && (
        <Switch>
          <Route path="/signup">
            <AuthForm type="signup" />
          </Route>
          <Route path="/">
            <AuthForm type="login" />
          </Route>
        </Switch>
      )}

      {user.token && (
        <Switch>
          <Route path="/messages/:id">
            <Message />
          </Route>
          <Route path="/messages">
            <MessageForm />
            <hr />
            <h2>Current messages</h2>
            <MessageList />
          </Route>
          <Route path="/">
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "30vh" }}
            >
              <Grid item xs={10}>
                <h2>Guestbook Application</h2>
                <h3>Post, delete, and edit messages and replies!</h3>
                <h4>Current status - Total messages: {messages.length}</h4>
              </Grid>
            </Grid>
          </Route>
        </Switch>
      )}
    </Container>
  );
};

export default App;
