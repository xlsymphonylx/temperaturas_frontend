import axios from "axios";
import axiosConfig from "../utils/axiosConfig";

export default {
  getAll() {
    return axios.get("/temp", axiosConfig);
  },
};
