import axios from "axios";
const baseUrl = "/api/auth";

// returns {_id, username, displayname, token}
const signup = async (credentials) => {
  const response = await axios.post(`${baseUrl}/signup`, credentials);
  const { user, token } = response.data.payload;
  return { ...user, token };
};

// returns {_id, username, displayname, token}
const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  const { user, token } = response.data.payload;
  return { ...user, token };
};

export default { signup, login };
