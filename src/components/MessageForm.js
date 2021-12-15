import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitMessage } from "../reducers/messageReducer";
import { TextField, Button } from "@material-ui/core";

const MessageForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const createNewMessage = async (event) => {
    event.preventDefault();
    dispatch(submitMessage({ text }));
    setText("");
  };

  return (
    <div className={"formDiv"}>
      <p>Add a new message:</p>
      <form onSubmit={createNewMessage}>
        <TextField
          placeholder="text"
          id="text"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></TextField>
        <Button id="create" variant="contained" color="primary" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};
export default MessageForm;
