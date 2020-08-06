import React from "react";
import "./Display.css";
export default (props) => {
  return (
    <div className="Display">
      <span>{props.content}</span>
    </div>
  );
};
