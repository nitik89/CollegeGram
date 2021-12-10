import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import EditOffIcon from '@mui/icons-material/EditOff';
import WorkIcon from '@mui/icons-material/Work';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Keyboard from "@mui/icons-material/Keyboard";


export default function Sidebar() {
  const { user: currentUser } = useContext(AuthContext);
const username = currentUser.username;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>{" "}
          </Link>
          <Link to="/messenger/Messenger" style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>{" "}
          </Link>
          <Link to="/ide" style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <EditOffIcon className="sidebarIcon" />
              <span className="sidebarListItemText">IDE</span>
            </li>{" "}
          </Link>

          <Link to={{ pathname: `/resumeBuilder/${currentUser._id}` }}  style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <AssignmentIndIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Resume Builder</span>
            </li>{" "}
          </Link>
          <Link to="/openboard" style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
            <KeyboardIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Open Board</span>
            </li>{" "}
          </Link>
          <Link to="/jobs" style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <WorkIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Jobs</span>
            </li>{" "}
          </Link>
          
          
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <Link
              to={{ pathname: "https://www.instagram.com/narang_nitik/" }}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <span className="sidebarListItemText">Contact Admin</span>
            </Link>
          </li>
          
       
        </ul>
        <button className="sidebarButton">Show More</button>

        <hr className="sidebarHr" />
        <h4>People You May Know </h4>

        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
