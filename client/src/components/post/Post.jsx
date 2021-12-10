import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState, useRef } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UploadPPCP from "../popup/UploadPPCP";
import { axiosIntance } from "../../config";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosIntance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axiosIntance.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  var userId = {
    userId: currentUser._id,
  };
  const deletepost = () => {
    try {
      axiosIntance.delete(`/posts/${post._id}`, { data: userId });
    } catch (err) {}
    window.location.reload();
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };

  const desc = useRef();

  const [setError] = useState(null);
  var userId = {
    userId: currentUser._id,
  };
  const editpost = async () => {
    const posti = {
      _id: post.id,
      desc: desc.current.value,
      userId: currentUser._id,
    };

    try {
      await axiosIntance.put("/posts/" + post._id, posti);

      window.location.reload();
    } catch (err) {
      setError(err.response.user);
    }
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF +user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {user._id == currentUser._id && <MoreVert onClick={togglePopup} />}
          </div>
        </div>
        {isOpen && (
          <UploadPPCP
            content={
              <>
                <div>
                  <ul
                    style={{
                      textDecoration: "none",
                      listStyleType: "none",
                    }}
                  >
                    {isOpen2 && (
                      <UploadPPCP
                        content={
                          <>
                            <div class="formPopup" id="edit">
                              <form onSubmit={editpost} class="formContainer">
                                <input
                                  type="text"
                                  id="desc"
                                  ref={desc}
                                  placeholder="Start Typing"
                                  name="desc"
                                  required
                                />
                                <button type="submit">Save </button>
                                <button className="bt2" onClick={togglePopup2}>
                                  close
                                </button>
                              </form>
                            </div>
                          </>
                        }
                        handleClose={togglePopup}
                      />
                    )}

                    <li>
                      <button onClick={togglePopup2}> Edit Post </button>
                    </li>

                    <li>
                      <button onClick={deletepost}>Delete Post</button>
                    </li>
                    <li>
                      <button className="bt2" onClick={togglePopup}>
                        close
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            }
            handleClose={togglePopup}
          />
        )}
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
