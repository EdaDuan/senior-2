import React from "react";
import ReactDOM from "react-dom";
import { Toast } from "./toast";
const notice = (text, duration = 3000) => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  console.log(document.getElementsByClassName("toast-wrap")[0]);
  if (!document.getElementsByClassName("toast-wrap")[0]) {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      document.body.removeChild(div);
    }, duration);
    return ReactDOM.render(<Toast isShow={true} text={text} />, div);
  }
};
export default {
  info(text, duration) {
    return notice(text, duration);
  },
};
