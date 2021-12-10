import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosIntance } from "../../config";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [text, setText] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  
  const username = currentUser.username;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosIntance.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect((text) => {
    const loadUsers = async () => {
      const response = await axiosIntance.get(`/users/search/` + { text });
      setUsers(response.data);
    };
    loadUsers();
  }, []);
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "i");
        return user.username.match(regex);
      });
    }

    setSuggestions(matches);
    setText(text);
  };

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">CollegeGram</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
              id="searchName"
              onChange={(e) => onChangeHandler(e.target.value)}
              value={text}
            />
          </div>
        </div>

        <div className="topbarRight">
          <div className="topbarLinks">
            <Link to="/">
              {" "}
              <span className="topbarLink">Homepage</span>
            </Link>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              <div className="topbarIconItem">
                <Chat />
                <span className="topbarIconBadge">2</span>
              </div>
            </Link>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>

          <button className="logoutb" onClick={logout}>
            Logout
          </button>

          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
      <div className="scontainer">
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <Link
              to={`/profile/${suggestion.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="suggestion" key={i}>
                {" "}
                {suggestion.username}
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
