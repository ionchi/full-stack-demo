import axios from 'axios';
import {
  authHeader,
  setToken,
  setUser,
  clearStorage,
  globalErrorHandler
} from '~/_helpers';

const BOOK_API = process.env.API_URL;

const login = async (email, password) => {
  clearStorage();
  const { data } = await axios.post(`${BOOK_API}/login`,
    { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const jwt = data?.token || null;

  setToken(jwt);
};

const logout = () => {
  clearStorage();
};

const getUserProfile = async () => {
  try {
    const { data } = await axios.get(`${BOOK_API}/api/user`, {
      headers: authHeader()
    });
    setUser(data);
    return data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const editUserProfile = async (userData) => {
  try {
    const { data } = await axios.put(`${BOOK_API}/api/user`, userData, {
      headers: authHeader()
    });
    return data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

export default {
  login,
  logout,
  getUserProfile,
  editUserProfile
};
