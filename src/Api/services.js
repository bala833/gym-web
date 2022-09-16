import axios from "axios";
const base_url1 = process.env.REACT_APP_URL;
const base_url = "http://127.0.0.1:8000/";

export const GetUserByToken = async () => {
  const signToken = await localStorage.getItem("token");
  let token = { token: signToken };
  try {
    return await axios.post(`${base_url}api/get-user-token/`, token);
  } catch (err) {
    return err.response;
  }
};

export const Logout = async () => {
  const token = localStorage.getItem("token");
  try {
    return await axios.post(
      `${base_url}api/logout-user/`,
      {},
      { headers: { Authorization: `token ${token}` } }
    );
  } catch (err) {
    return err.response;
  }
};

export const UserRegistration = async (payload) => {
  try {
    return await axios.post(`${base_url}api/userprofile/register/`, payload);
  } catch (err) {
    return err.response;
  }
};

export const GetUserById = async (payload) => {
  const token = localStorage.getItem("token");
  try {
    return await axios.post(`${base_url}api/getuser-id/`, payload, {
      headers: { Authorization: `token ${token}` },
    });
  } catch (err) {
    return err.response;
  }
};
