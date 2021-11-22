import React from "react";
import "./popup.css";

const Popup = (props) => {
  return (
    <>
      <div class="loginPopup">{props.content}</div>
    </>
  );
};
export default Popup;
