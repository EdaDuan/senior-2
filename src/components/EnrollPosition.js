import React, { useState,useEffect, useRef } from "react";
import "../css/EnrollPosition.css";

export const EnrollPosition = (props) => {
  // onNotVisibleArea方法 子组件中修改visible的值，
  const { onNotVisibleArea, optionList,onSetData } = props;
  const selectRef = useRef(null);
  //  确定/取消
  const [sure, setSure] = useState('取消');
  const [lable, setLable] = useState('');
  // 根据当前点击的元素 调用onNotVisibleArea方法
  function bindBodyClick(e) {
    if (e.target.nodeName === "LI") {
      setLable(e.target.innerHTML)
      setSure("确定")
      return
    };
    onNotVisibleArea();
  }
  function showItem() {
    return optionList.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
  }
  useEffect(() => {
    document.addEventListener("click", bindBodyClick, false);
    return () => {
      document.removeEventListener("click", bindBodyClick, false);
    };
  }, []);
  return (
    <>
      <div className="EnrollPosition">
        <div className="position">
          <ul ref={selectRef}>{showItem()}</ul>
          <div className="sure" onClick={() => {onSetData({label:lable})}}>{sure}</div>
        </div>
      </div>
    </>
  );
};
