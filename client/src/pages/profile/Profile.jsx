import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState, useRef } from "react";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { CameraEnhance } from "@material-ui/icons";
import UploadPPCP from "../../components/popup/UploadPPCP";
import Messenger from "../messenger/Messenger";
import { axiosIntance } from "../../config";
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosIntance.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };

  const coverPicture = useRef();
  const profilePicture = useRef();
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleclick = async (e) => {
    e.preventDefault();
    const user = {
      _id: currentUser._id,
      username: currentUser.username,
    };
    const data = new FormData();
    var userId = {
      userId: currentUser._id,
    };
    const filecName = file.name;
    data.append("name", filecName);
    data.append("file", file);
    user.coverPicture = filecName;
    try {
      await axiosIntance.post(`/upload`, data, user, {});
      await axiosIntance.put(`/profile/${user._id}`, user, {});
      history.push(`/profile/${user.username}`);
      window.location.reload();
    } catch (err) {
      setError(err.response);
    }
  };
  const handleclicke = async (e) => {
    e.preventDefault();

    const user = {
      _id: currentUser._id,
      username: currentUser.username,
    };
    const data = new FormData();

    const fileName = file.name;
    data.append("name", fileName);
    data.append("file", file);
    user.profilePicture = fileName;
    try {
      await axiosIntance.post(`/upload`, data, user, {});
      await axiosIntance.put(`/profile/${user._id}`, user, {});
      history.push(`/profile/${user.username}`);
      window.location.reload();
    } catch (err) {
      setError(err.response);
    }
  };
  const chatclick = (req, res) => {
    const members = {
      senderId: currentUser._id,
      receiverId: user._id,
    };

    const response = axiosIntance
      .get(`/conversations/find/${currentUser._id}/${user._id}`)
      .then((result) => {
        console.log(result.data);
        if (result.data == null) {
          axiosIntance.post(`/conversations`, members);
        }
        history.push("/messenger/Messenger");
      })

      .catch((err) => {
        setError(err.response);
      });
    return <Redirect to="/messenger/Messenger" />;
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {user.username === currentUser.username && (
                <Link to={`/profile/${user._id}`}>
                  <CameraEnhance
                    onClick={togglePopup}
                    style={{ position: "absolute", marginLeft: 1100 }}
                  ></CameraEnhance>
                </Link>
              )}
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
              />
            </div>
            {user.username == currentUser.username && (
              <Link to={`/profile/${user._id}`}>
                <CameraEnhance
                  onClick={togglePopup2}
                  style={{
                    position: "absolute",
                    marginLeft: 620,
                    marginTop: -50,
                  }}
                />{" "}
              </Link>
            )}
            {isOpen && (
              <UploadPPCP
                content={
                  <>
                    <div class="formPopup" id="popupForm">
                      <form onSubmit={handleclick} class="formContainer">
                        <input
                          type="file"
                          id="filec"
                          ref={coverPicture}
                          name="filec"
                          required
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit" class="btn">
                          Submit
                        </button>
                        <button
                          type="button"
                          class="btn cancel"
                          onClick={togglePopup}
                        >
                          Close
                        </button>
                      </form>
                    </div>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
            {isOpen2 && (
              <UploadPPCP
                content={
                  <>
                    <div class="formPopup" id="popupForm">
                      <form onSubmit={handleclicke} class="formContainer">
                        <input
                          type="file"
                          id="file"
                          ref={profilePicture}
                          name="file"
                          required
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit" class="btn">
                          Submit
                        </button>
                        <button
                          type="button"
                          class="btn cancel"
                          onClick={togglePopup2}
                        >
                          Close
                        </button>
                      </form>
                    </div>
                  </>
                }
                handleClose={togglePopup2}
              />
            )}
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
            {user.username != currentUser.username && (
              <button onClick={chatclick} className="chatbtn">
                Chat
              </button>
            )}
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
