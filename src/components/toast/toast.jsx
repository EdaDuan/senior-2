import React from "react";
import "./toast.scss";
export const Toast = (props) => {
  const { isShow, text } = props;
  return (
    <>
      {isShow ? (
        <div className="toast-wrap">
          <span className="toast-text">{text}</span>
        </div>
      ) : null}
    </>
  );
};
