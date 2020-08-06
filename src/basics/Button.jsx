import React from "react";
import "./Button.css";
export default (props) => {
  function sendButtonData(content) {
    props.setContent(content);
  }
  return (
    <button
      className={props.special ? "Button special" : "Button"}
      onClick={() => sendButtonData(props.button)}
    >
      {props.button}
    </button>
  );
};
