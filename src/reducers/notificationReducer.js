const defaultNotification = {
  message: null,
  type: null,
  timeout: null,
};

const notificationReducer = (state = defaultNotification, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        message: action.data.message,
        type: action.data.type,
      };

    case "HIDE_NOTIFICATION":
      return { ...defaultNotification };

    default:
      return state;
  }
};

export const createNotifiation = (message, type, timeout = 5000) => {
  return async (dispatch) => {
    dispatch(showNotification(message, type));
    setTimeout(() => {
      dispatch(hideNotification());
    }, timeout);
  };
};

export const showNotification = (message, type) => ({
  type: "SHOW_NOTIFICATION",
  data: { message, type },
});

export const hideNotification = () => ({
  type: "HIDE_NOTIFICATION",
});

export default notificationReducer;
