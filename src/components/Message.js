import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { deleteMessage } from "../reducers/messageReducer";
import { createNotifiation } from "../reducers/notificationReducer";
import { TextField, Button } from "@material-ui/core";
import messageService from "../services/messages";

const Message = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const message = useSelector((state) =>
    state.messages.find((message) => message._id === id)
  );

  const [replies, setReplies] = useState([]);

  const fetchReplies = async () => {
    const fetchedReplies = await messageService.getReplies(id);
    setReplies(fetchedReplies);
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const [reply, setReply] = useState("");

  const handleDeleteMessage = async (event) => {
    event.preventDefault();
    if (window.confirm(`Do you really want to remove this message?`)) {
      await dispatch(deleteMessage(message));
      history.push("/messages");
    }
  };

  const handleSubmitReply = async (event) => {
    event.preventDefault();

    try {
      const newReply = await messageService.addReply(message, { text: reply });
      setReplies([...replies, newReply]);
      setReply("");
      dispatch(createNotifiation("added reply successfully", "success"));
    } catch (error) {
      dispatch(createNotifiation(error.message, "error"));
    }
  };

  if (!message) return null;

  return (
    <div className={"messageStyle"}>
      <h4>Message: {message.text}</h4>
      <h5>by {message.user.displayname}</h5>
      <hr />

      {user._id === message.user._id && (
        <div>
          <Button
            style={{ margin: 10 + "px" }}
            variant="contained"
            size="small"
            color="primary"
            type="submit"
            onClick={handleDeleteMessage}
          >
            Delete
          </Button>

          <Button
            style={{ margin: 10 + "px" }}
            variant="contained"
            size="small"
            color="primary"
            type="submit"
            onClick={handleDeleteMessage}
          >
            Edit
          </Button>
          <hr />
        </div>
      )}

      <h2>Replies :</h2>
      <TextField
        placholder="Add reply here.."
        type="text"
        value={reply}
        onChange={({ target }) => setReply(target.value)}
      ></TextField>
      <Button
        style={{ margin: 10 + "px" }}
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmitReply}
      >
        Add reply
      </Button>
      <ul>
        {replies.map((r) => (
          <li style={{ marginLeft: 1 + "em", color: "black" }} key={r.id}>
            {r.text} - by: {r.user.displayname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Message;
