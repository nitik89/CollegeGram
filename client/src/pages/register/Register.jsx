import { useRef, useState } from "react";
import "./register.css";
import { useHistory } from "react-router";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import { axiosIntance } from "../../config";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [error, setError] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosIntance.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        setError("Username/Email already exists");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    }
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
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            {error && <h3> {error}</h3>}
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            {/* {error && <div className="error"> {error} </div>} */}
            <Link to="/login/">
              <button className="loginRegisterButton">Log into Account</button>
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
