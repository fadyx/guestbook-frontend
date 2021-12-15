import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { initializeMessages } from "./reducers/messageReducer";
import { onAlreadyLogged, onLogout } from "./reducers/userReducer";

import Message from "./components/Message";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import AuthForm from "./components/AuthForm";
import Navigation from "./components/Navigation";
import Notification from "./components/Notification";

import {
  Container,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const App = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.token) {
      dispatch(initializeMessages());
    }
  }, [dispatch, user.token]);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedMessageUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(onAlreadyLogged(user));
    }
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
        <div>
          <Switch>
            <Route path="/messages/:id">
              <Message />
            </Route>
            <Route path="/messages">
              <MessageForm />
              <hr />
              <h2>Current messages</h2>
              <MessageList messages={messages} />
            </Route>
            <Route path="/">
              <Container>
                <h1>Guestbook Application</h1>
                <p>Post, delete, and edit messages and replies!</p>
                <h3>Current status:</h3>
                <TableContainer>
                  <TableBody>
                    <TableRow>
                      <TableCell>Messages: {messages.length}</TableCell>
                    </TableRow>
                  </TableBody>
                </TableContainer>
              </Container>
            </Route>
          </Switch>
        </div>
      )}
    </Container>
  );
};

export default App;
