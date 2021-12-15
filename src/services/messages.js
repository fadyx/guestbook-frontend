import axios from "axios";

const baseUrl = "/api/messages";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// message: {_id, text, createdAt, updatedAt, user: {username, displayname, _id}}

// return array of messages
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data.payload;
};

// return a specific message
const getMessage = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data.payload;
};

// returns the new created message object
const create = async (newMessage) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newMessage, config);
  return response.data.payload;
};

// returns updated message
const update = async (message) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.patch(
    `${baseUrl}/${message._id}`,
    message,
    config
  );
  return response.data.payload;
};

// returns true if message is deleted
const remove = async (message) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${message._id}`, config);
  return true;
};

// returns new created reply object
// {text, user(_id), message(_id), _id, createdAt, updatedAt}
const addReply = async (message, reply) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${message._id}/replies`,
    reply,
    config
  );
  return response.data.payload;
};

// return array of replies on a message
const getReplies = async (messageId) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/${messageId}/replies`, config);
  return response.data.payload;
};

export default {
  getAll,
  getMessage,
  create,
  setToken,
  update,
  remove,
  addReply,
  getReplies,
};
