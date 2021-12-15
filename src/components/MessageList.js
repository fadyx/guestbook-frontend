import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

import { Button } from "@material-ui/core";
import { deleteMessage } from "../reducers/messageReducer";

const MessageList = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);

  const handleDeleteMessage = async (message) => {
    if (window.confirm(`Do you really want to remove this message?`)) {
      dispatch(deleteMessage(message));
    }
  };

  if (messages.length === 0) return <h2>No messages here yet!</h2>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => {
            return (
              <TableRow key={message._id}>
                <TableCell>
                  <Link to={`/messages/${message._id}`}>{message.text}</Link>
                </TableCell>
                <TableCell>{message.user.displayname}</TableCell>
                <TableCell>{moment(message.createdAt).fromNow()}</TableCell>
                <TableCell>
                  {user._id === message.user._id && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="small"
                      onClick={() => handleDeleteMessage(message)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MessageList;
