import React, { useState, useEffect } from "react";
import "./Success.scss";
import log from "../../imgs/successLog.png";

export const Success = (props) => {
  const [course, setCourse] = useState("");
  useEffect(() => {
    if (props.location.hasOwnProperty("query")) {
      window.sessionStorage.setItem("course", props.location.query.course);
    }
    setCourse(sessionStorage.getItem("course"));
  });
  return course ? (
    <div className="success">
      <img className="log" src={log} />
      <i className="chenggong icon icon-chenggong"></i>
      <p className="successText">您已成功报名【{course}】</p>
      <p className="successTips">
        敬请等待平台人员通知，请留意手机、邮箱哦~ 可关注微信公众号，联系客服
      </p>
    </div>
  ) : (
    <span>404</span>
  );
};
