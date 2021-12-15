import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

import messageService from "../services/messages";

import { deleteMessage, updateMessage } from "../reducers/messageReducer";
import { createNotifiation } from "../reducers/notificationReducer";

const Message = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const message = useSelector((state) =>
    state.messages.find((message) => message._id === id)
  );

  const [showUpdateField, setShowUpdateField] = useState(false);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");

  const fetchReplies = async () => {
    const fetchedReplies = await messageService.getReplies(id);
    setReplies(fetchedReplies);
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const handleDeleteMessage = async (event) => {
    event.preventDefault();
    if (window.confirm(`Do you really want to remove this message?`)) {
      await dispatch(deleteMessage(message));
      history.push("/messages");
    }
  };

  const handleUpdateMessage = async (event) => {
    event.preventDefault();
    if (updatedMessage) {
      dispatch(updateMessage({ ...message, text: updatedMessage }));
      setUpdatedMessage("");
      setShowUpdateField(false);
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

  if (!message) return <div>Message not found!</div>;

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
            onClick={() => setShowUpdateField(!showUpdateField)}
          >
            Edit
          </Button>

          {showUpdateField && (
            <div>
              <TextField
                placholder="Add updated message here.."
                type="text"
                value={updatedMessage}
                onChange={({ target }) => setUpdatedMessage(target.value)}
              ></TextField>
              <Button
                style={{ margin: 10 + "px" }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleUpdateMessage}
              >
                Submit Update
              </Button>
            </div>
          )}
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
          <li style={{ marginLeft: "2em", color: "black" }} key={r._id}>
            {r.text} - by: {r.user.displayname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Message;
