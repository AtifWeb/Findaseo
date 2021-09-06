import { getUser } from "App/helpers/auth";
import axios from "axios";

const user = getUser();

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// axios.defaults.headers.common = {
//   Authorization: `Bearer ${user ? user?.token : ""}`,
// };

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${user ? user?.token : ""}`,
  },
});

export default Axios;

// export default axios;
