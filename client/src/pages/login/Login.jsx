import { useContext, useRef, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const handleClick = (e) => {
    e.preventDefault();

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
      setTimeout(() => {
        setError("Wrong Credentials");
      }, 1000),

      setTimeout(() => {
        setError("");
      }, 5000)
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialGuruji</h3>
          <span className="loginDesc">
            Connecting you and your friends always.
          </span>
        </div>
        <div className="loginRight">
          {error && <h3>{error} </h3>}
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>

            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              {" "}
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
      <Link
        to={{ pathname: "https://wa.me/919773728407" }}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <div>
          <h2 className="help">
            Need Help? &nbsp;&nbsp;
            <WhatsAppIcon />
          </h2>
        </div>
      </Link>
    </div>
  );
}
