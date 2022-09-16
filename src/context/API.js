import Axios from "axios";
// import { logout } from '../../utils/corefunctions'

const API = Axios.create({});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      //logout if unauthorized
      // logout()
    }
    return Promise.reject(error);
  }
);
export default API;
