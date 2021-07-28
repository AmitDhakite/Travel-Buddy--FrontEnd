import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/index";
import axios from "./axios";

const fetchUser = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const res = await axios.post("getUserById", { userId });
  } catch (e) {
    console.log(e);
  }
};

export default fetchUser;
