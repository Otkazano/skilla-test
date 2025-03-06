import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const fetchCallsAPI = async () => {
  const response = await axios.post(`${API_URL}/mango/getList`, null, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};