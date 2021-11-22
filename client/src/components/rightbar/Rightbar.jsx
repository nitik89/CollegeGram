import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import Popup from "../popup/Popup";
import { axiosIntance } from "../../config";
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosIntance.get(`/users/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    try {
      if (followed) {
        axiosIntance.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        axiosIntance.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const city = useRef();
  const age = useRef();
  const relationship = useRef();
  const history = useHistory();
  const [setError] = useState(null);
  const handleClickE = async (e) => {
    e.preventDefault();

    const user = {
      _id: currentUser._id,
      username: currentUser.username,

      city: city.current.value,
      relationship: relationship.current.value,
      age: age.current.value,
    };
    try {
      await axiosIntance.put(`/profile/${user._id}`, user);

      history.push(`/profile/${user.username}`);
    } catch (err) {
      setError(err.response.user);
    }
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Suggested Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          {user.username == currentUser.username && (
            <Link to={`/profile/${user._id}`}>
              {" "}
              <button
                className="rightbarFollowButton"
                style={{
                  position: "absolute",
                  marginLeft: 220,
                  marginTop: -50,
                }}
                onClick={togglePopup}
              >
                Edit Profile
              </button>
            </Link>
          )}
          {isOpen && (
            <Popup
              content={
                <>
                  <div class="formPopup" id="popupForm">
                    <form onSubmit={handleClickE} class="formContainer">
                      <h2>SocialGuruji</h2>
                      <input
                        type="text"
                        id="city"
                        ref={city}
                        placeholder="Your City"
                        name="city"
                        required
                      />
                      <input
                        type="text"
                        id="age"
                        ref={age}
                        placeholder="Your Age"
                        name="age"
                        required
                      />
                      <label for="relationship" class="labelr">
                        Relationship
                      </label>
                      <select
                        class="labelr"
                        id="relationship"
                        name="relationship"
                        ref={relationship}
                      >
                        <option value="1">Single</option>
                        <option value="2">Commited/Married</option>
                        <option value="3">Donot wish to answer</option>
                      </select>
                      <button type="submit" class="btn">
                        Submit
                      </button>{" "}
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

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Age:</span>
            <span className="rightbarInfoValue">{user.age}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Commited/Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
