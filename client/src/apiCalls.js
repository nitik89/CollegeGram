import { axiosIntance } from "./config";
import "./context/AuthActions";
import { LoginFailure, LoginSuccess, LoginStart } from "./context/AuthActions";
export const loginCall = async (userCredential, dispatch, err) => {
  dispatch(LoginStart());
  try {
    const res = await axiosIntance.post("/auth/login", userCredential);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    const m = "Wrong Credentials";
    dispatch(LoginFailure(err), m);
    // console.log(err);
  }
};
