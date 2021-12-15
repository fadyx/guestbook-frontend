import messageService from "../services/messages";
import { createNotifiation } from "./notificationReducer";

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_MESSAGES":
      return action.data;

    case "ADD_NEW_MESSAGE":
      return [...state, action.data];

    case "DELETE_MESSAGE":
      return state.filter((message) => message._id !== action.data._id);

    default: {
      return state;
    }
  }
};

export const initializeMessages = () => {
  return async (dispatch) => {
    const messages = await messageService.getAll();
    dispatch({
      type: "INIT_MESSAGES",
      data: messages,
    });
  };
};

export const submitMessage = (content) => {
  return async (dispatch) => {
    try {
      const newMessage = await messageService.create(content);
      dispatch({
        type: "ADD_NEW_MESSAGE",
        data: newMessage,
      });
      dispatch(
        createNotifiation(
          `Added a new message ${newMessage.text}, by ${newMessage.user.displayname}`,
          "success"
        )
      );
    } catch (error) {
      dispatch(createNotifiation(error.message, "error"));
    }
  };
};

export const deleteMessage = (message) => {
  return async (dispatch) => {
    try {
      await messageService.remove(message);
      dispatch({
        type: "DELETE_MESSAGE",
        data: { _id: message._id },
      });
      dispatch(createNotifiation(`Successfully removed message.`, "success"));
    } catch (error) {
      dispatch(createNotifiation(error.message, "error"));
    }
  };
};

export default messageReducer;
