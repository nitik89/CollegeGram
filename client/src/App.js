import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Page404 from "./pages/page404";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Popup from "./components/popup/Popup";
import Ide from "./components/ide/Ide";
import Builder from "./components/ResumeBuilder/Builder";
import Resume from "./components/ResumeBuilder/comp/Resume";
import My from "./components/My";
import Openboard from "./components/OpenBoard/Openboard";
import Display from "./components/jobs/Display";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>  
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/ide">
          {!user ? <Redirect to="/" /> : <Ide />} 
        </Route>
        <Route path="/resumeBuilder">
          {!user ? <Redirect to="/" /> : <Builder/>}
        </Route>
        <Route path="/openboard">
          {!user ? <Redirect to="/" /> : <Openboard/>}
        </Route>
        <Route path="/jobs">
          {!user ? <Redirect to="/" /> : <Display/>}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/profile/:._id">
          <Popup />
        </Route>
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
